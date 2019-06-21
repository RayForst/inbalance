<template lang="pug">
  app-form(
    :action="'/settings'"
    :storeKey="'settings'" 
    :submitText="'Save'"
  )
    app-form-input(:name="'email'" :label="'Email on site'")
    app-form-input(:name="'contactFormEmail'" :label="'Emails for contact requests'")
    app-form-input(:name="'contactFormSubject'" :label="'Contact form subject'")
    app-form-input(:name="'lat'" :label="'Map lat'")
    app-form-input(:name="'long'" :label="'Map long'")
    app-form-input(:name="'phone'" :label="'Contact phone'")
    app-form-input(:name="'address'" :label="'Contact address'")
    app-form-input(:name="'copyright'" :label="'copyright'")
    app-form-input(:name="'facebook'" :label="'Facebook page'")
    app-form-input(:name="'instagram'" :label="'Instagram page'")
</template>

<script>
export default {
  name: "settings-form",
  data() {
    return {
      categories: []
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
