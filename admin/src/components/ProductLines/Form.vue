<template lang="pug">
  app-form(:action="action" :storeKey="'productLine'" :submitText="'Save'")
    app-form-input(:name="'name'" :label="'Name'")
    app-form-input(:name="'name_lv'" :label="'Name - LV'")
    app-form-input(:name="'name_ru'" :label="'Name - RU'")

    app-form-input(:name="'metatitle'" :label="'meta title'" :key="'title'")
    app-form-input(:name="'metatitle_lv'" :label="'meta title - LV'" :key="'title_lv'")
    app-form-input(:name="'metatitle_ru'" :label="'meta title - RU'" :key="'title_ru'")

    app-form-text(:name="'metadesc'" :label="'meta description'" :key="'desc'")
    app-form-text(:name="'metadesc_lv'" :label="'meta description - LV'" :key="'desc_lv'")
    app-form-text(:name="'metadesc_ru'" :label="'meta description - RU'" :key="'desc_ru'")

    app-form-input-hidden(:name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  props: ["isEdit"],
  name: "product-add-line",
  data() {
    return {
      categories: [],
      loaded: false,
      actions: {
        add: "/product-lines",
        edit: "/product-lines/edit"
      }
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormText: () => import("@/components/Form/Inputs/Text.vue"),
  },
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
