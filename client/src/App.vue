<template lang="pug">
  #app.sticky-footer-container(
    v-if="loaded"
  )
      app-header
      app-burger
      transition(name="fade" mode="out-in")
        router-view(:key="$route.fullPath")
      app-footer
</template>

<script>
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
    appHeader: () => import("@/components/Header"),
    appFooter: () => import("@/components/Footer"),
    appBurger: () => import("@/components/burger/Burger")
  },
  methods: {
    async getCategories() {
      const response = (await contentService.categories.get()).data;
      this.$store.commit("setupCategories", response);
    },
    async getMenu() {
      const response = (await contentService.static.getMenu()).data;
      this.$store.commit("setupMenu", response);
    },
    async getSettings() {
      const response = (await contentService.settings.get()).data;
      this.$store.commit("setupSettings", response);
    }
  },
  mounted() {
    this.getCategories();
    this.getMenu();
    this.getSettings();
    this.loaded = true;
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
