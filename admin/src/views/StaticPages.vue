<template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar

      .card-container
        .row
          .col-xs-12
            app-list(
              :title="'Static pages'"
              :icon="'nc-html5'"
              :addTitle="'Static add'"
              :caption="'Click to edit or create new'"
              :addCaption="'Fill all rows and press save'"
              :editTitle="'Static edit'"
              :formKey="'static'"
              :items="items"
            ) 
              template(v-slot:item="slotProps")
                app-item(:item="slotProps.item")
              template(v-slot:form="slotProps")
                app-form(:isEdit="slotProps.isEdit")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  metaInfo: {
    title: "Static pages"
  },
  name: "static-pages",
  data() {
    return {
      show: false,
      items: []
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appList: () => import("@/components/List/Index"),
    appItem: () => import("@/components/StaticPages/Item"),
    appForm: () => import("@/components/StaticPages/Add")
  },
  methods: {
    async get() {
      const response = (await contentService.static.get({})).data;

      this.items = response;
    }
  },
  mounted() {
    this.get();
    EventBus.$on("update-list", this.get);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
