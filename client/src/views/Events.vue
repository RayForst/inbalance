<template lang="pug">
  .events
    .content-container.content
      app-event-calendar(:items="items" :date="date")
      app-list(:items="items")
    app-subscribe
</template>

<script>
import moment from "moment";
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product",
  metaInfo: {
    title: "Events"
  },
  data() {
    return {
      items: [],
      date: moment()
    };
  },
  components: {
    appList: () => import("@/components/events/List"),
    appSubscribe: () => import("@/components/Subscribe"),
    appEventCalendar: () => import("@/components/events/Calendar")
  },
  methods: {
    async get() {
      const events = (await contentService.events.get({
        year: this.date.year(),
        month: this.date.month() + 1
      })).data;

      this.items = events;

      EventBus.$emit("calendar-item-get", true);
    }
  },
  mounted() {
    this.get();

    EventBus.$on("draw-calendar", direction => {
      let date = this.date;
      let that = this;

      this.date = "";
      if (direction === "next") {
        date.add(1, "months");
      } else {
        date.subtract(1, "months");
      }

      setTimeout(function() {
        that.date = date;
        that.get();
      }, 50);
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url('https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg');
  display: flex;
  background-color: $c_primary;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}
</style>

