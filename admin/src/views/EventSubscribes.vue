<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            app-event-subscribe
</template>

<script>
export default {
  metaInfo: {
    title: "Contacts Requests"
  },
  name: "contacts-requests",
  data() {
    return {
      show: false
    };
  },
  components: {
    appEventSubscribe: () =>
      import("@/components/ContactRequests/EventSubscribe/List"),
    appSidebar: () => import("@/components/Sidebar/Index")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
