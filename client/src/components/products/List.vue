<template lang="pug">
  .list.container.px-0-lg
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-4-lg.col-gap-4-sm.max-lg-item-9
          .col-xs-12.col-sm-6.col-md-4.col-lg-4(v-for="product in products")
            app-product(:content="product")
      .col-xs-12.center-xs
        .spacer
        //- app-pagination
</template>

<script>
import appProduct from "@/components/products/Product";
import appPagination from "@/components/Pagination";

export default {
  props: ["heading", "caption", "products"],
  data() {
    return {};
  },
  components: {
    appProduct,
    appPagination
  }
};
</script>
