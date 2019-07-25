<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *

    input.form-control(
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :class="{ inputError: error }"
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
      placeholder: "Name"
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
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.inputError {
  border-color: $c_error;
}
</style>
