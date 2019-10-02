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
import EventBus from "@/event-bus";
import { loadLanguageAsync } from "./i18n";
import moment from "moment";

export default {
  metaInfo: {
    title: "Inbalans",
    titleTemplate: "%s | Inbalans"
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
      await loadLanguageAsync();
      const menu = (await contentService.static.getMenu()).data;
      this.$store.commit("setupMenu", menu);

      const categories = (await contentService.categories.get()).data;
      this.$store.commit("setupCategories", categories);

      const response = (await contentService.settings.get()).data;
      this.$store.commit("setupSettings", response);

      let that = this;
      setTimeout(function() {
        that.loaded = true;
      }, 700)
    },
    async changeLanguage(locale) {
      this.loaded = false;
      await loadLanguageAsync(locale);
      this.$i18n.locale = locale;
      moment.locale(locale);
      this.$cookie.set("lang", locale, 1);
      document.documentElement.setAttribute("lang", locale);
      this.loaded = true;
    },
    getLocale() {
      let selectetLang = "en";

      try {
        const userBrowserLang = navigator.language || navigator.userLanguage;
        const userLang = userBrowserLang.substr(0, 2); // en-GB to en
        selectetLang = userLang;
      } catch (err) {}

      return selectetLang;
    },
    firstVisitLocale() {
      const availableLocales = ["en", "lv", "ru"];
      const userLang = this.getLocale();
      moment.locale(userLang);

      if (!this.$cookie.get("lang") && availableLocales.includes(userLang)) {
        this.changeLanguage(userLang);
      }
    }
  },
  mounted() {
    this.firstVisitLocale();
    this.getSettings();

    EventBus.$on("lang-request", this.changeLanguage);
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
