<template lang="pug">
  app-modal(
    v-if="show"
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
    updateStore(item) {
      this.$store.commit("changeForm", {
        form: this.formKey,
        item
      });
    }
  },
  mounted() {
    EventBus.$on("modal-rename-category", category => {
      this.show = true;
      this.updateStore(category);
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
