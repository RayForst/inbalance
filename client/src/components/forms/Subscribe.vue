<template lang="pug">
  form.ui-form.row(
    @submit.prevent="save"
  )
    template(
      v-if="success"
    )
      .col-xs-12
        .success {{ $t('newsletter.form.success') }}
    template(
      v-else
    )
      .col-xs-12.col-lg-8 
        input(
          :placeholder="$t('newsletter.form.placeholder')"
          name="email"
          type="email"
          v-model="form.email.value"
        )
      .col-xs-12.col-lg-4
        button.ui-button.ui-button--full-green.fill {{ $t('newsletter.form.button') }}
      .col-xs-12
        .error(v-if="serverError") {{ serverError }}
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "subscribe",
  data() {
    return {
      success: false,
      serverError: null,
      errors: {
        already_subscribe: "This email is already subscribed"
      },
      form: {
        email: {
          value: null,
          error: null
        }
      }
    };
  },
  methods: {
    async save() {
      const $this = this;
      $this.clearErrors();

      try {
        const response = await contentService.subscription.save({
          email: this.form.email.value
        });

        $this.success = true;
        $this.clearForm();
      } catch (err) {
        if (err.response.status === 422) {
          err.response.data.errors.forEach(function(element) {
            $this.form[element.param].error = element.msg;
          });
        } else {
          console.log("ERRR :", err.response);
          if (err.response.data.error === "unique violation") {
            this.serverError = this.errors.already_subscribe;
          }
        }
      }
    },
    clearErrors() {
      this.serverError = "";
      for (var index in this.form) {
        this.form[index].error = null;
      }
    },
    clearForm() {
      for (var index in this.form) {
        if (index !== "type") this.form[index].value = null;
      }
    },
    resetForm() {
      this.success = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/css/_variables';

.error {
  color: red;
  padding: 10px 0;
}

.success {
  font-size: 22px;
  font-family: 'Lora', sans-serif;
  font-weight: bold;
  color: green;
  text-align: center;
  letter-spacing: 0.025em;
}
</style>
