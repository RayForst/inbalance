<template lang="pug">
  div.menu
    .menu-xs
      slide-up-down(
        :active="active"
        :duration="400"
      )
        ul(
          @click="toggle"
        )
          li(
            v-for="link, index in links"
          )
            template(
              v-if="index === 0"
            )
              a(href="#") 
                b {{ toLocale(link, 'name') }}     
            template(
              v-else
            )
              a(href="#") 
                | {{ toLocale(link, 'name') }} 
      .trigger(
        @click="toggle"
      )
        .text
          template(v-if="!active") {{ $t('products.menu') }}
          template(v-else) {{ $t('products.closemenu') }}
    .menu-lg
      ul(@click="toggle")
        li
          router-link(
            :to="{ name: 'products', params: { category: slug} }"
            exact
          )  {{ $t('products.all') }}
        li(v-for="link, index in links")
          router-link(
            :class="{ active: index === 0 }"
            :to="{ name: 'products-subcategory', params: { category: slug, subcategory: link.slug } }"
          )  {{ toLocale(link, 'name') }} 
</template>

<script>
import contentService from "@/services/ContentService";
import LocaleService from "@/services/LocaleService";

export default {
  props: ["slug"],
  data() {
    return {
      active: false,
      links: []
    };
  },
  methods: {
    async get() {
      this.links = (await contentService.subcategories.get({
        category: this.slug
      })).data;

      console.log(this.links, "links");
    },
    toLocale(item, field) {
      console.log("to loc", item);
      return LocaleService.toLocale(item, field, this.$i18n.locale);
    },
    toggle: function() {
      this.active = !this.active;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

li {
  letter-spacing: 0.1em;
  margin-bottom: 20px;
}

a {
  line-height: 20px;
  font-weight: 300;
  text-decoration: none;
  color: #000;
  width: 100%;
  display: flex;
  transition: opacity 0.3s ease;
  text-transform: uppercase;

  &:hover {
    opacity: 0.6;
  }

  &.router-link-active {
    font-weight: bold;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 3px;
      right: -6px;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 4.5px 0 4.5px 5px;
      border-color: transparent transparent transparent #010332;
    }
  }
}

ul {
  margin: 0;
  padding: 30px 40px;
  list-style-type: none;
  width: 100%;

  @media $media_lg {
    padding: 0;
  }
}

.trigger {
  height: 40px;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;

  .text {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: 1px;
    color: #000000;
  }
}

.menu-xs {
  @media $media_lg {
    display: none;
  }
}

.menu-lg {
  display: none;
  height: 100%;
  border-right: 1px solid rgba(50, 65, 72, 0.2);

  @media $media_lg {
    display: flex;
  }
}

.menu {
  @media $media_lg {
    height: 100%;
    padding-right: 40px;
  }
}
</style>
