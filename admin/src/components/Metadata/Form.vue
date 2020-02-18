<template lang="pug">
  app-form(
    :action="'/settings_seo'"
    :storeKey="'settings_seo'" 
    :submitText="'Save'"
  )
    app-form-input(:name="'index_title'" :label="'INDEX - title - EN'")
    app-form-input(:name="'index_title_lv'" :label="'INDEX - title - LV'")
    app-form-input(:name="'index_title_ru'" :label="'INDEX - title - RU'")
    app-form-input(:name="'index_desc'" :label="'INDEX - description - EN'")
    app-form-input(:name="'index_desc_lv'" :label="'INDEX - description - LV'")
    app-form-input(:name="'index_desc_ru'" :label="'INDEX - description - RU'")

    app-form-input(:name="'events_title'" :label="'EVENTS - title - EN'")
    app-form-input(:name="'events_title_lv'" :label="'EVENTS - title - LV'")
    app-form-input(:name="'events_title_ru'" :label="'EVENTS - title - RU'")
    app-form-input(:name="'events_desc'" :label="'EVENTS - description - EN'")
    app-form-input(:name="'events_desc_lv'" :label="'EVENTS - description - LV'")
    app-form-input(:name="'events_desc_ru'" :label="'EVENTS - description - RU'")

    app-form-input(:name="'articles_title'" :label="'ARTICLES - title - EN'")
    app-form-input(:name="'articles_title_lv'" :labeARTICLESl="'ARTICLES - title - LV'")
    app-form-input(:name="'articles_title_ru'" :label="'ARTICLES - title - RU'")
    app-form-input(:name="'articles_desc'" :label="'ARTICLES - description - EN'")
    app-form-input(:name="'articles_desc_lv'" :label="'ARTICLES - description - LV'")
    app-form-input(:name="'articles_desc_ru'" :label="'ARTICLES - description - RU'")

    app-form-input(:name="'w_proc_title'" :label="'WELLNESS PROCEDURES - title - EN'")
    app-form-input(:name="'w_proc_title_lv'" :label="'WELLNESS PROCEDURES - title - LV'")
    app-form-input(:name="'w_proc_title_ru'" :label="'WELLNESS PROCEDURES - title - RU'")
    app-form-input(:name="'w_proc_desc'" :label="'WELLNESS PROCEDURES - description - EN'")
    app-form-input(:name="'w_proc_desc_lv'" :label="'WELLNESS PROCEDURES - description - LV'")
    app-form-input(:name="'w_proc_desc_ru'" :label="'WELLNESS PROCEDURES - description - RU'")

    app-form-input(:name="'w_prod_title'" :label="'WELLNESS PRODUCTS - title - EN'")
    app-form-input(:name="'w_prod_title_lv'" :label="'WELLNESS PRODUCTS - title - LV'")
    app-form-input(:name="'w_prod_title_ru'" :label="'WELLNESS PRODUCTS - title - RU'")
    app-form-input(:name="'w_prod_desc'" :label="'WELLNESS PRODUCTS - description - EN'")
    app-form-input(:name="'w_prod_desc_lv'" :label="'WELLNESS PRODUCTS - description - LV'")
    app-form-input(:name="'w_prod_desc_ru'" :label="'WELLNESS PRODUCTS - description - RU'")

    app-form-input(:name="'contacts_title'" :label="'CONTACTS - title - EN'")
    app-form-input(:name="'contacts_title_lv'" :label="'CONTACTS - title - LV'")
    app-form-input(:name="'contacts_title_ru'" :label="'CONTACTS - title - RU'")
    app-form-input(:name="'contacts_desc'" :label="'CONTACTS - description - EN'")
    app-form-input(:name="'contacts_desc_lv'" :label="'CONTACTS - description - LV'")
    app-form-input(:name="'contacts_desc_ru'" :label="'CONTACTS - description - RU'")

</template>

<script>
export default {
  name: "settings-seo-form",
  data() {
    return {
      categories: []
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormText: () => import("@/components/Form/Inputs/Text.vue"),
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
