import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './locales/en.json';
import it from './locales/it.json';

const resources = {
  en: {translation: en},
  it: {translation: it},
};

// const languageCode = Localization.locale.split('-')[0];
const languageCode = 'it'; //todo: make the language dynamic

i18n.use(initReactI18next).init({
  resources,
  lng: languageCode,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
