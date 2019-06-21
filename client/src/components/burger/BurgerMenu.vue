<template lang="pug">
  ul.container.burger__menu
    template(v-if="mount" v-for="column, index in this.$store.state.menu")
      app-menu-item(:menuItem="column" :isLast="isLast(index)")
      li.menu-line(v-if="index !== menuLength") |
</template>

<script>
import appIcon from "./BurgerIcon";
import appMenuItem from "./BurgerMenuItem";

export default {
  data() {
    return {
      mount: false
    };
  },
  components: {
    appIcon,
    appMenuItem
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

.burger__menu {
  list-style-type: none;
  padding: 0 0 0 20px;
  font-family: 'Lora', sans-serif;
  align-items: center;

  @media $media_lg {
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0;
    justify-content: space-between;
  }

  li {
    display: block;
    position: relative;
    margin: 15px 0;
    visibility: hidden;
    transform: translateX(-400px);
    padding: 5px 20px;

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
</style>
