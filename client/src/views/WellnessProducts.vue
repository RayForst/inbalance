<template lang="pug">
  .page-preview
    .content-container.content
      .row
        .col-xs-12
          h1 Wellness Products
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

      this.items = filtered;
      this.items.unshift({
        image: null,
        name: "All products"
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

h1 {
  font-size: 32px;
  margin: 0;
  margin-bottom: 40px;
}
</style>

