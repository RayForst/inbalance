<template lang="pug">
  app-form(:action="action" :storeKey="'productLine'" :submitText="'Save'")
    app-form-input(:name="'name'" :label="'Name'")
    app-form-input(:name="'name_lv'" :label="'Name - LV'")
    app-form-input(:name="'name_ru'" :label="'Name - RU'")
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
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue")
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
