import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import contentService from '@/services/ContentService';

Vue.use(VueI18n);

const loadedLanguages = [];

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
});

export function loadLanguageAsync(lang) {
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve();
  }
  return contentService.translations.get({ lang }).then((response) => {
    const msgs = response.data;
    loadedLanguages.push(lang);
    i18n.setLocaleMessage(lang, msgs);
  });
}

// function loadLocaleMessages() {
//   const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
//   const messages = {};
//   locales.keys().forEach((key) => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i);
//     if (matched && matched.length > 1) {
//       const locale = matched[1];
//       messages[locale] = locales(key);
//     }
//   });
//   return messages;
// }
