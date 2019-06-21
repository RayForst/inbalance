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
      optgroup(:label="option.name" v-for="option, key in options")
        option(:value="value.id" v-for="value in option.values") {{ value.name }}
    .error(v-if="error" v-html="error")
</template>

<script>
export default {
  props: ["name", "label", "options", "required"],
  inject: ["formKey"],
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

.label {
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: uppercase;
  font-weight: 400;
  color: #9a9a9a;
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
