<template lang="pug">
  section.add
    app-form(
      v-if="loaded"
      :action="action"
      :storeKey="storeKey"
      :submitText="'Save'"
      :translate="true"
    )
      .row
        .col-xs-12.col-md-6
          app-form-translate(
            :storeKey="storeKey"
          )
            template(v-slot:en)
              app-form-input(:name="'name'" :label="'Name'" :required="true")
              app-form-text-editor(:name="'description'" :label="'Description and benefit'" :required="true" :key="'en'")
              app-form-text(:name="'howtouse'" :label="'How to use it'")
              app-form-text(:name="'ingridients'" :label="'Ingridients'")

            template(v-slot:lv)
              app-form-input(:name="'name_lv'" :label="'Name - LV'" :required="true")
              app-form-text-editor(:name="'description_lv'" :label="'Description and benefit - LV'" :required="true" :key="'lv'")
              app-form-text(:name="'howtouse_lv'" :label="'How to use it - LV'")
              app-form-text(:name="'ingridients_lv'" :label="'Ingridients - LV'")
            
            template(v-slot:ru)
              app-form-input(:name="'name_ru'" :label="'Name - RU'" :required="true")
              app-form-text-editor(:name="'description_ru'" :label="'Description and benefit - RU'" :required="true" :key="'ru'")
              app-form-text(:name="'howtouse_ru'" :label="'How to use it - RU'")
              app-form-text(:name="'ingridients_ru'" :label="'Ingridients - RU'")

        .col-xs-12.col-md-6
          app-form-select(:name="'ProductSubcategoryId'" :label="'Category'" :options="categories" :required="true")
          app-form-images(:name="'images'" :label="'Images'" :required="true")
          app-form-input(:name="'priority'" :label="'Priority'" :type="'checkbox'")
         
          template(
            v-if="isEdit"
          )
            app-form-input-hidden(:name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "product-add-form",
  props: ["isEdit", "item"],
  data() {
    return {
      loaded: false,
      storeKey: "product",
      categories: [],
      actions: {
        add: "/product",
        edit: "/product/edit"
      }
    };
  },
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    }
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormText: () => import("@/components/Form/Inputs/Text.vue"),
    appFormSelect: () => import("@/components/Form/Inputs/SelectGroup.vue"),
    appFormImages: () => import("@/components/Form/Inputs/Images.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormTranslate: () => import("@/components/Form/Translations")
  },
  methods: {
    async get() {
      let response = (await contentService.productSubcategories.get({})).data;

      let result = [];

      response.forEach((object, index) => {
        if (typeof result[object.ProductCategoryId - 1] === "undefined") {
          result[object.ProductCategoryId - 1] = {
            name: object["ProductCategory.name"],
            values: []
          };
        }

        result[object.ProductCategoryId - 1].values.push({
          name: object.name,
          id: object.id
        });
      });

      const filtered = result.filter(function(el) {
        return el != null;
      });

      this.categories = filtered;
      this.loaded = true;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
