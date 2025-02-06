import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import all translation files
import translationEN from '../locales/en.json';
import translationES from '../locales/es.json';
import translationFR from '../locales/fr.json';
import translationDE from '../locales/de.json';
import translationIT from '../locales/it.json';
import translationZH from '../locales/zh.json';
import translationJA from '../locales/ja.json';
import translationAR from '../locales/ar.json';

const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  fr: {
    translation: translationFR,
  },
  de: {
    translation: translationDE,
  },
  it: {
    translation: translationIT,
  },
  zh: {
    translation: translationZH,
  },
  ja: {
    translation: translationJA,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 