<template lang="pug">
  .form-group
    .label(
      v-html="label"
    )
    textarea.form-control(
      v-model="value"
    )
    .error(v-if="error" v-html="error")
</template>

<script>
import Form from "@/services/Form.js";

export default {
  props: ["name", "label", "type"],
  inject: ["formKey"],
  data() {
    return {};
  },
  computed: {
    value: {
      get() {
        return Form.inputs.get(this.$store, this.formKey, this.name);
      },
      set(value) {
        return Form.inputs.set(value, this.$store, this.formKey, this.name);
      }
    },
    error() {
      return this.$store.state.forms[this.formKey][this.name].error;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
