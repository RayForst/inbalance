export default {
  inputs: {
    get(store, key, name) {
      console.log('getting from form service');
      return store.state.forms[key][name].value;
    },
    set(value, store, key, name) {
      console.log('setting from service');
      store.commit('changeFormInput', {
        form: key,
        input: name,
        value,
      });
    },
  },
};
