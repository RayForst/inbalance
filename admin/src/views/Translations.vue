  <template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Translations'" :icon="'nc-caps-small'")
      .card-container
        .row
          .col-xs-7
            .card
              h4.card-title List
              p.caption Click to edit or create new
              .row.list
                .col-xs-12
                  v-jsoneditor(
                    v-model="json" 
                    :options="options" 
                    :plus="false" 
                    :height="'400px'" 
                    @error="onError"
                  )
          .col-xs-5
            .card
              h4.card-title Edit
              p.caption Search edit and add new

</template>

<script>
import VJsoneditor from "v-jsoneditor/src/index";

export default {
  metaInfo: {
    title: "Translations"
  },
  name: "Translations",
  data() {
    return {
      show: false,
      json: {
        hello: "vue"
      }
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appHeader: () => import("@/components/Header/Index"),
    VJsoneditor
  },
  methods: {
    onError() {
      console.log("error");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
