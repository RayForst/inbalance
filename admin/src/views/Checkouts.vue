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
                  :sup="items.length"
                )
              .row
                .col-xs-12
                  .ui-table
                    tr(v-for="item in items" :key="item.id")
                      | {{ item.details }}
                      | {{ item.createdAt }}
</template>


<script>
import contentService from "@/services/ContentService";


export default {
  metaInfo: {
    title: "Checkouts"
  },
  name: "Checkouts",
  data() {
    return {
      title: "Checkouts",
      icon: "nc-send",
      show: false,
      items: [],
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appEditor: () => import("@/components/Translations/JsonForm"),
    appListHeader: () => import("@/components/List/Header")
  },
  methods: {
    async get() {
      this.items = (await contentService.checkouts.get({})).data;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
