import { useContext } from "react";

import SiteSettingsContext from "./SiteSettingsContext";

export function useSiteSettings() {
  const context = useContext(
    SiteSettingsContext
  );

  if (!context) {
    throw new Error(
      "useSiteSettings باید داخل SiteSettingsProvider استفاده شود."
    );
  }

  return context;
}