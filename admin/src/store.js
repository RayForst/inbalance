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
        name: {
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
        howtouse: {
          value: '',
          error: null,
        },
        ingridients: {
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
        name: {
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
        id: {
          value: '',
          error: null,
        },
      },
      static: {
        name: {
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
        text: {
          value: '',
          error: null,
        },
        id: {
          value: '',
          error: null,
        },
      },
      event: {
        name: {
          value: '',
          error: null,
        },
        caption: {
          value: '',
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
        description: {
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
        const ignore = ['slug', 'createdAt', 'updatedAt', 'ProductSubcategory.name'];

        if (!ignore.includes(objectKey)) {
          state.forms[payload.form][objectKey].value = payload.item[objectKey];
        }

        return true;
      });
    },
    addFormInputError(state, payload) {
      state.forms[payload.form][payload.input].error = payload.value;
    },
    clearForm(state, payload) {
      Object.keys(state.forms[payload.form]).map((objectKey) => {
        let value = '';

        if (objectKey === 'priority') value = false;
        if (objectKey === 'dateStart') value = new Date(new Date().valueOf() + 1000 * 3600 * 24);
        if (objectKey === 'dateEnd') value = new Date(new Date().valueOf() + 1000 * 3600 * 48);

        state.forms[payload.form][objectKey].value = value;
        state.forms[payload.form][objectKey].error = null;
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
  },
  actions: {},
});
