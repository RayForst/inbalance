export default {
  inputs: {
    get(store, key, name) {
      return store.state.forms[key][name].value;
    },
    set(value, store, key, name) {
      store.commit('changeFormInput', {
        form: key,
        input: name,
        value,
      });
    },
  },
};
