<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *

    label.switch.m5
      input(
        type="checkbox"
        :placeholder="placeholder"
        :name="name"
        v-model="value"
      )
      <small></small>

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

.form-group {
  display flex;
  justify-content space-between;
}

.inputError {
  border-color: $c_error;
}

.switch {
  display: inline-block;
}

.switch input {
  display: none;
}

.switch small {
  display: inline-block;
  width: 43px;
  height: 18px;
  background: #455a64;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
}

.switch small:after {
  content: 'No';
  position: absolute;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  width: 100%;
  left: 0px;
  text-align: right;
  padding: 0 6px;
  box-sizing: border-box;
  line-height: 18px;
}

.switch small:before {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: 0.3s;
  box-shadow: -3px 0 3px rgba(0, 0, 0, 0.1);
}

.switch input:checked ~ small {
  background: $c_accent;
  transition: 0.3s;
}

.switch input:checked ~ small:before {
  transform: translate(25px, 0px);
  transition: 0.3s;
}

.switch input:checked ~ small:after {
  content: 'Yes';
  text-align: left;
}

.switchSmall {
  display: inline-block;
}

.switchSmall input {
  display: none;
}

.switchSmall small {
  display: inline-block;
  width: 32px;
  height: 16px;
  background: #455a64;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
}

.switchSmall small:before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: 0.3s;
  box-shadow: -3px 0 3px rgba(0, 0, 0, 0.1);
}

.switchSmall input:checked ~ small {
  background: $c_accent;
  transition: 0.3s;
}

.switchSmall input:checked ~ small:before {
  transform: translate(16px, 0px);
  transition: 0.3s;
}

.switchSmall2 {
  display: inline-block;
}

.switchSmall2 input {
  display: none;
}

.switchSmall2 small {
  display: inline-block;
  width: 38px;
  height: 15px;
  background: #455a64;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
}

.switchSmall2 small:before {
  content: '';
  position: absolute;
  width: 19px;
  height: 19px;
  background: #fff;
  border-radius: 50%;
  top: -2px;
  left: -1px;
  transition: 0.3s;
  box-shadow: -3px 0 3px rgba(0, 0, 0, 0.25);
}

.switchSmall2 input:checked ~ small {
  background: $c_accent;
  transition: 0.3s;
}

.switchSmall2 input:checked ~ small:before {
  transform: translate(20px, 0px);
  transition: 0.3s;
  box-shadow: 3px 0 3px rgba(0, 0, 0, 0.25);
}
</style>
