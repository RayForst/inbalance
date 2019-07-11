<template lang="pug">
  nav.burger.wrapper
    app-icon
    app-menu
</template>

<script>
export default {
  components: {
    appIcon: () => import("./mobile/Trigger/Index.vue"),
    appMenu: () => import("./Menu.vue")
  }
};
</script>

<style lang="stylus">
@import '~@/assets/css/_variables';

body.open {
  overflow: hidden;

  &.open:before {
    visibility: visible;
    opacity: 1;
    z-index: 6000;
  }

  &:before {
    content: '';
    position: absolute;
    background-color: #fff;
    width: 100%;
    overflow: hidden;
    top: 77px;
    left: 0;
    bottom: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s ease;

    @media $media_lg {
      content: none;
    }
  }

  .burger {
    width: 100%;
  }

  .burger__menu {
    position: initial;
  }
}

.burger {
  position: absolute;
  top: 77px;
  left: 0;
  z-index: 9999;

  @media $media_lg {
    position: initial;
    width: 100%;
    padding: 20px;
    z-index: 8000;
    box-sizing: border-box;
  }
}
</style>
