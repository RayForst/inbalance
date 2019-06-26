<template lang="pug">
  aside.admin-sidebar
    .sidebar-wrapper
      .logo
        img(:src="require('@/assets/img/logo-tablet.svg')" alt="")
      nav.flex_col
        app-link(
          v-for="item, index in sidebar"
          :key="index"
          :item="item"
        )
</template>

<script>
import appLink from "./Link.vue";

export default {
  name: "sidebar",
  data() {
    return {
      sidebar: [
        {
          name: "Products",
          icon: "nc-app",
          route: "products"
        },
        {
          name: "Events",
          icon: "nc-atom",
          route: "events"
        },
        {
          name: "Events subscribes",
          icon: "nc-notification-70",
          route: "event-subscribes"
        },
        {
          name: "Articles",
          icon: "nc-single-copy-04",
          route: "articles"
        },
        {
          name: "Static pages",
          icon: "nc-html5",
          route: "static-pages"
        },
        {
          name: "Contacts Requests",
          icon: "nc-chat-round",
          route: "contact-requests"
        },
        {
          name: "Translations",
          icon: "nc-caps-small",
          route: "translations"
        },
        {
          name: "Settings",
          icon: "nc-settings-90",
          route: "settings"
        }
      ]
    };
  },
  components: {
    appLink
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.logo {
  padding-bottom: 2px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);

  img {
    width: 140px;
    margin-left: 27px;
    margin-bottom: 16px;
  }
}

.admin-sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 280px;
  display: block;
  z-index: 1;
  color: #fff;
  font-weight: 200;
  background-size: cover;
  background-position: 50%;

  &:before {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    background: #292929;
    background: linear-gradient(180deg, #292929, #0e0e0e);
    background-size: 150% 150%;
    opacity: 0.9;
  }

  .sidebar-wrapper {
    position: relative;
    max-height: calc(100vh - 75px);
    min-height: 100%;
    overflow: auto;
    width: 100%;
    z-index: 4;
    padding: 14px 20px 100px 20px;
    text-align: left;
    box-sizing: border-box;

    nav {
      padding: 25px 0;
    }
  }
}
</style>
