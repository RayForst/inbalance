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
            th Phone
            th Client lang
            th Created At
          tr(v-for="item, index in items")
            td {{ index + 1 }}
            td {{ item.phone }} 
            td {{ item.userLang }}
            td {{ date(item.createdAt) }}
    .row(v-else)
      .col-xs-12
        h3 No requests yet
    </template>

<script>
import contentService from "@/services/ContentService";
import moment from "moment";

export default {
  name: "call-me-back",
  data() {
    return {
      title: "Call me back",
      icon: "nc-mobile",
      items: []
    };
  },
  methods: {
    async get() {
      this.items = (await contentService.callmeback.get({})).data;
    },
    date(date) {
      return moment(date).format("LL");
    }
  },
  mounted() {
    this.get();
  },
  components: {
    appListHeader: () => import("@/components/List/Header")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
