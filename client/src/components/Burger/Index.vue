<template lang="pug">
  nav.burger.wrapper
    app-icon
    app-menu
</template>

<script>
import appMenu from "./Menu";

export default {
  components: {
    appIcon: () => import("./mobile/Trigger/Index.vue"),
    appMenu
  }
};
</script>

<style lang="stylus">
@import '~@/assets/css/_variables';

body {
  &:before {
    content: '';
    position: absolute;
    background-color: #fff;
    width: 100%;
    overflow: hidden;
    top: 67px;
    left: 0;
    bottom: 0;
    visibility: hidden;
    opacity: 0;
    transition: all 0.4s ease;

    @media $media_lg {
      content: none;
    }
  }
}
html.open {
  overflow: hidden;
  position: relative;
  height: 100%;

  body {
    overflow: hidden;
    position: relative;
    height: 100%;

    &:before {
      visibility: visible;
      opacity: 1;
      z-index: 6000;
    }

    .burger {
      width: 100%;
      height: 100%;
    }

    .burger__menu {
      position: initial;
      padding-bottom 40px;
      overflow: auto;
      height:100%;

      @media $media_lg {
        padding-bottom: 0;
        height: auto;
        overflow: initial;
      }
    }
  }
}

.burger {
  position: absolute;
  top: 77px;
  left: 0;
  z-index: 9999;
  max-width: 1240px;

  @media $media_lg {
    position: initial;
    width: 100%;
    padding: 20px;
    z-index: 8000;
    box-sizing: border-box;
  }
}
</style>
