<template lang="pug">
  app-form(:action="'/categories'" :storeKey="'productMainCategory'" :submitText="'Save'")
    app-form-input(:name="'name'" :label="'Name'")
    app-form-input(:name="'name_lv'" :label="'Name - LV'")
    app-form-input(:name="'name_ru'" :label="'Name - RU'")
 
    app-form-input(:name="'metatitle'" :label="'meta title'" :key="'title'")
    app-form-input(:name="'metatitle_lv'" :label="'meta title - LV'" :key="'title_lv'")
    app-form-input(:name="'metatitle_ru'" :label="'meta title - RU'" :key="'title_ru'")

    app-form-text-editor(:name="'description'" :label="'description'")
    app-form-text-editor(:name="'description_lv'" :label="'description - LV'")
    app-form-text-editor(:name="'description_ru'" :label="'description - RU'")

    app-form-text(:name="'metadesc'" :label="'meta description'" :key="'desc'")
    app-form-text(:name="'metadesc_lv'" :label="'meta description - LV'" :key="'desc_lv'")
    app-form-text(:name="'metadesc_ru'" :label="'meta description - RU'" :key="'desc_ru'")

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
    appFormText: () => import("@/components/Form/Inputs/Text.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
