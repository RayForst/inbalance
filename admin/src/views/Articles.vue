<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            app-list(
              :title="'Articles'"
              :icon="'nc-single-copy-04'"
              :addTitle="'New article'"
              :caption="'Click to edit or create new'"
              :addCaption="'Fill all rows and press save'"
              :editTitle="'Article edit'"
              :formKey="'article'"
              :items="items"
              :wide="true"
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
    title: "Articles"
  },
  name: "Articles",
  data() {
    return {
      show: false,
      items: []
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appList: () => import("@/components/List/Index"),
    appItem: () => import("@/components/Articles/Item"),
    appForm: () => import("@/components/Articles/Add")
  },
  methods: {
    async get() {
      const response = (await contentService.articles.get({})).data;

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
