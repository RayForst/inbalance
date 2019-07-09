<template lang="pug">
  #app.sticky-footer-container
    template(
      v-if="loaded"
    )
      app-header
      app-burger
      transition(name="fade" mode="out-in")
        router-view(:key="$route.fullPath")
      app-footer
    template(
      v-else
    )
      app-loader
</template>

<script>
import appHeader from "@/components/Header";
import contentService from "@/services/ContentService";

export default {
  metaInfo: {
    title: "Default Title",
    titleTemplate: "%s | Inbalanse"
  },
  data() {
    return {
      loaded: false
    };
  },
  components: {
    appHeader,
    appFooter: () => import("@/components/Footer"),
    appBurger: () => import("@/components/Burger/Index"),
    appLoader: () => import("@/components/Loader")
  },
  methods: {
    async getSettings() {
      const menu = (await contentService.static.getMenu()).data;
      this.$store.commit("setupMenu", menu);

      const categories = (await contentService.categories.get()).data;
      this.$store.commit("setupCategories", categories);

      const response = (await contentService.settings.get()).data;
      this.$store.commit("setupSettings", response);

      this.loaded = true;
    }
  },
  mounted() {
    this.getSettings();
  }
};
</script>

<style lang="stylus">
@import './assets/css/main';

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.2s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}
</style>
