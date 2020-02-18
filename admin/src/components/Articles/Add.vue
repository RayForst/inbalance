<template lang="pug">
  app-form(
    :action="action"
    :storeKey="storeKey" 
    :submitText="'Save'"
  )
    .row
      .col-xs-12.col-md-6
        app-form-translate(
          :storeKey="storeKey"
          :isEdit="isEdit"
        )
          template(v-slot:en)
            app-form-input(:name="'name'" :label="'Name'" :required="true")
            app-form-text-editor(:name="'text'" :label="'Text'" :required="true" :key="'en'")
            app-form-input(:name="'metatitle'" :label="'meta title'" :key="'en_4'")
            app-form-text(:name="'metadesc'" :label="'meta description'" :key="'en_5'")
                 
          template(v-slot:lv)
            app-form-input(:name="'name_lv'" :label="'Name - LV'" :required="true")
            app-form-text-editor(:name="'text_lv'" :label="'Text - LV'" :required="true" :key="'lv'")
            app-form-input(:name="'metatitle_lv'" :label="'meta title - LV'" :key="'lv_4'")
            app-form-text(:name="'metadesc_lv'" :label="'meta description - LV'" :key="'lv_5'")
            
          template(v-slot:ru)
            app-form-input(:name="'name_ru'" :label="'Name - RU'" :required="true")
            app-form-text-editor(:name="'text_ru'" :label="'Text - RU'" :required="true" :key="'ru'")
            app-form-input(:name="'metatitle_ru'" :label="'meta title - RU'" :key="'ru_4'")
            app-form-text(:name="'metadesc_ru'" :label="'meta description - RU'" :key="'ru_5'")

      .col-xs-12.col-md-6
        app-form-image(:name="'image'" :label="'Main image'" :required="true")
        app-form-checkbox(:name="'show'" :label="'Show'")
        app-form-input-hidden(v-if="isEdit" :name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "article-add-form",
  props: ["isEdit"],
  data() {
    return {
      storeKey: "article",
      categories: [],
      actions: {
        add: "/article",
        edit: "/article/edit"
      }
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormText: () => import("@/components/Form/Inputs/Text.vue"),
    appFormImage: () => import("@/components/Form/Inputs/Image.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormTranslate: () => import("@/components/Form/Translations"),
    appFormCheckbox: () => import("@/components/Form/Inputs/Checkbox.vue")
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
