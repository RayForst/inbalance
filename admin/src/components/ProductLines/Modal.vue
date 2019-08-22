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
  name: "product-line-modal",
  data() {
    return {
      show: false,
      heading: "Product Line",
      formKey: "productLine",
      isEdit: false
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
    EventBus.$on("modal-add-line", () => {
      this.isEdit = false;
      this.show = true;
    });

    EventBus.$on("modal-edit-line", category => {
      this.updateStore(category);
      this.isEdit = true;
      this.show = true;
    });

    EventBus.$on(["modal-close", `form-success-${this.formKey}`], () => {
      this.show = false;
    });

    EventBus.$on(`form-success-${this.formKey}`, () => {
      this.$emit("update", true);
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
