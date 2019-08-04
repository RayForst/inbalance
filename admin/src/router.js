import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  mode: 'history',
  base: '/admin',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/Products.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('./views/Events.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('./views/Articles.vue'),
    },
    {
      path: '/static-pages',
      name: 'static-pages',
      component: () => import('./views/StaticPages.vue'),
    },
    {
      path: '/contact-requests',
      name: 'contact-requests',
      component: () => import('./views/ContactRequests.vue'),
    },
    {
      path: '/translations',
      name: 'translations',
      component: () => import('./views/Translations.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
    },
    {
      path: '*',
      name: 'error',
      component: () => import('./views/Error404.vue'),
    },
    {
      path: '/icons',
      name: 'icons',
      component: () => import('./views/UI.vue'),
    },
  ],
});
