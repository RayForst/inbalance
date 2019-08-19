<template lang="pug">
  .card
    .row
      app-list-header(
        :icon="icon"
        :title="title"
        :sup="items.length"
      )
    .row.list(v-if="items.length")
      .col-xs-12
        table.ui-table
          tr
            th #
            th Email
            th Created At
          tr(v-for="item, index in items")
            td {{ item.id }}
            td {{ item.email }}
            td {{ date(item.createdAt) }}
    .row(v-else)
      .col-xs-12
        h3 No subscribes yet
</template>

<script>
import contentService from "@/services/ContentService";
import moment from "moment";

export default {
  name: "newsletter-list",
  data() {
    return {
      title: "Newsletter subs",
      icon: "nc-favourite-28",
      items: []
    };
  },
  methods: {
    async get() {
      this.items = (await contentService.newsletter.get({})).data;
    },
    date(date) {
      return moment(date).format("ll");
    }
  },
  components: {
    appListHeader: () => import("@/components/List/Header")
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
