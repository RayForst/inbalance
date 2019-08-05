<template lang="pug">
  .products
    .content-container.content
      .row
        .col-xs-12.col-lg-3
          app-menu(:slug="slug")
        .col-xs-12.col-lg-9
          app-products(:products="products")
          app-pagination(:total="products.length" :perPage="onPage")
    app-subscribe
</template>

<script>
import contentService from "@/services/ContentService";
import appProducts from "@/components/products/List";
import appSubscribe from "@/components/Subscribe";
import appMenu from "@/components/products/Menu";
import appPagination from "@/components/Pagination";

export default {
  metaInfo: {
    title: "Producs"
  },
  name: "products",
  props: ["slug", "subcategory"],
  data() {
    return {
      products: [],
      onPage: 3,
      page: 0
    };
  },
  components: {
    appProducts,
    appSubscribe,
    appMenu,
    appPagination
  },
  methods: {
    async get() {
      let request = this.subcategory
        ? {
            subcategory: this.subcategory
          }
        : {
            category: this.slug
          };

      request.limit = this.onPage;
      request.page = this.page;
      const response = (await contentService.products.get(request)).data;

      if (Object.keys(response).length < 1) {
        return this.$router.push({ name: "error" });
      }

      this.products = response;
    }
  },
  mounted() {
    this.get();
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.category-line {
  width: 1px;
  margin: 0 auto;
  height: 100%;
  background: rgba(#324148, 0.2);
}

.products {
  @media $media_lg {
    padding-top: 20px;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
