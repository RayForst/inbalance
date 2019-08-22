<template lang="pug">
  .products
    .content-container.content
      .row
        .col-xs-12.col-lg-3
          app-menu(:slug="slug")
        .col-xs-12.col-lg-9
          .product-desc(v-if="description")
            read-more(
              :more-str="$t('readmore.open')" 
              :text="description" 
              link="#" 
              :less-str="$t('readmore.close')" 
              :max-chars="280")
          app-products(
            :products="products"
            :perPage="onPage"
            :page="page"
          )
          app-pagination(
            :total="products.length" 
            :perPage="onPage" 
            :current="page"
            @newpage="changePage"
          )
    app-subscribe
    app-callback
</template>

<script>
import contentService from "@/services/ContentService";
import appProducts from "@/components/products/List";
import appSubscribe from "@/components/Subscribe";
import appMenu from "@/components/products/Menu";
import appPagination from "@/components/Pagination";
import appCallback from "@/components/CallMeBack";
import LocaleService from "@/services/LocaleService";

export default {
  metaInfo: {
    title: "Producs"
  },
  name: "products",
  props: ["slug", "subcategory", "line"],
  data() {
    return {
      products: [],
      onPage: 9,
      page: 0,
      description: null
    };
  },
  components: {
    appProducts,
    appSubscribe,
    appMenu,
    appPagination,
    appCallback
  },
  methods: {
    async get() {
      console.log(this.line, this.subcategory, this.slug);

      if (!this.line) {
        let request = this.subcategory
          ? {
              subcategory: this.subcategory
            }
          : {
              category: this.slug
            };

        const response = (await contentService.products.get(request)).data;
        const desc = (await contentService.products.getDesc(request)).data;

        this.description = this.toLocale(desc[0], "description");
        this.products = response;
      } else {
        let response;
        if (this.line === "all") {
          console.log("all lines request");
          response = (await contentService.products.get({
            category: this.slug
          })).data;
        } else {
        }

        this.description = null;
        this.products = response;
      }
    },
    toLocale(item, field) {
      return LocaleService.toLocale(item, field, this.$i18n.locale);
    },
    changePage(event, lala) {
      this.page = event;
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
  position: relative;

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
