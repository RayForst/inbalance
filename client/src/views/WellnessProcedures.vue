<template lang="pug">
  .events
    .content-container.content
      app-list(:items="items")
    app-subscribe
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "wellness-procedures",
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
    appSubscribe: () => import("@/components/Subscribe")
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
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
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

