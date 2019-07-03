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
  name: "event-list-modal",
  data() {
    return {
      show: false,
      heading: "Add Event",
      editHeading: "Edit Event",
      isEdit: false,
      formKey: "event",
      caption: "Fill all rows and save"
    };
  },
  methods: {
    updateStore(item) {
      this.$store.commit("changeForm", {
        form: this.formKey,
        item
      });
    }
  },
  components: {
    appModal: () => import("@/components/Modal/Default.vue"),
    appForm: () => import("./Form.vue")
  },
  mounted() {
    EventBus.$on("modal-add-event", () => {
      this.show = true;
    });

    EventBus.$on("modal-edit-event", item => {
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
