<template lang="pug">
  .page-preview
    .content-container.content
      .row.center-xs
        .col-xs-8.heading
          h1 {{ $t('wellness_procedures_title') }}
          p {{ $t('wellness_procedures_desc') }}
      app-list(:items="items" :small="true")
      .spacer
    app-subscribe
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "wellness-procedures",
  metaInfo: {
    title: "Wellness Procedures"
  },
  data() {
    return {
      items: []
    };
  },
  components: {
    appList: () => import("@/components/pagePreview/List"),
    appSubscribe: () => import("@/components/Subscribe")
  },
  methods: {
    async get() {
      const menu = (await contentService.static.getMenu()).data;
      const filtered = menu.filter(item => {
        return item.menupos === 2;
      });
      const stateObj = this.$store.state.menu[2];

      this.items = filtered;
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

.heading {
  h1 {
    font-size: 36px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.28em;
    letter-spacing: normal;
    color: #000;
  }

  p {
    margin: 0;
    white-space: pre-wrap;
    line-height: 1.5em;
    font-size: 18px;
    margin-bottom: 50px;
  }
}
</style>

