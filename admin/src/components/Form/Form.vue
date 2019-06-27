<template lang="pug">
  form.ui-form.form.flex_col(@submit.prevent="save")
    slot(
      :storeKey="storeKey"
    )

    button.ui-button.ui-button--full-green(
      type="submit"
      v-text="submitText"
      v-show="!success"
    )
    div(
      v-show="success"
    ) Success
    .ui-error.error-server(
      v-html="error"
    )
</template>

<script>
import Api from "@/services/Api";
import EventBus from "@/event-bus";

export default {
  props: ["storeKey", "submitText", "action"],
  provide() {
    return {
      formKey: this.storeKey
    };
  },
  data() {
    return {
      login: "",
      password: "",
      error: null,
      success: false
    };
  },
  methods: {
    async save() {
      try {
        const storeObject = this.$store.state.forms[this.storeKey];
        const formData = {};

        Object.keys(storeObject).map(objectKey => {
          if (objectKey === "id") {
            if (storeObject[objectKey].value != "") {
              formData[objectKey] = storeObject[objectKey].value;
            }
          } else {
            formData[objectKey] = storeObject[objectKey].value;
          }
          return true;
        });

        const response = (await Api().post(`/admin${this.action}`, formData))
          .data;

        this.$store.commit("clearForm", {
          form: this.storeKey
        });
        this.success = true;

        EventBus.$emit(`form-success-${this.storeKey}`, true);

        setTimeout(() => {
          this.success = false;
        }, 3000);
        // this.$store.dispatch("setToken", response.token);
        // this.$store.dispatch("setUser", response.user);

        // this.$router.push("dashboard");
      } catch (err) {
        console.warn(err);
        if (!err.response || !err.response.status) {
          this.error = "Network error.<br> Please contact app developer";
        } else {
          switch (err.response.status) {
            case 422:
              this.displayErrors(err.response.data.errors);
              break;
            default:
              this.error = err.response.data.error;
          }
        }
      }
    },
    displayErrors(errors) {
      errors.forEach(error => {
        this.$store.commit("addFormInputError", {
          form: this.storeKey,
          input: error.param,
          value: error.msg
        });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
