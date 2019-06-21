<template lang="pug">
  nav.burger.wrapper
    app-icon
    app-menu
</template>

<script>
import appIcon from "./BurgerIcon";
import appMenu from "./BurgerMenu";

export default {
  components: {
    appIcon,
    appMenu
  }
};
</script>

<style lang="stylus">
@import './../../assets/css/_variables';

body.open {
  overflow: hidden;

  &.open:before {
    visibility: visible;
    opacity: 1;
  }

  &:before {
    content: '';
    position: absolute;
    background-color: #fff;
    width: 100%;
    overflow: hidden;
    top: 0;
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

.burger {
  position: absolute;
  top: 17px;
  left: 10px;

  @media $media_lg {
    position: initial;
    width: 100%;
    padding: 20px 0;
  }
}
</style>
