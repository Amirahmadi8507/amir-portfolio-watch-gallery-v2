import {
  useEffect,
  useState,
} from "react";

import SiteSettingsContext from "./SiteSettingsContext";

const defaultSettings = {
  siteName: "AM ATELIER",

  homeTitle:
    "بیایید چیزی متفاوت بسازیم",

  homeSubtitle:
    "طراحی، توسعه و خلق تجربه‌های دیجیتال متفاوت.",

  phone: "09123456789",

  email:
    "hello@amatelier.ir",

  location:
    "ایران - سمنان",

  description:
    "طراحی تجربه‌های مدرن و متفاوت برای وب.",

  instagram: "",

  github: "",

  contactTitle:
    "با من در ارتباط باش",

  contactDescription:
    "اگر ایده‌ای برای همکاری یا یک پروژه جذاب داری، خوشحال می‌شوم با من در ارتباط باشی.",
};

function SiteSettingsProvider({
  children,
}) {
  const [settings, setSettings] =
    useState(() => {
      try {
        const savedSettings =
          localStorage.getItem(
            "am-site-settings"
          );

        if (savedSettings) {
          return {
            ...defaultSettings,
            ...JSON.parse(
              savedSettings
            ),
          };
        }

        return defaultSettings;
      } catch (error) {
        console.error(
          "خطا در دریافت تنظیمات سایت:",
          error
        );

        return defaultSettings;
      }
    });

  useEffect(() => {
    localStorage.setItem(
      "am-site-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  const updateSettings = (
    newSettings
  ) => {
    setSettings(
      (currentSettings) => ({
        ...currentSettings,
        ...newSettings,
      })
    );
  };

  const resetSettings = () => {
    setSettings(
      defaultSettings
    );
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export default SiteSettingsProvider;