<template lang="pug">
  .card
    app-list-header(
      :icon="icon"
      :title="title"
      :wide="true"
    )
    app-form
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-priority",
  data() {
    return {
      title: "Prefered product category on main",
      icon: "nc-grid-45"
    };
  },
  components: {
    appForm: () => import("./Form.vue"),
    appListHeader: () => import("@/components/List/Header")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
