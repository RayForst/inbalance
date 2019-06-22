<template lang="pug">
  li.menu-item(@mouseover="open" @mouseleave="close")
    span.main-link.text-upper(
      @click.native="close" 
      :to="{ name: menuItem.link }"
      :class="{ active: hover }"
    ) {{ menuItem.category }}
    transition(name="fade" mode="out-in")
      span.popup(
        v-show="hover"
        @mouseleave="close"
        :class="{ last: this.isLast }"
      )
        ul.popup-links
          li(v-for="link in menuItem.links")
            router-link.submenu-link.text-upper(
              :to="url(link)"
              v-text="text(link)"
            )
</template>

<script>
export default {
  name: "menu-item",
  props: ["menuItem", "isLast"],
  data() {
    return {
      hover: false
    };
  },
  methods: {
    url(link) {
      let route = { name: link.route.name };

      if (link.route.hasOwnProperty("slug"))
        route.params = { slug: link.route.slug };

      return route;
    },
    text(link) {
      return link.hasOwnProperty("i18n") ? this.$t(link.title) : link.title;
    },
    open() {
      this.hover = true;
    },
    close($event) {
      this.hover = false;
    }
  }
};
</script>

<style lang="stylus">
@import './../../assets/css/_variables';

li {
  position: relative;
}

.menu-item {
  &:hover {
    .main-link {
      opacity: 0.6;
    }
  }
}

.main-link {
  position: relative;
  z-index: 0;
  transition: opacity 0.3s ease;
  letter-spacing: 0.05em;

  &.active {
    color: $c_secondary;
  }
}

.popup {
  font-size: 12px;
  position: absolute;
  top: -10px;
  left: 0;
  width: 260px;
  padding: 10px;
  box-sizing: border-box;
  padding-top: 35px;
  z-index: 1000;
  padding-left: 0;
  padding-right: 0;

  &.last {
    right: 0;
    left: auto;
  }
}

ul.popup-links {
  margin: 0;
  padding: 10px 0;
  position: relative;
  z-index: 2;
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background: #fff;

  li {
    padding: 0;
    cursor: pointer;
  }

  a {
    padding: 10px 20px;

    &:hover {
      background: #e9ebec;
      color: #324148;
    }
  }
}

.burger__menu .submenu-link {
  font-size: 12px;
  color: #9b9b9b;
  font-family: 'Montserrat', sans-serif;
  line-height: 18px;
}
</style>
