<template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            app-list(
              :icon="'nc-app'"
              :title="'Products'"
              :formKey="'product'"
              :items="items"
            ) 
              template(
                v-slot:item="slotProps"
              )
                app-item(
                  :item="slotProps.item"
                )
              template(
                v-slot:form="slotProps"
              )
                app-form(
                  :isEdit="slotProps.isEdit"
                )
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  metaInfo: {
    title: "Products"
  },
  name: "products",
  data() {
    return {
      show: false,
      items: []
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appList: () => import("@/components/List/Index"),
    appItem: () => import("@/components/Products/Item"),
    appForm: () => import("@/components/Products/Add")
  },
  methods: {
    async get() {
      const response = (await contentService.products.get({})).data;

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
