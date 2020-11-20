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
            :isEdit="isEdit"
          )
            template(v-slot:en)
              app-form-input(:name="'name'" :label="'Name'" :required="true")
              app-form-text-editor(:name="'description'" :label="'Description and benefit'" :required="true" :key="'en'")
              app-form-text-editor(:name="'howtouse'" :label="'How to use it'" :key="'en_2'")
              app-form-text-editor(:name="'ingridients'" :label="'Ingridients'" :key="'en_3'")
              app-form-input(:name="'metatitle'" :label="'meta title'" :key="'en_4'")
              app-form-text(:name="'metadesc'" :label="'meta description'" :key="'en_5'")
                 
            template(v-slot:lv)
              app-form-input(:name="'name_lv'" :label="'Name - LV'" :required="true")
              app-form-text-editor(:name="'description_lv'" :label="'Description and benefit - LV'" :required="true" :key="'lv'")
              app-form-text-editor(:name="'howtouse_lv'" :label="'How to use it - LV'" :key="'lv_2'")
              app-form-text-editor(:name="'ingridients_lv'" :label="'Ingridients - LV'" :key="'lv_3'")
              app-form-input(:name="'metatitle_lv'" :label="'meta title - LV'" :key="'lv_4'")
              app-form-text(:name="'metadesc_lv'" :label="'meta description - LV'" :key="'lv_5'")
            
            template(v-slot:ru)
              app-form-input(:name="'name_ru'" :label="'Name - RU'" :required="true")
              app-form-text-editor(:name="'description_ru'" :label="'Description and benefit - RU'" :required="true" :key="'ru'")
              app-form-text-editor(:name="'howtouse_ru'" :label="'How to use it - RU'" :key="'ru_2'")
              app-form-text-editor(:name="'ingridients_ru'" :label="'Ingridients - RU'" :key="'ru_3'")
              app-form-input(:name="'metatitle_ru'" :label="'meta title - RU'" :key="'ru_4'")
              app-form-text(:name="'metadesc_ru'" :label="'meta description - RU'" :key="'ru_5'")

        .col-xs-12.col-md-6(style="padding-top: 16px;")
          app-form-select-group(:name="'ProductSubcategoryId'" :label="'Category'" :options="categories" :required="true")
          app-form-select(:name="'ProductLineId'" :label="'Product Line'" :options="lines" :required="true")
          app-form-images(:name="'images'" :label="'Images'" :required="true")
          .checkboxes-grid
              app-form-checkbox(:name="'priority'" :label="'Priority product'")
              app-form-checkbox(:name="'isNew'" :label="'Is new'")
              app-form-checkbox(:name="'show'" :label="'Show on site'")
          app-form-input(:name="'totalCount'" :label="'In available'")
          app-form-input(:name="'price'" :label="'Price'")
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

.checkboxes-grid {
    display: grid;
    grid-auto-columns: max-content;
    gap: 0 20px;

  .form-group {
    margin-bottom:5px;
    margin-top 5px;

    .label {
      margin-right: 20px;
    }
  }
}
</style>
