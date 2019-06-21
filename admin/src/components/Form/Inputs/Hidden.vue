<template lang="pug">
  input.form-control(
    type="hidden"
    :name="name"
    v-model="value"
  )
</template>

<script>
export default {
  props: ["name"],
  inject: ["formKey"],
  data() {
    return {};
  },
  computed: {
    value: {
      get() {
        return this.$store.state.forms[this.formKey][this.name].value;
      },
      set(value) {
        this.$store.commit("changeFormInput", {
          form: this.formKey,
          input: this.name,
          value
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
