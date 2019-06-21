<template lang="pug">
  .card
    h4.card-title Prefered product category on main
    p.caption Select category with will be displayed on main page
    app-form
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-priority",
  data() {
    return {};
  },
  components: {
    appForm: () => import("./Form.vue")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
