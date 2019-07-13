
<template lang="pug">
  .list.container.px-0-lg.product-list-preview
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        .headings
          h2.text-center(
            v-html="heading"
          )
          .text-center(v-if="caption")
            .caption {{ caption }}
        .row.col-gap-4-lg.col-gap-4-sm.max-xs-item-3.max-sm-item-4.max-lg-item-4
          .col-xs-12.col-sm-6.col-md-4.col-lg-3(v-for="product, index in items" :key="product.name" v-if="index <= 5")
            app-product(v-bind:content="product")
</template>

<script>
import appProduct from "@/components/products/Product";

export default {
  props: ["heading", "caption", "products"],
  data() {
    return {};
  },
  components: {
    appProduct
  },
  computed: {
    items() {
      return this.products;
    }
  }
};
</script>

<style lang="stylus">
@import '~@/assets/css/_variables';

.product-list-preview {
  h2 {
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: normal;
    margin-top: 0;

    b {
      display: block;
    }

    @media $media_sm {
      margin-top: 10px;

      b {
        @media $media_sm {
          display: inline;
        }
      }
    }

    @media $media_md {
      margin-top: 20px;
    }

    @media $media_lg {
      margin-top: 50px;
    }
  }

  .caption {
    font-size: 18px;
    font-weight: 300;
    line-height: 1.56em;
    color: #103324;
    margin-bottom: 7px;
  }

  .headings {
    margin-bottom: 35px;
  }
}
</style>
