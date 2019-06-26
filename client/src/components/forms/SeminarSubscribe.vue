<template lang="pug">
form.ui-form.row(
  @submit.prevent="save"
)
  .col-xs-12
    .row.input-row
      .col-xs-12.col-md-6
        input(
          :placeholder="$t('events.subscribe.form.firstname')"
          name="firstname"
          v-model="form.firstname.value"
          required
        )
      .col-xs-12.col-md-6
        input(
          :placeholder="$t('events.subscribe.form.lastname')"
          name="lastname"
          v-model="form.lastname.value"
          required
        )
  .col-xs-12
    .row.input-row
      .col-xs-12.col-md-6
        input(
          :placeholder="$t('events.subscribe.form.phone')"
          name="phone"
          v-model="form.phone.value"
        )
      .col-xs-12.col-md-6
        input(
          :placeholder="$t('events.subscribe.form.email')"
          name="email"
          v-model="form.email.value"
          type="email"
          required
        )  
  .col-xs-12
    template(v-if="success")
      .success {{ $t('events.subscribe.form.success') }}
    template(v-else)
      button.ui-button.ui-button--big.ui-button--full-green {{ $t('events.subscribe.form.button') }}
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "seminar-subscribe",
  data() {
    return {
      success: false,
      serverError: null,
      form: {
        firstname: {
          value: null,
          error: null
        },
        email: {
          value: null,
          error: null
        },
        lastname: {
          value: null,
          error: null
        },
        phone: {
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
          firstname: this.form.firstname.value,
          lastname: this.form.lastname.value,
          phone: this.form.phone.value,
          email: this.form.email.value,
          SubId: document.querySelector("#hidden").value
        };
        const response = await contentService.subscription.eventSave(data);

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

    
<style lang="stylus" scoped>
.input-row {
  padding-bottom: 30px;
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
