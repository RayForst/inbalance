import Vue from 'vue';
import Vuex from 'vuex';
import i18n from './i18n';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: [
      {
        category: '[ comfort zone ]',
        categoryIndex: 1,
        links: [
          {
            title: 'menu.links.products',
            i18n: true,
            route: {
              name: 'products',
              slug: null,
            },
          },
        ],
      },
      {
        category: '/skin regimen/',
        categoryIndex: 1,
        links: [
          {
            title: 'menu.links.products',
            i18n: true,
            route: {
              name: 'products',
              slug: null,
            },
          },
        ],
      },
      {
        category: 'menu.categories.wellness',
        i18n: true,
        categoryIndex: 3,
        links: [],
      },
      {
        category: 'WELLNESS ТОВАРЫ',
        categoryIndex: 2,
        links: [
          {
            title: 'menu.links.products',
            i18n: true,
            route: {
              name: 'products',
              slug: null,
            },
          },
        ],
      },
      {
        category: 'menu.categories.events',
        i18n: true,
        categoryIndex: 3,
        links: [
          {
            title: 'menu.links.calendar',
            i18n: true,
            route: {
              name: 'events',
            },
          },
        ],
      },
      {
        category: 'menu.categories.contacts',
        i18n: true,
        categoryIndex: 4,
        links: [
          {
            title: 'menu.links.contacts',
            i18n: true,
            route: {
              name: 'contacts',
            },
          },
        ],
      },
      {
        category: 'menu.categories.articles',
        i18n: true,
        categoryIndex: 4,
        links: [
          {
            title: 'menu.links.blog',
            i18n: true,
            route: {
              name: 'articles',
            },
          },
        ],
      },
    ],
  },
  mutations: {
    setupCategories(state, payload) {
      state.menu[0].category = payload[0].name;
      state.menu[0].links[0].route.slug = payload[0].slug;
      state.menu[1].category = payload[1].name;
      state.menu[1].links[0].route.slug = payload[1].slug;
      state.menu[3].category = payload[2].name;
      state.menu[3].links[0].route.slug = payload[2].slug;
    },
    setupMenu(state, payload) {
      payload.forEach((element) => {
        state.menu[element.menupos].links.push({
          title: element.name,
          route: {
            name: 'static',
            slug: element.slug,
          },
        });
      });
    },
  },
  actions: {},
});
