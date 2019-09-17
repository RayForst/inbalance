<template lang="pug">
  app-form(:action="'/categories'" :storeKey="'productMainCategory'" :submitText="'Save'")
    app-form-input(:name="'name'" :label="'Name'")
    app-form-input(:name="'name_lv'" :label="'Name - LV'")
    app-form-input(:name="'name_ru'" :label="'Name - RU'")

    app-form-text(:name="'description'" :label="'description'")
    app-form-text(:name="'description_lv'" :label="'description - LV'")
    app-form-text(:name="'description_ru'" :label="'description - RU'")
    app-form-input-hidden(:name="'id'")
</template>

<script>
export default {
  name: "product-add-form",
  data() {
    return {};
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormText: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
