<template lang="pug">
  app-form(:action="action" :storeKey="'productCategory'" :submitText="'Save'")
    app-form-input(:name="'name'" :label="'Name'")

    template(
      v-if="isEdit"
    )
      app-form-input-hidden(:name="'id'")
      
    template(
      v-if="loaded"
    )
      app-form-select(:name="'ProductCategoryId'" :label="'Main Category'" :options="categories")
    template(
      v-else
    )
      | Loading...
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  props: ["isEdit"],
  name: "product-add-category-form",
  data() {
    return {
      categories: [],
      loaded: false,
      actions: {
        add: "/categories/subcategories",
        edit: "/categories/subcategories/edit"
      }
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormSelect: () => import("@/components/Form/Inputs/Select.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue")
  },
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    }
  },
  methods: {
    async get() {
      const response = (await contentService.productCategories.get({})).data;

      response.forEach((object, index) => {
        this.categories.push({
          value: object.id,
          title: object.name
        });
      });

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
