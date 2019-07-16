<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-7
            app-contacts
          .col-xs-5
            app-newsletter
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
    appSidebar: () => import("@/components/Sidebar/Index")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
