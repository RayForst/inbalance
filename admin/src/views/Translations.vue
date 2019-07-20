  <template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar

      .card-container
        .row
          .col-xs-12
            .card
              .row
                .col-xs-12
                  h4.card-title Static strings Translations
                  p.caption Be aware for making mistakes, it can break site content
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
      show: false
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appEditor: () => import("@/components/Translations/JsonForm")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
