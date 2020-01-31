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
            app-form-text-editor(:name="'caption'" :label="'Caption - only for priority events'" :key="'caption_en'")
            app-form-text-editor(:name="'description'" :label="'Description'" :required="true" :key="'en'")
         
          template(v-slot:lv)
            app-form-input(:name="'name_lv'" :label="'Name - LV'" :required="true")
            app-form-text-editor(:name="'caption_lv'" :label="'Caption - only for priority events - LV'" :key="'caption_lv'")
            app-form-text-editor(:name="'description_lv'" :label="'Description - LV'" :required="true" :key="'lv'")

          template(v-slot:ru)
            app-form-input(:name="'name_ru'" :label="'Name - RU'" :required="true")
            app-form-text-editor(:name="'caption_ru'" :label="'Caption - only for priority events - RU'" :key="'caption_ru'")
            app-form-text-editor(:name="'description_ru'" :label="'Description - RU'" :required="true" :key="'ru'")

      .col-xs-12.col-md-6
        app-form-datepicker(:name="'dateStart'" :label="'Date start'" :required="true")
        app-form-datepicker(:name="'dateEnd'" :label="'Date end'")
        app-form-checkbox(:name="'priority'" :label="'Priority'")
        app-form-checkbox(:name="'preview'" :label="'Only preview'")
        app-form-checkbox(:name="'show'" :label="'Show'")
        app-form-image(:name="'image'" :label="'Main image'" :required="true")
        app-form-images(:name="'images'" :label="'Additional images'")
        app-form-input-hidden(v-if="isEdit" :name="'id'")
</template>

<script>
export default {
  name: "event-add-form",
  data() {
    return {
      storeKey: "event",
      actions: {
        add: "/events",
        edit: "/events/edit"
      },
      categories: []
    };
  },
  props: ["isEdit"],
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormDatepicker: () => import("@/components/Form/Inputs/Datepicker.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormImage: () => import("@/components/Form/Inputs/Image.vue"),
    appFormCheckbox: () => import("@/components/Form/Inputs/Checkbox.vue"),
    appFormImages: () => import("@/components/Form/Inputs/Images.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormTranslate: () => import("@/components/Form/Translations")
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
