import Vue from 'vue';
import Router from 'vue-router';
import Meta from 'vue-meta';
import Home from './views/Home.vue';
import { loadLanguageAsync } from './i18n';

Vue.use(Router);
Vue.use(Meta);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/products/:slug',
      name: 'products',
      props: true,
      component: () => import('./views/Products.vue'),
      children: [
        {
          path: ':subcategory',
          name: 'products-subcategory',
        },
        {
          path: 'lines/:line',
          name: 'products-line',
        },
      ],
    },
    {
      path: '/product/:slug',
      name: 'product',
      props: true,
      component: () => import('./views/Product.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('./views/Contacts.vue'),
    },
    {
      path: '/wellness-products',
      name: 'wellness-products',
      component: () => import('./views/WellnessProducts.vue'),
    },
    {
      path: '/wellness-procedures',
      name: 'wellness-procedures',
      component: () => import('./views/WellnessProcedures.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('./views/Articles.vue'),
    },
    {
      path: '/articles/:slug',
      name: 'article',
      props: true,
      component: () => import('./views/Article.vue'),
    },
    {
      path: '/static/:slug',
      name: 'static',
      props: true,
      component: () => import('./views/Static.vue'),
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('./views/Events.vue'),
    },
    {
      path: '/events/:slug',
      name: 'event',
      props: true,
      component: () => import('./views/Event.vue'),
    },
    {
      path: '/ui',
      name: 'ui',
      component: () => import('./views/Ui.vue'),
    },
    {
      path: '*',
      name: 'error',
      component: () => import('./views/Error404.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  loadLanguageAsync().then(() => next());
});

export default router;
