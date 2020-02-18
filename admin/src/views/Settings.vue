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
                  app-product-priority
                tab(name="Products Categories & Lines")
                  app-product-categories
                  app-product-subcategories
                  app-product-lines
                tab(name="SEO")
                  app-meta
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
    appMeta: () => import("@/components/Metadata/Settings"),
    appProductCategories: () =>
      import("@/components/PoductCategories/Main/List"),
    appProductLines: () => import("@/components/ProductLines/List"),
    appProductSubcategories: () =>
      import("@/components/PoductCategories/Subcategory/List"),
    appProductPriority: () => import("@/components/Products/Priority/List")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
