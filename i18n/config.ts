import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../locales/en/common.json";
import arCommon from "../locales/ar/common.json";

const resources = {
  en: {
    translation: enCommon,
  },
  ar: {
    translation: arCommon,
  },
} as const;

const STORAGE_KEY = "amb_lang";

function getSavedLanguage(): "ar" | "en" | undefined {
  if (typeof window === "undefined") return undefined;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === "ar" || v === "en" ? v : undefined;
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getSavedLanguage() ?? "ar", // تثبيت اللغة بعد الـ refresh
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  i18n.on("languageChanged", (lng) => {
    if (typeof window === "undefined") return;
    if (lng === "ar" || lng === "en") {
      window.localStorage.setItem(STORAGE_KEY, lng);
    }
  });
}

export default i18n;

