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
import Form from "@/services/Form.js";

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
        return Form.inputs.get(this.$store, this.formKey, this.name);
      },
      set(value) {
        return Form.inputs.set(value, this.$store, this.formKey, this.name);
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
