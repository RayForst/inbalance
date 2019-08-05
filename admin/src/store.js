import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthorized: false,
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
        id: {
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
      },
      productPriority: {
        id: {
          value: '',
          error: null,
        },
      },
      article: {
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
      },
      static: {
        formLang: 'en',
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
        id: {
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
    },
  },
  mutations: {
    changeFormInput(state, payload) {
      state.forms[payload.form][payload.input].value = payload.value;
      state.forms[payload.form][payload.input].error = null;
    },
    changeForm(state, payload) {
      Object.keys(payload.item).map((objectKey) => {
        const ignore = ['createdAt', 'updatedAt', 'ProductSubcategory.name', ''];

        if (!ignore.includes(objectKey)) {
          console.log('change form', payload.form, objectKey);
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
    setFormLang(state, payload) {
      state.forms[payload.key].formLang = payload.locale;
    },
  },
  actions: {},
});
