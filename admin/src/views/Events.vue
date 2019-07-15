<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Events'" :icon="'nc-atom'")
      .card-container
        .row
          .col-xs-12
            app-list-test(
              :title="'Event list'"
              :items="items"
            )
            app-list
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  metaInfo: {
    title: 'Events',
  },
  name: 'Events',
  data() {
    return {
      show: false,
      items: []
    };
  },
  components: {
    appSidebar: () => import('@/components/Sidebar/Index'),
    appHeader: () => import('@/components/Header/Index'),
    appList: () => import('@/components/Events/List'),
    appListTest: () => import("@/components/List/Index"),
  },
  methods: {
    async get() {
      const response = (await contentService.events.get({})).data;

      this.items = response;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables'
</style>
