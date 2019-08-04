<template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            .card
              tabs(:options="{ useUrlFragment: false }")
                tab(name="Main Settings")
                  app-settings
                tab(name="Product Categories")
                  app-product-categories
                tab(name="Product Subcategories")
                  app-product-subcategories
                tab(name="Prefered product category on main")
                  app-product-priority
</template>

<script>
export default {
  metaInfo: {
    title: "Settings"
  },
  name: "Settings",
  data() {
    return {
      show: false
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appSettings: () => import("@/components/Settings/Settings"),
    appProductCategories: () =>
      import("@/components/PoductCategories/Main/List"),
    appProductSubcategories: () =>
      import("@/components/PoductCategories/Subcategory/List"),
    appProductPriority: () => import("@/components/Products/Priority/List")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
