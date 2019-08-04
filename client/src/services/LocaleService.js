const DEFAULT_LOCALE = 'en';

export default {
  toLocale(item, field, locale) {
    if (locale !== DEFAULT_LOCALE) field += `_${locale}`;

    return item[field];
  },
};
