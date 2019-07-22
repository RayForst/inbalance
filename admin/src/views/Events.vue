<template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            app-list(
              :title="'Events'"
              :icon="'nc-atom'"
              :formKey="'event'"
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
    title: "Events"
  },
  name: "Events",
  data() {
    return {
      show: false,
      items: []
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appList: () => import("@/components/List/Index"),
    appItem: () => import("@/components/Events/Item"),
    appForm: () => import("@/components/Events/Add")
  },
  methods: {
    async get() {
      const response = (await contentService.events.get({})).data;

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
