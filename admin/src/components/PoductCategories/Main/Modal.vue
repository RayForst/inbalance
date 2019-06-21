<template lang="pug">
  app-modal(
    v-show="show"
  ) 
    .card
      h4.card-title(
        v-html="heading"
      )
      app-form
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-category-edit",
  data() {
    return {
      show: false,
      heading: "Edit category",
      formKey: "productMainCategory"
    };
  },
  components: {
    appModal: () => import("@/components/Modal/Default.vue"),
    appForm: () => import("./Form.vue")
  },
  methods: {
    async get() {
      // const response = (await contentService.productCategories.get({})).data;
      // this.items = response;
      // this.loaded = true;
    },
    updateStore(name, id) {
      this.$store.commit("changeFormInput", {
        form: "productMainCategory",
        input: "name",
        value: name
      });

      this.$store.commit("changeFormInput", {
        form: "productMainCategory",
        input: "id",
        value: id
      });
    }
  },
  mounted() {
    this.get();

    EventBus.$on("modal-rename-category", category => {
      this.show = true;
      this.updateStore(category.name, category.id);
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
