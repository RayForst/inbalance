<template lang="pug">
  .card
    h4.card-title Event subscribe list
    .row.list
    table.ui-table
        tr
          th #
          th Name
          th Email
          th Phone
          th Event
          th Created At
        tr(v-for="item, index in items")
          td {{ index + 1 }}
          td {{ item.firstname }} {{ item.lastname }}
          td {{ item.email }}
          td {{ item.phone }}
          td 
            a.ui-link(:href="'/events/' + item['Event.slug']" target="_blank") {{ item['Event.name'] }}
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
      const response = (await contentService.events.subscribtion({})).data;

      console.log("wut?", response);
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
