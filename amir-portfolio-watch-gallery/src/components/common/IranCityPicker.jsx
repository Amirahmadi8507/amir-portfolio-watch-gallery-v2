import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronDown,
  MapPin,
  Search,
  X,
} from "lucide-react";

import iranCities from "../../data/iranCities.json";
import iranProvinces from "../../data/iranProvinces";

function IranCityPicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);

  const pickerRef = useRef(null);

  const provinces = useMemo(() => {
    return iranProvinces
      .map((province) => {
        const cities = iranCities
          .filter(
            (city) => city.province_id === province.id
          )
          .map((city) => city.name)
          .filter(Boolean);

        return {
          ...province,
          cities: [...new Set(cities)].sort((a, b) =>
            a.localeCompare(b, "fa")
          ),
        };
      })
      .filter((province) => province.cities.length > 0);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
        setSelectedProvince(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setSearch("");
    setSelectedProvince(null);
  };

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setSearch("");
  };

  const handleCitySelect = (city) => {
    onChange(city);

    setIsOpen(false);
    setSearch("");
    setSelectedProvince(null);
  };

  const handleBack = () => {
    setSelectedProvince(null);
    setSearch("");
  };

  const filteredProvinces = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return provinces;
    }

    return provinces.filter((province) =>
      province.name.toLowerCase().includes(query)
    );
  }, [provinces, search]);

  const filteredCities = useMemo(() => {
    if (!selectedProvince) {
      return [];
    }

    const query = search.trim().toLowerCase();

    if (!query) {
      return selectedProvince.cities;
    }

    return selectedProvince.cities.filter((city) =>
      city.toLowerCase().includes(query)
    );
  }, [selectedProvince, search]);

  return (
    <div
      className="iran-city-picker"
      ref={pickerRef}
    >
      <button
        type="button"
        className={`iran-city-trigger ${
          isOpen ? "active" : ""
        }`}
        onClick={handleOpen}
      >
        <div className="iran-city-trigger-content">
          <MapPin size={18} />

          {value ? (
            <span>{value}</span>
          ) : (
            <span className="placeholder">
              انتخاب استان و شهر
            </span>
          )}
        </div>

        <ChevronDown
          size={18}
          className={`iran-city-chevron ${
            isOpen ? "rotate" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="iran-city-dropdown">
          <div className="iran-city-dropdown-header">
            <div>
              <span>IRAN LOCATION</span>

              <strong>
                {selectedProvince
                  ? selectedProvince.name
                  : "انتخاب استان"}
              </strong>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSearch("");
                setSelectedProvince(null);
              }}
              aria-label="بستن"
            >
              <X size={17} />
            </button>
          </div>

          <div className="iran-city-search">
            <Search size={17} />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={
                selectedProvince
                  ? "جستجوی شهر..."
                  : "جستجوی استان..."
              }
              autoFocus
            />
          </div>

          <div className="iran-city-list">
            {selectedProvince ? (
              <>
                <button
                  type="button"
                  className="iran-city-back"
                  onClick={handleBack}
                >
                  <ChevronLeft size={16} />
                  بازگشت به استان‌ها
                </button>

                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <button
                      type="button"
                      key={city}
                      className={`iran-city-item ${
                        value === city
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleCitySelect(city)
                      }
                    >
                      <span>{city}</span>

                      {value === city && (
                        <Check size={17} />
                      )}
                    </button>
                  ))
                ) : (
                  <div className="iran-city-empty">
                    شهری با این نام پیدا نشد.
                  </div>
                )}
              </>
            ) : (
              <>
                {filteredProvinces.length > 0 ? (
                  filteredProvinces.map((province) => (
                    <button
                      type="button"
                      key={province.id}
                      className="iran-city-province"
                      onClick={() =>
                        handleProvinceSelect(province)
                      }
                    >
                      <div>
                        <strong>
                          {province.name}
                        </strong>

                        <span>
                          {province.cities.length.toLocaleString(
                            "fa-IR"
                          )}{" "}
                          شهر
                        </span>
                      </div>

                      <ChevronLeft size={18} />
                    </button>
                  ))
                ) : (
                  <div className="iran-city-empty">
                    استانی با این نام پیدا نشد.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default IranCityPicker;