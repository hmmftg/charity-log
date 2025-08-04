import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // https://react.i18next.com/latest/using-with-hooks
import Backend from "i18next-http-backend"; // For lazy loading for translations: https://github.com/i18next/i18next-http-backend
import detector from "i18next-browser-languagedetector"; // For auto detecting the user language: https://github.com/i18next/i18next-browser-languageDetector

import enCommon from '../../assets/locales/en/common.json';
import faCommon from '../../assets/locales/fa/common.json';

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "fa"],
    resources: {
      en: {
        common: enCommon,
      },
      fa: {
        common: faCommon,
      },
    },
    ns: ["common"],
    defaultNS: "common",
    fallbackLng: ["en", "fa"],
  });

export default i18n;