<template lang="pug">
  form.ui-form.row.center-xs(
    @submit.prevent="save"
  )
    .col-xs-12.form-group
      input(
        :placeholder="$t('contacts.form.fullname')"
        name="fullname"
        v-model="form.fullname.value"
        required
      )
    .col-xs-12.form-group
      input(
        :placeholder="$t('contacts.form.email')"
        name="email"
        v-model="form.email.value"
        required
      )
    .col-xs-12.form-group
      textarea(
        :placeholder="$t('contacts.form.message')" 
        name="text"
        v-model="form.text.value"
        required
      )
    .col-xs-12.form-group
      template(v-if="success")
        .success {{ $t('contacts.form.success') }}
      template(v-else)
        button.ui-button.ui-button--big.ui-button--full-green {{ $t('contacts.form.button') }}
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "contact-request",
  data() {
    return {
      success: false,
      serverError: null,
      form: {
        fullname: {
          value: null,
          error: null
        },
        email: {
          value: null,
          error: null
        },
        text: {
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
        let data = {
          fullname: this.form.fullname.value,
          email: this.form.email.value,
          text: this.form.text.value
        };

        const response = await contentService.contactRequest.save(data);

        $this.success = true;
        $this.clearForm();
      } catch (err) {
        // if (err.response.status === 422) {
        //   err.response.data.errors.forEach(function(element) {
        //     $this.form[element.param].error = element.msg;
        //   });
        // } else {
        //   console.log("ERRR :", err.response);
        //   if (err.response.data.error === "unique violation") {
        //     this.serverError = this.errors.already_subscribe;
        //   }
        // }
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


    
