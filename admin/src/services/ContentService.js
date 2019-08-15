import Api from '@/services/Api';

export default {
  products: {
    get: credentials => Api().get('/admin/products', { params: credentials }),
    remove: credentials => Api().delete('/admin/product', { data: credentials }),
  },
  articles: {
    get: credentials => Api().get('/admin/articles', { params: credentials }),
    remove: credentials => Api().delete('/admin/article', { data: credentials }),
  },
  static: {
    get: credentials => Api().get('/admin/statics', { params: credentials }),
    remove: credentials => Api().delete('/admin/static', { data: credentials }),
  },
  events: {
    get: credentials => Api().get('/admin/events', { params: credentials }),
    remove: credentials => Api().delete('/admin/event', { data: credentials }),
    subscribtion: credentials => Api().get('/admin/subscribe/event', { params: credentials }),
  },
  productCategories: {
    get: () => Api().get('/categories'),
  },
  productSubcategories: {
    get: () => Api().get('/categories/subcategories'),
  },
  priority: {
    get: () => Api().get('/settings/priority'),
  },
  settings: {
    get: () => Api().get('/settings'),
  },
  upload: {
    save: credentials => Api().post('upload', credentials),
  },
  newsletter: {
    get: () => Api().get('/admin/subscribe'),
  },
  contacts: {
    get: () => Api().get('/admin/contact-request'),
  },
  i18n: {
    get: credentials => Api().get('/translations', { params: credentials }),
    save: credentials => Api().post('/translations/save', credentials),
  },
  callmeback: {
    get: () => Api().get('/admin/call-me-back'),
  },
};
