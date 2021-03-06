import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: false,
    token: null,
    user: null,
    forms: {
      login: {
        login: {
          value: '',
          error: null,
        },
        password: {
          value: '',
          error: null,
        },
      },
      product: {
        formLang: 'en',
        name: {
          value: '',
          error: null,
        },
        name_lv: {
          value: '',
          error: null,
        },
        name_ru: {
          value: '',
          error: null,
        },
        ProductSubcategoryId: {
          value: '',
          error: null,
        },
        ProductLineId: {
          value: '',
          error: null,
        },
        description: {
          value: '',
          error: null,
        },
        description_lv: {
          value: '',
          error: null,
        },
        description_ru: {
          value: '',
          error: null,
        },
        howtouse: {
          value: '',
          error: null,
        },
        howtouse_lv: {
          value: '',
          error: null,
        },
        howtouse_ru: {
          value: '',
          error: null,
        },
        ingridients: {
          value: '',
          error: null,
        },
        ingridients_lv: {
          value: '',
          error: null,
        },
        ingridients_ru: {
          value: '',
          error: null,
        },
        images: {
          value: '',
          error: null,
        },
        priority: {
          value: false,
          error: null,
        },
        isNew: {
          value: false,
          error: null,
        },
        totalCount: {
          value: 0,
          error: null,
        },
        price: {
          value: 0,
          error: null,
        },
        show: {
          value: false,
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
        metatitle: {
          value: '',
          error: null,
        },
        metadesc: {
          value: '',
          error: null,
        },
        metatitle_lv: {
          value: '',
          error: null,
        },
        metadesc_lv: {
          value: '',
          error: null,
        },
        metatitle_ru: {
          value: '',
          error: null,
        },
        metadesc_ru: {
          value: '',
          error: null,
        },
      },
      productMainCategory: {
        name: {
          value: '',
          error: null,
        },
        name_lv: {
          value: '',
          error: null,
        },
        name_ru: {
          value: '',
          error: null,
        },
        description: {
          value: '',
          error: null,
        },
        description_lv: {
          value: '',
          error: null,
        },
        description_ru: {
          value: '',
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
        metatitle: {
          value: '',
          error: null,
        },
        metadesc: {
          value: '',
          error: null,
        },
        metatitle_lv: {
          value: '',
          error: null,
        },
        metadesc_lv: {
          value: '',
          error: null,
        },
        metatitle_ru: {
          value: '',
          error: null,
        },
        metadesc_ru: {
          value: '',
          error: null,
        },
      },
      productCategory: {
        name: {
          value: '',
          error: null,
        },
        name_lv: {
          value: '',
          error: null,
        },
        name_ru: {
          value: '',
          error: null,
        },
        description: {
          value: '',
          error: null,
        },
        description_lv: {
          value: '',
          error: null,
        },
        description_ru: {
          value: '',
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
        ProductCategoryId: {
          value: '',
          error: null,
        },
        metatitle: {
          value: '',
          error: null,
        },
        metadesc: {
          value: '',
          error: null,
        },
        metatitle_lv: {
          value: '',
          error: null,
        },
        metadesc_lv: {
          value: '',
          error: null,
        },
        metatitle_ru: {
          value: '',
          error: null,
        },
        metadesc_ru: {
          value: '',
          error: null,
        },
      },
      productLine: {
        name: {
          value: '',
          error: null,
        },
        name_lv: {
          value: '',
          error: null,
        },
        name_ru: {
          value: '',
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
        metatitle: {
          value: '',
          error: null,
        },
        metadesc: {
          value: '',
          error: null,
        },
        metatitle_lv: {
          value: '',
          error: null,
        },
        metadesc_lv: {
          value: '',
          error: null,
        },
        metatitle_ru: {
          value: '',
          error: null,
        },
        metadesc_ru: {
          value: '',
          error: null,
        },
      },
      productPriority: {
        id: {
          value: '',
          error: null,
        },
      },
      article: {
        formLang: 'en',
        show: {
          value: false,
          error: null,
        },
        name: {
          value: '',
          error: null,
        },
        name_lv: {
          value: '',
          error: null,
        },
        name_ru: {
          value: '',
          error: null,
        },
        image: {
          value: '',
          error: null,
        },
        text: {
          value: '',
          error: null,
        },
        text_lv: {
          value: '',
          error: null,
        },
        text_ru: {
          value: '',
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
        metatitle: {
          value: '',
          error: null,
        },
        metadesc: {
          value: '',
          error: null,
        },
        metatitle_lv: {
          value: '',
          error: null,
        },
        metadesc_lv: {
          value: '',
          error: null,
        },
        metatitle_ru: {
          value: '',
          error: null,
        },
        metadesc_ru: {
          value: '',
          error: null,
        },
      },
      static: {
        formLang: 'en',
        show: {
          value: false,
          error: null,
        },
        slug: {
          value: '',
          error: null,
        },
        name: {
          value: '',
          error: null,
        },
        name_lv: {
          value: '',
          error: null,
        },
        name_ru: {
          value: '',
          error: null,
        },
        text: {
          value: '',
          error: null,
        },
        text_lv: {
          value: '',
          error: null,
        },
        text_ru: {
          value: '',
          error: null,
        },
        image: {
          value: '',
          error: null,
        },
        menupos: {
          value: '',
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
        metatitle: {
          value: '',
          error: null,
        },
        metadesc: {
          value: '',
          error: null,
        },
        metatitle_lv: {
          value: '',
          error: null,
        },
        metadesc_lv: {
          value: '',
          error: null,
        },
        metatitle_ru: {
          value: '',
          error: null,
        },
        metadesc_ru: {
          value: '',
          error: null,
        },
      },
      event: {
        formLang: 'en',
        name: {
          value: '',
          error: null,
        },
        name_lv: {
          value: '',
          error: null,
        },
        name_ru: {
          value: '',
          error: null,
        },
        caption: {
          value: '',
          error: null,
        },
        caption_lv: {
          value: '',
          error: null,
        },
        caption_ru: {
          value: '',
          error: null,
        },
        description: {
          value: '',
          error: null,
        },
        description_lv: {
          value: '',
          error: null,
        },
        description_ru: {
          value: '',
          error: null,
        },
        preview: {
          value: false,
          error: null,
        },
        priority: {
          value: false,
          error: null,
        },
        dateStart: {
          value: new Date(new Date().valueOf() + 1000 * 3600 * 24), // +1 day from now
          error: null,
        },
        dateEnd: {
          value: new Date(new Date().valueOf() + 1000 * 3600 * 24), // +2 day
          error: null,
        },
        image: {
          value: '',
          error: null,
        },
        images: {
          value: '',
          error: null,
        },
        show: {
          value: false,
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
        metatitle: {
          value: '',
          error: null,
        },
        metadesc: {
          value: '',
          error: null,
        },
        metatitle_lv: {
          value: '',
          error: null,
        },
        metadesc_lv: {
          value: '',
          error: null,
        },
        metatitle_ru: {
          value: '',
          error: null,
        },
        metadesc_ru: {
          value: '',
          error: null,
        },
      },
      settings: {
        email: {
          value: '',
          error: null,
        },
        contactFormEmail: {
          value: '',
          error: null,
        },
        contactFormSubject: {
          value: '',
          error: null,
        },
        lat: {
          value: '',
          error: null,
        },
        long: {
          value: '',
          error: null,
        },
        couponCodes: {
          value: '',
          error: null,
        },
        phone: {
          value: '',
          error: null,
        },
        address: {
          value: '',
          error: null,
        },
        copyright: {
          value: '',
          error: null,
        },
        facebook: {
          value: '',
          error: null,
        },
        instagram: {
          value: '',
          error: null,
        },
      },
      settings_seo: {
        index_title: {
          value: '',
          error: null,
        },
        index_title_lv: {
          value: '',
          error: null,
        },
        index_title_ru: {
          value: '',
          error: null,
        },
        index_desc: {
          value: '',
          error: null,
        },
        index_desc_lv: {
          value: '',
          error: null,
        },
        index_desc_ru: {
          value: '',
          error: null,
        },

        events_title: {
          value: '',
          error: null,
        },
        events_title_lv: {
          value: '',
          error: null,
        },
        events_title_ru: {
          value: '',
          error: null,
        },
        events_desc: {
          value: '',
          error: null,
        },
        events_desc_lv: {
          value: '',
          error: null,
        },
        events_desc_ru: {
          value: '',
          error: null,
        },

        articles_title: {
          value: '',
          error: null,
        },
        articles_title_lv: {
          value: '',
          error: null,
        },
        articles_title_ru: {
          value: '',
          error: null,
        },
        articles_desc: {
          value: '',
          error: null,
        },
        articles_desc_lv: {
          value: '',
          error: null,
        },
        articles_desc_ru: {
          value: '',
          error: null,
        },

        w_proc_title: {
          value: '',
          error: null,
        },
        w_proc_title_lv: {
          value: '',
          error: null,
        },
        w_proc_title_ru: {
          value: '',
          error: null,
        },
        w_proc_desc: {
          value: '',
          error: null,
        },
        w_proc_desc_lv: {
          value: '',
          error: null,
        },
        w_proc_desc_ru: {
          value: '',
          error: null,
        },

        w_prod_title: {
          value: '',
          error: null,
        },
        w_prod_title_lv: {
          value: '',
          error: null,
        },
        w_prod_title_ru: {
          value: '',
          error: null,
        },
        w_prod_desc: {
          value: '',
          error: null,
        },
        w_prod_desc_lv: {
          value: '',
          error: null,
        },
        w_prod_desc_ru: {
          value: '',
          error: null,
        },

        contacts_title: {
          value: '',
          error: null,
        },
        contacts_title_lv: {
          value: '',
          error: null,
        },
        contacts_title_ru: {
          value: '',
          error: null,
        },
        contacts_desc: {
          value: '',
          error: null,
        },
        contacts_desc_lv: {
          value: '',
          error: null,
        },
        contacts_desc_ru: {
          value: '',
          error: null,
        },
      },
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;

      if (token) {
        state.isAuthorized = true;
      } else {
        state.isAuthorized = false;
      }
    },
    setUser(state, token) {
      state.user = token;
    },
    changeFormInput(state, payload) {
      state.forms[payload.form][payload.input].value = payload.value;
      state.forms[payload.form][payload.input].error = null;
    },
    changeForm(state, payload) {
      Object.keys(payload.item).map((objectKey) => {
        const ignore = ['createdAt', 'updatedAt', 'ProductSubcategory.name', ''];

        if (!ignore.includes(objectKey)) {
          try {
            state.forms[payload.form][objectKey].value = payload.item[objectKey];
          } catch (err) {}
        }

        return true;
      });
    },
    addFormInputError(state, payload) {
      state.forms[payload.form][payload.input].error = payload.value;
    },
    clearForm(state, payload) {
      const fields = Object.keys(state.forms[payload.form]).filter(key => key !== 'formLang');

      fields.map((name) => {
        let value;

        switch (name) {
          case 'priority' || 'preview':
            value = false;
            break;
          case 'dateStart':
            value = new Date(new Date().valueOf() + 1000 * 3600 * 24);
            break;
          case 'dateEnd':
            value = new Date(new Date().valueOf() + 1000 * 3600 * 48);
            break;
          default:
            value = '';
        }

        state.forms[payload.form][name] = {
          value,
          error: null,
        };

        return true;
      });
    },
    setSettings(state, payload) {
      Object.keys(payload).map((objectKey) => {
        if (objectKey !== 'id' && objectKey !== 'createdAt' && objectKey !== 'updatedAt') {
          state.forms.settings[objectKey].value = payload[objectKey];
        }

        return true;
      });
    },
    setSeoSettings(state, payload) {
      if (!payload) return; 
      Object.keys(payload).map((objectKey) => {
        if (objectKey !== 'id' && objectKey !== 'createdAt' && objectKey !== 'updatedAt') {
          state.forms.settings_seo[objectKey].value = payload[objectKey];
        }

        return true;
      });
    },
    setFormLang(state, payload) {
      state.forms[payload.key].formLang = payload.locale;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, token) {
      commit('setUser', token);
    },
  },
});
