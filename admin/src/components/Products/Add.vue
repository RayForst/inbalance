<template lang="pug">
  section.add
    app-form(
      v-if="loaded"
      :action="action"
      :storeKey="storeKey"
      :submitText="'Save'"
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
          app-form-select-group(:name="'ProductSubcategoryId'" :label="'Category'" :options="categories" :required="true")
          app-form-select(:name="'ProductLineId'" :label="'Product Line'" :options="lines" :required="true")
          app-form-images(:name="'images'" :label="'Images'" :required="true")
          app-form-checkbox(:name="'priority'" :label="'Priority'")
          app-form-checkbox(:name="'show'" :label="'Show'")
          app-form-input-hidden( v-if="isEdit" :name="'id'")
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
      lines: [],
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
    appFormSelectGroup: () =>
      import("@/components/Form/Inputs/SelectGroup.vue"),
    appFormSelect: () => import("@/components/Form/Inputs/Select.vue"),
    appFormImages: () => import("@/components/Form/Inputs/Images.vue"),
    appFormCheckbox: () => import("@/components/Form/Inputs/Checkbox.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormTranslate: () => import("@/components/Form/Translations")
  },
  methods: {
    async get() {
      let response = (await contentService.productSubcategories.get({})).data;
      let responseLines = (await contentService.productLines.get({})).data;

      console.log("response lines", responseLines);
      let result = [];
      let lines = [];

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

      responseLines.forEach((object, index) => {
        lines[index] = {
          title: object.name,
          value: object.id
        };
      });

      const filtered = result.filter(function(el) {
        return el != null;
      });

      this.categories = filtered;
      this.lines = lines;
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
