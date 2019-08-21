const DEFAULT_LOCALE = 'lv';

export default {
  toLocale(item, field, locale) {
    const fieldDef = field;

    if (locale !== DEFAULT_LOCALE) field += `_${locale}`;

    return item[field] ? item[field] : item[fieldDef];
  },
};
