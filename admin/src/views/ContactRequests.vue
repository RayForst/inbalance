<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Contacts Requests'" :icon="'nc-chat-round'")
      .card-container
        .row
          .col-xs-7
            app-event-subscribe
          .col-xs-5
            app-newsletter
          .col-xs-12
            app-contacts
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
    appContacts: () => import("@/components/ContactRequests/Contact/List"),
    appNewsletter: () => import("@/components/ContactRequests/Newsletter/List"),
    appEventSubscribe: () =>
      import("@/components/ContactRequests/EventSubscribe/List"),
    appSidebar: () => import("@/components/Sidebar/Index"),
    appHeader: () => import("@/components/Header/Index")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
