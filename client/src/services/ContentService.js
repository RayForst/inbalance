import Api from '@/services/Api';

export default {
  products: {
    get: credentials => Api().get('/products', { params: credentials }),
    getDesc: credentials => Api().get('/products/description', { params: credentials }),
    getOne: credentials => Api().get('/product', { params: credentials }),
    getByPriority: credentials => Api().get('/products/priority', { params: credentials }),
  },
  static: {
    getOne: credentials => Api().get('/static', { params: credentials }),
    getMenu: credentials => Api().get('/static/menu', { params: credentials }),
  },
  articles: {
    getOne: credentials => Api().get('/article', { params: credentials }),
    getRecent: credentials => Api().get('/articles/recent', { params: credentials }),
    get: credentials => Api().get('/articles', { params: credentials }),
  },
  events: {
    get: credentials => Api().get('/events', { params: credentials }),
    getHero: credentials => Api().get('/events/hero', { params: credentials }),
    getAnnounce: credentials => Api().get('/events/announce', { params: credentials }),
    getOne: credentials => Api().get('/event', { params: credentials }),
    subscribe: credentials => Api().post('/event/subscribe', credentials),
  },
  categories: {
    get: credentials => Api().get('/categories', { params: credentials }),
  },
  subcategories: {
    get: credentials => Api().get('/categories/subcategories', { params: credentials }),
  },
  productLines: {
    get: () => Api().get('/product-lines'),
  },
  priority: {
    get: credentials => Api().get('/settings/priority', { params: credentials }),
  },
  contactRequest: {
    save: credentials => Api().post('contact-request', credentials),
  },
  subscription: {
    save: credentials => Api().post('subscribe', credentials),
    eventSave: credentials => Api().post('subscribe/event', credentials),
  },
  settings: {
    get: credentials => Api().get('/settings', { params: credentials }),
  },
  translations: {
    get: credentials => Api().get('/translations', { params: credentials }),
  },
  partnership: {
    save: credentials => Api().post('/partnership', credentials),
  },
  callMeBack: {
    save: credentials => Api().post('/call-me-back', credentials),
  },
};
