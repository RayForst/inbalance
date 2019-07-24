<template lang="pug">
  .card
    .row
      app-list-header(
        :icon="icon"
        :title="title"
        :sup="items.length"
      )
    .row.list
      template(v-if="items.length")
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
    .row
      .col-xs-12
        div No subscribes yet
</template>

<script>
import contentService from "@/services/ContentService";
import moment from "moment";

export default {
  name: "newsletter-list",
  data() {
    return {
      title: "Events subscribes",
      icon: "nc-notification-70",
      items: []
    };
  },
  methods: {
    async get() {
      const response = (await contentService.events.subscribtion({})).data;

      this.items = response;
    },
    date(date) {
      return moment(date).format("LL");
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
