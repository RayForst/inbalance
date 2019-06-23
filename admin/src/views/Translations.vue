  <template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Translations'" :icon="'nc-caps-small'")
      .card-container
        .row
          .col-xs-12
            .card
              .row
                .col-xs-12
                  h4.card-title Static strings Translations
                  p.caption Be aware for making mistakes, it can break site content
              .row.list
                .col-xs-4
                  h5 English
                  v-jsoneditor(
                    v-model="json" 
                    :options="options" 
                    :plus="false" 
                    :height="'400px'" 
                    @error="onError"
                  )
                  br
                  button.ui-button.ui-button--full-green Save
                .col-xs-4
                  h5 Russian
                  v-jsoneditor(
                    v-model="json" 
                    :options="options" 
                    :plus="false" 
                    :height="'400px'" 
                    @error="onError"
                  )
                  br
                  button.ui-button.ui-button--full-green Save
                .col-xs-4
                  h5 Latvian
                  v-jsoneditor(
                    v-model="json" 
                    :options="options" 
                    :plus="false" 
                    :height="'400px'" 
                    @error="onError"
                  )
                  br
                  button.ui-button.ui-button--full-green Save
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

h5 {
  font-size: 20px;
  margin: 10px 0;
}
</style>
