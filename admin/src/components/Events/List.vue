<template lang="pug">
  .card
    h4.card-title List
    p.caption Click to edit or create new
    app-modal
    .row.list
      .col-xs-3
        app-list-add
      .col-xs-3(v-for='item in items')
        app-list-item(:item="item")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: 'events-list',
  data() {
    return {
      items: []
    };
  },
  components: {
    appListAdd: () => import('./ListAdd.vue'),
    appListItem: () => import('./ListItem.vue'),
    appModal: () => import("./Add/Modal.vue")
  },
  methods: {
    async get() {
      const response = (await contentService.events.get({})).data;

      this.items = response;
    }
  },
  mounted() {
    this.get();

    EventBus.$on("form-success-event", () => this.get());
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
