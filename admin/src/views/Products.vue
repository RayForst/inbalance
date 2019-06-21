<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Products'" :icon="'nc-app'")
      .card-container
        .row
          .col-xs-12
            app-product-list
</template>

<script>
export default {
  metaInfo: {
    title: "Products"
  },
  name: "products",
  data() {
    return {
      show: false
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appHeader: () => import("@/components/Header/Index"),
    appProductList: () => import("@/components/Products/List")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
