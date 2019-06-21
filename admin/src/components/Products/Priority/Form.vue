<template lang="pug">
  app-form(:action="'/settings/priority'" :storeKey="'productPriority'" :submitText="'Save'")
    template(
      v-if="loaded"
    )
      app-form-select(:name="'id'" :label="'Subcategory'" :options="categories")
    template(
      v-else
    )
      | Loading...
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  props: ["isEdit"],
  name: "product-add-category-form",
  data() {
    return {
      categories: [],
      loaded: false,
      formKey: "productPriority"
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormSelect: () => import("@/components/Form/Inputs/Select.vue")
  },
  methods: {
    async get() {
      const response = (await contentService.productCategories.get({})).data;
      const priority = (await contentService.priority.get({})).data;

      response.forEach((object, index) => {
        this.categories.push({
          value: object.id,
          title: object.name
        });
      });

      this.$store.commit("changeFormInput", {
        form: this.formKey,
        input: "id",
        value: priority[0].priorityOnMain
      });

      console.log("PRI", priority);

      this.loaded = true;
    }
  },
  mounted() {
    this.get();

    EventBus.$on(`form-success-${this.formKey}`, () => {
      this.$router.go();
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
