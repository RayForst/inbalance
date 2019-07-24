  <template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar

      .card-container
        .row
          .col-xs-12
            .card
              .row
                app-list-header(
                  :icon="icon"
                  :title="title"
                )
              .row.list
                .col-xs-12.col-lg-4
                  appEditor(:locale="'en'")
                .col-xs-12.col-lg-4
                  appEditor(:locale="'ru'")
                .col-xs-12.col-lg-4
                  appEditor(:locale="'lv'")
</template>

<script>
export default {
  metaInfo: {
    title: "Translations"
  },
  name: "Translations",
  data() {
    return {
      title: "Static strings Translations",
      icon: "nc-caps-small",
      show: false
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appEditor: () => import("@/components/Translations/JsonForm"),
    appListHeader: () => import("@/components/List/Header")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
