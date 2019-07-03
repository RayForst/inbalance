<template lang="pug">
  app-modal(
    v-if="show"
  ) 
    .card
      h4.card-title(
        v-html="heading"
      )
      app-form(:isEdit="isEdit")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-subcategory-modal",
  data() {
    return {
      show: false,
      heading: "Subcategory",
      formKey: "productCategory",
      isEdit: false
    };
  },
  components: {
    appModal: () => import("@/components/Modal/Default.vue"),
    appForm: () => import("./Form.vue")
  },
  methods: {
    updateStore(name, id, categoryId) {
      this.$store.commit("changeFormInput", {
        form: this.formKey,
        input: "name",
        value: name
      });

      this.$store.commit("changeFormInput", {
        form: this.formKey,
        input: "id",
        value: id
      });

      this.$store.commit("changeFormInput", {
        form: this.formKey,
        input: "ProductCategoryId",
        value: categoryId
      });
    }
  },
  mounted() {
    EventBus.$on("modal-add-subcategory", () => {
      this.isEdit = false;
      this.show = true;
    });

    EventBus.$on("modal-edit-subcategory", category => {
      this.updateStore(category.name, category.id, category.categoryId);
      this.isEdit = true;
      this.show = true;
    });

    EventBus.$on(["modal-close", `form-success-${this.formKey}`], () => {
      this.show = false;
    });

    EventBus.$on(`form-success-${this.formKey}`, () => {
      this.$router.go();
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
