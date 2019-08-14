<template lang="pug">
  form(
    @submit.prevent="save"
  )
    input(
      type="tel" 
      name="phone"
      placeholder="Phone number"
      v-model='form.number.value'
    )
    button перезвоните мне  
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
        number: {
          value: "+371",
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


<style lang="stylus" scoped>
.success {
  font-size: 22px;
  font-family: 'Lora', sans-serif;
  font-weight: bold;
  color: green;
  text-align: center;
  letter-spacing: 0.025em;
}

form {
  background: #e5e5e5;
  padding: 20px;

  input {
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #cbcbcb;
    border-radius: 4px;
    height: 35px;
    padding: 0 10px;
    letter-spacing: 0.1em;
  }

  button {
    height: 35px;
    color: #fff;
    font-size: 11px;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: 1px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    background: #103324;
    margin-top: 10px;
    border-radius: 3px;
  }
}
</style>
