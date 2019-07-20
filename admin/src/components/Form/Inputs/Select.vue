<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *
    select.form-control(
      :name="name"
      v-model="value"
      required
    )
      option(value="" disabled hidden) Please Choose...
      option(:value="option.value" v-for="option in options") {{ option.title }}
    .error(v-if="error" v-html="error")
</template>

<script>
import Form from "@/services/Form.js";

export default {
  props: ["name", "label", "options", "required"],
  inject: ["formKey"],
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
      // return '';
      return this.$store.state.forms[this.formKey]
        ? this.$store.state.forms[this.formKey][this.name].error
        : false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.form-group {
  margin: 10px 0;
}

input {
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  color: #565656;
  padding: 8px 12px;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
}
</style>
