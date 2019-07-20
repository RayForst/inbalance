<template lang="pug">
  input.form-control(
    type="hidden"
    :name="name"
    v-model="value"
  )
</template>

<script>
import Form from "@/services/Form.js";

export default {
  props: ["name"],
  inject: ["formKey"],
  data() {
    return {};
  },
  computed: {
    value: {
      value: {
        get() {
          return Form.inputs.get(this.$store, this.formKey, this.name);
        },
        set(value) {
          return Form.inputs.set(value, this.$store, this.formKey, this.name);
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
