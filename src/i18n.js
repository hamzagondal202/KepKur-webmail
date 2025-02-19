import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector"; // Optional: for language detection
import translationEN from "./locales/en/translation.json"; // Your translation files
import translationTR from "./locales/tr/translation.json";

i18n
  .use(LanguageDetector) // Optional: use language detector if needed
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      tr: {
        translation: translationTR,
      },
    },
    fallbackLng: "en", // Fallback language if translation is missing
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
