<template lang="pug">
  .card
    h4.card-title Newsletter subscribe list
    .row.list
    table.ui-table
        tr
          th #
          th Email
          th Created At
        tr(v-for="item, index in items")
          td {{ index + 1 }}
          td {{ item.email }}
          td {{ date(item.createdAt) }}
</template>

<script>
import contentService from "@/services/ContentService";
import moment from "moment";

export default {
  name: "newsletter-list",
  data() {
    return {
      items: []
    };
  },
  methods: {
    async get() {
      const response = (await contentService.newsletter.get({})).data;

      this.items = response;
    },
    date(date) {
      return moment(date).format("LL");
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
