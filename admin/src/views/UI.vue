<template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            .card
              h1 UI
              app-colors
              app-buttons
              app-icons
              
</template>

<script>
export default {
  metaInfo: {
    title: "Icons"
  },
  name: "icons",
  data() {
    return {
      show: false
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appColors: () => import("@/components/UI/Colors"),
    appButtons: () => import("@/components/UI/Buttons"),
    appIcons: () => import("@/components/UI/Icons")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
