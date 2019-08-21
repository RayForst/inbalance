import Vue from 'vue';
import VueI18n from 'vue-i18n';
import contentService from '@/services/ContentService';
import VueCookie from 'vue-cookie';

Vue.use(VueI18n);

const loadedLanguages = [];

export const i18n = new VueI18n({
  locale: 'lv',
  fallbackLocale: 'lv',
});

function getLocale() {
  let selectetLang = 'lv';

  try {
    const userBrowserLang = navigator.language || navigator.userLanguage;
    const userLang = userBrowserLang.substr(0, 2); // en-GB to en
    selectetLang = userLang;
  } catch (err) {}

  return selectetLang;
}

function getLang() {
  let lang = getLocale();

  const availableLocales = ['en', 'ru', 'lv'];
  const langCookie = VueCookie.get('lang');

  if (availableLocales.includes(langCookie)) {
    lang = langCookie;
  }

  return lang;
}

let locked = false;

export function loadLanguageAsync(lang = getLang()) {
  if (loadedLanguages.includes(lang) || locked) {
    i18n.locale = lang;
    return Promise.resolve();
  }

  locked = true;

  return contentService.translations.get({ lang }).then((response) => {
    const msgs = response.data;
    loadedLanguages.push(lang);
    i18n.setLocaleMessage(lang, msgs);
    i18n.locale = lang;
    locked = false;
  });
}
