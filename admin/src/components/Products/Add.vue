<template lang="pug">
  section.add
    app-form(
      v-if="loaded"
      :action="action"
      :storeKey="'product'"
      :submitText="'Save'"
      :translate="true"
    )
      .row
        .col-xs-12.col-md-6
          app-form-input(:name="'name'" :label="'Name'" :required="true")
          app-form-select(:name="'ProductSubcategoryId'" :label="'Category'" :options="categories" :required="true")
          app-form-input(:name="'priority'" :label="'Priority'" :type="'checkbox'")
          app-form-text-editor(:name="'description'" :label="'Description and benefit'" :required="true")
        .col-xs-12.col-md-6
          app-form-images(:name="'images'" :label="'Images'" :required="true")
          app-form-text(:name="'howtouse'" :label="'How to use it'")
          app-form-text(:name="'ingridients'" :label="'Ingridients'")

          template(
            v-if="isEdit"
          )
            app-form-input-hidden(:name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "product-add-form",
  props: ["isEdit"],
  data() {
    return {
      loaded: false,
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
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue")
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
