<template lang="pug">
  .card
    app-list-header(
      :icon="icon"
      :title="title"
    )
    app-form
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "meta-form",
  data() {
    return {
      title: "Metadata Settings",
      icon: "nc-settings-90"
    };
  },
  components: {
    appForm: () => import("./Form.vue"),
    appListHeader: () => import("@/components/List/Header")
  },
  methods: {
    async get() {
      const response = (await contentService.settingsSeo.get({})).data;

      this.$store.commit("setSeoSettings", response[0]);
    }
  },
  mounted() {
   this.get();
   EventBus.$on("form-success-settings_seo", this.get);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
