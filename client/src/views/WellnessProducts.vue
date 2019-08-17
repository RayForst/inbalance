<template lang="pug">
  .page-preview
    .content-container.content
      .row.center-xs
        .col-xs-8.heading
          h1 {{ $t('wellness_products_title') }}
          p {{ $t('wellness_products_desc') }}
      app-list(:items="items")
      .spacer
    app-subscribe
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "wellness-products",
  metaInfo: {
    title: "Wellness products"
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
        return item.menupos === 3;
      });
      const stateObj = this.$store.state.menu[3];

      this.items = filtered;
      this.items.unshift({
        image: null,
        name: this.$t("menu.links.products"),
        route: stateObj.links[0].route.name,
        slug: stateObj.links[0].route.slug
      });

      console.log("items", this.items);
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
    font-size: 14px;
    margin-bottom: 50px;
  }
}
</style>

