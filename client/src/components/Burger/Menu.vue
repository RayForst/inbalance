<template lang="pug">
  ul.container.burger__menu
    template(v-if="mount" v-for="column, index in this.$store.state.menu")
      app-menu-item-mobile(class="mobile-menu" :menuItem="column" :isLast="isLast(index)")
      app-menu-item(class="desktop-menu" :menuItem="column" :isLast="isLast(index)")
      li.menu-line(v-if="index !== menuLength") |
</template>

<script>
export default {
  data() {
    return {
      mount: false
    };
  },
  components: {
    appMenuItem: () => import("./MenuItem.vue"),
    appMenuItemMobile: () => import("./MenuItemMobile.vue")
  },
  computed: {
    menuLength() {
      return this.$store.state.menu.length - 1;
    }
  },
  methods: {
    close() {
      document.body.classList.remove("open");
      this.visible = false;
    },
    isLast(index) {
      return index === this.menuLength;
    }
  },
  mounted() {
    this.mount = true;
  }
};
</script>

<style lang="stylus">
@import './../../assets/css/_variables';

.mobile-menu {
  @media $media_lg {
    display: none !important;
  }
}

.desktop-menu {
  display: none !important;

  @media $media_lg {
    display: block !important;
  }
}

.burger__menu {
  list-style-type: none;
  padding: 0 20px 0 20px;
  font-family: 'Lora', sans-serif;
  align-items: center;
  position: absolute;
  top: 0;
  left: -100vw;

  @media $media_lg {
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    justify-content: space-between;
    position: initial;
  }

  li {
    display: block;
    position: relative;
    visibility: hidden;
    transform: translateX(-400px);
    padding: 20px 0;

    @media $media_lg {
      transition: none;
      visibility: visible;
      transform: none;
      margin: 0;
    }
  }

  a {
    display: block;
    text-decoration: none;
    color: #000;
    font-size: 14px;
    font-weight: normal;
    transition: all 0.4s ease;
    padding-left: 0;
    letter-spacing: 0.1em;

    @media $media_lg {
      color: #000;
    }
  }

  li {
    position: relative;
  }

  .router-link-active {
    color: green;
  }
}

.burger__menu .menu-line {
  display: none;

  @media $media_lg {
    display: block;
  }
}
</style>
