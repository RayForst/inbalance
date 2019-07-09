<template lang="pug">
  li.menu-item(
    v-if="$store.state.settings.phone"
    @click="hover = !hover" 
  )
    span.main-link.text-upper(
      :to="{ name: menuItem.link }"
      :class="{ active: hover }"
    ) 
      | {{ categoryText(menuItem) }}
      span.arrow
        i.angle-down
    slide-up-down(:active="hover" :duration="400")
      span.popup(
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
  name: "menu-item-mobile",
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
    categoryText(menuItem) {
      return menuItem.hasOwnProperty("i18n")
        ? this.$t(menuItem.category)
        : menuItem.category;
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

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

li {
  position: relative;
}

.menu-item {
  border-bottom: 1px solid rgba(#9c9d9d, 0.2);
  cursor: pointer;

  @media $media_lg {
    border-bottom: none;
  }

  .active {
    .angle-down {
      transform: rotate(-180deg);
    }
  }

  .angle-down {
    arrow(5px);
    margin-left: auto;
    transition: all 0.2s ease;
    display: inherit;
  }

  .arrow {
    padding: 10px;
    position: absolute;
    right: 0;
    top: 3px;
  }

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
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.active {
    color: $c_secondary;
  }
}

.angle-down {
  arrow(5px);
}

.popup {
  font-size: 12px;
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
  padding: 20px 0 0 0;
  position: relative;
  z-index: 2;
  background: #fff;

  li {
    padding: 0;
    cursor: pointer;
  }

  a {
    font-size: 16px;
    line-height: 3.11em;
  }
}

.burger__menu .submenu-link {
  color: #9b9b9b;
  font-family: 'Montserrat', sans-serif;
}
</style>
