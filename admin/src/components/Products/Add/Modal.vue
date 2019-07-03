<template lang="pug">
  app-modal(
    v-if="show"
  )
    .card
      h4.card-title(v-if="isEdit") {{ editHeading }}
      h4.card-title(v-else="isEdit") {{ heading }}
      p.caption(
        v-html="caption"
      )
      app-form(:isEdit="isEdit")
</template>

<script>
import EventBus from "@/event-bus";

export default {
  name: "product-add-form",
  data() {
    return {
      show: false,
      heading: "Add Product",
      editHeading: "Edit Product",
      caption: "Fill all rows and save",
      isEdit: false,
      formKey: "product"
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
    EventBus.$on("modal-add-product", () => {
      this.show = true;
    });

    EventBus.$on("modal-edit-product", product => {
      this.updateStore(product);
      this.isEdit = true;
      this.show = true;
    });

    EventBus.$on(["modal-close", `form-success-${this.formKey}`], () => {
      this.show = false;
      this.isEdit = false;
      this.$store.commit("clearForm", {
        form: this.formKey
      });

      this.$notify({
        group: "main",
        title: "Saved!",
        type: "success",
        text: `Item was succesfuly updated`
      });
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
