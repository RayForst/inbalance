<template lang="pug">
  .content.color-background.flex_col
    .content-container.admin-page
      app-sidebar
      .card-container
        .row
          .col-xs-12
            .card
              tabs(:options="{ useUrlFragment: false }")
                tab(name="Contact requests")
                  app-contacts
                tab(name="Call me back")
                  app-call-me-back
                tab(name="Become a partner")
                  app-partnership
                tab(name="EVENTS SUBSCRIBES")
                  app-event-subscribe
                tab(name="Newsletter subs")
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
    appCallMeBack: () => import("@/components/ContactRequests/CallMeBack/List"),
    appNewsletter: () => import("@/components/ContactRequests/Newsletter/List"),
    appPartnership: () => import("@/components/ContactRequests/Partnership/List"),
    appSidebar: () => import("@/components/Sidebar/Index"),
    appEventSubscribe: () => import("@/components/ContactRequests/EventSubscribe/List")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
