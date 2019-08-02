import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import contentService from '@/services/ContentService';
import VueCookie from 'vue-cookie';

Vue.use(VueI18n);

const loadedLanguages = [];

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
});

function getLang() {
  let lang = 'en';

  const availableLocales = ['en', 'ru', 'lv'];
  const langCookie = VueCookie.get('lang');

  if (availableLocales.includes(langCookie)) {
    lang = langCookie;
  }

  return lang;
}

let locked = false;

export function loadLanguageAsync() {
  const lang = getLang();

  console.log('requesting lang', lang);
  if (loadedLanguages.includes(lang) || locked) {
    console.log('already loaded');
    i18n.locale = lang;
    return Promise.resolve();
  }

  locked = true;

  return contentService.translations.get({ lang }).then((response) => {
    const msgs = response.data;
    loadedLanguages.push(lang);
    i18n.setLocaleMessage(lang, msgs);
    i18n.locale = lang;
  });
}
