<template lang="pug">
  .card
    h4.card-title Main Settings
    p.caption Be aware off change
    app-form
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "settings-form",
  data() {
    return {};
  },
  components: {
    appForm: () => import("./Form.vue")
  },
  methods: {
    async get() {
      const response = (await contentService.settings.get({})).data;

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
