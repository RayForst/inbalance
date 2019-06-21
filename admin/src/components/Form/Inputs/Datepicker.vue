<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *
    app-datepicker(
      :type="type"
      :placeholder="placeholder"
      :name="name"
      v-model="value"
    )
    .error(v-if="error" v-html="error")
</template>

<script>
export default {
  props: ["name", "label", "type", "required"],
  inject: ["formKey"],
  data() {
    return {
      placeholder: "date"
    };
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
    },
    error() {
      return this.$store.state.forms[this.formKey][this.name].error;
    }
  },
  components: {
    appDatepicker: () => import("vuejs-datepicker")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
