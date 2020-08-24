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
  name: "settings-form",
  data() {
    return {
      title: "Main Settings",
      icon: "nc-settings-90"
    };
  },
  components: {
    appForm: () => import("./Form.vue"),
    appListHeader: () => import("@/components/List/Header")
  },
  methods: {
    async get() {
      const response = (await contentService.settings.get({})).data;


      console.log('settings');
      console.log(response);

      this.$store.commit("setSettings", response[0]);
    }
  },
  mounted() {
    this.get();
    EventBus.$on("form-success-settings", this.get);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
