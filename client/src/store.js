import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menu: [
      {
        category: '[ comfort zone ]',
        categoryIndex: 1,
        links: [
          {
            title: 'Продукция',
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
            title: 'Продукция',
            route: {
              name: 'products',
              slug: null,
            },
          },
        ],
      },
      {
        category: 'WELLNESS ПРОЦЕДУРЫ',
        categoryIndex: 3,
        links: [
        ],
      },
      {
        category: 'WELLNESS ТОВАРЫ',
        categoryIndex: 2,
        links: [
          {
            title: 'Продукция',
            route: {
              name: 'products',
              slug: null,
            },
          },
        ],
      },
      {
        category: 'МЕРОПРИЯТИЯ',
        categoryIndex: 3,
        links: [
          {
            title: 'Календарь мероприятий',
            route: {
              name: 'events',
            },
          },
        ],
      },
      {
        category: 'СВЯЗАТЬСЯ С НАМИ',
        categoryIndex: 4,
        links: [
          {
            title: 'Наши контакты',
            route: {
              name: 'contacts',
            },
          },
        ],
      },
      {
        category: 'СТАТЬИ',
        categoryIndex: 4,
        links: [
          {
            title: 'Блог',
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
      payload.forEach(element => {
        state.menu[element.menupos].links.push({
          title: element.name,
          route: {
            name: 'static',
            slug: element.slug,
          },
        })
      });
    },
  },
  actions: {},
});
