<template lang="pug">
  .list.container.px-0-lg
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-4-lg.col-gap-4-sm.max-lg-item-9
          .col-xs-12.col-sm-6.col-md-4.col-lg-4(v-for="product in products.slice(offset, perPage + offset)")
            app-product(:content="product")
</template>

<script>
import appProduct from "@/components/products/Product";
import appPagination from "@/components/Pagination";
import EventBus from "@/event-bus";

export default {
  props: ["heading", "caption", "products", "perPage", "page"],
  data() {
    return {};
  },
  computed: {
    offset() {
      return this.page > 0 ? this.page * this.perPage : 0;
    }
  },
  components: {
    appProduct,
    appPagination
  }
};
</script>
