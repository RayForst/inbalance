<template lang="pug">
  app-modal(
    v-show="show"
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
  name: "articles-list-modal",
  data() {
    return {
      show: false,
      heading: "Add Article",
      editHeading: "Edit Article",
      caption: "Fill all rows and save",
      isEdit: false,
      formKey: "article"
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
    EventBus.$on("modal-add-article", () => {
      this.show = true;
    });

    EventBus.$on("modal-edit-article", item => {
      this.updateStore(item);
      this.isEdit = true;
      this.show = true;
    });

    EventBus.$on(["modal-close", `form-success-${this.formKey}`], () => {
      this.show = false;
      this.isEdit = false;
      this.$store.commit("clearForm", {
        form: this.formKey
      });
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
