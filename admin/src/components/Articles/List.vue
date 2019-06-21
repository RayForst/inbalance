<template lang="pug">
  .card
    h4.card-title List super
    p.caption Click to edit or create new
    app-modal
    .row
      .col-xs-2
        app-list-add
      .col-xs-2(v-for='item in items')
        app-list-item(:item="item")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "articles-list",
  data() {
    return {
      items: []
    };
  },
  components: {
    appListAdd: () => import("./ListAdd.vue"),
    appListItem: () => import("./ListItem.vue"),
    appModal: () => import("./Add/Modal.vue")
  },
  methods: {
    async get() {
      const response = (await contentService.articles.get({})).data;

      this.items = response;
    }
  },
  mounted() {
    this.get();

    EventBus.$on("form-success-article", () => this.get());
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
