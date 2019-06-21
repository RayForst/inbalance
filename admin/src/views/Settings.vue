<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Settings'" :icon="'nc-settings-90'")
      .card-container
        .row
          .col-xs-6
            app-settings
          .col-xs-6
            app-product-categories
            app-product-subcategories
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
    appHeader: () => import("@/components/Header/Index"),
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
