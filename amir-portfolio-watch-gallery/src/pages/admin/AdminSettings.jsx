import {
  Settings,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";

import GlassCard from "../../components/common/GlassCard";

import {
  useSiteSettings
} from "../../context/useSiteSettings";

function AdminSettings() {
  const {
    settings,
    updateSettings,
  } = useSiteSettings();

  const updateField = (field, value) => {
    updateSettings({
      [field]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // چون updateSettings تنظیمات را
    // داخل Context و localStorage ذخیره می‌کند،
    // اینجا فقط پیام موفقیت نمایش می‌دهیم.

    alert(
      "تنظیمات با موفقیت ذخیره شد."
    );
  };

  return (
    <section className="admin-settings-page">

      {/* Header */}

      <div className="admin-products-top">

        <div>
          <span className="admin-eyebrow">
            SITE SETTINGS
          </span>

          <h1>
            تنظیمات
            <span> سایت</span>
          </h1>

          <p>
            اطلاعات عمومی سایت را از این قسمت مدیریت کن.
          </p>
        </div>

      </div>


      {/* Settings Card */}

      <GlassCard className="admin-settings-card">

        <div className="admin-card-heading">

          <div>
            <span>
              GENERAL SETTINGS
            </span>

            <h2>
              اطلاعات عمومی
            </h2>
          </div>

          <Settings size={22} />

        </div>


        <form
          className="admin-settings-form"
          onSubmit={handleSubmit}
        >

          {/* Site Name */}

          <div className="admin-setting-field">

            <label>
              نام سایت
            </label>

            <div>
              <Globe size={17} />

              <input
                type="text"
                value={settings.siteName || ""}
                onChange={(event) =>
                  updateField(
                    "siteName",
                    event.target.value
                  )
                }
              />

            </div>

          </div>
<div className="admin-setting-field">

  <label>
    عنوان صفحه اصلی
  </label>

  <div>
    <Globe size={17} />

    <input
      type="text"
      value={settings.homeTitle || ""}
      onChange={(event) =>
        updateField(
          "homeTitle",
          event.target.value
        )
      }
    />
  </div>

</div>


<div className="admin-setting-field">

  <label>
    توضیحات صفحه اصلی
  </label>

  <div>
    <FileText size={17} />

    <textarea
      rows="4"
      value={settings.homeSubtitle || ""}
      onChange={(event) =>
        updateField(
          "homeSubtitle",
          event.target.value
        )
      }
    />
  </div>

</div>

          {/* Email */}

          <div className="admin-setting-field">

            <label>
              ایمیل
            </label>

            <div>
              <Mail size={17} />

              <input
                type="email"
                value={settings.email || ""}
                onChange={(event) =>
                  updateField(
                    "email",
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Phone */}

          <div className="admin-setting-field">

            <label>
              شماره تماس
            </label>

            <div>
              <Phone size={17} />

              <input
                type="tel"
                value={settings.phone || ""}
                onChange={(event) =>
                  updateField(
                    "phone",
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Location */}

          <div className="admin-setting-field">

            <label>
              موقعیت
            </label>

            <div>
              <MapPin size={17} />

              <input
                type="text"
                value={settings.location || ""}
                onChange={(event) =>
                  updateField(
                    "location",
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Description */}

          <div className="admin-setting-field">

            <label>
              توضیحات سایت
            </label>

            <div>
              <FileText size={17} />

              <textarea
                rows="5"
                value={settings.description || ""}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
              />

            </div>

          </div>


          {/* Save */}

          <button
            type="submit"
            className="admin-save-settings"
          >
            <Save size={17} />

            ذخیره تنظیمات

          </button>

        </form>

      </GlassCard>

    </section>
  );
}

export default AdminSettings;