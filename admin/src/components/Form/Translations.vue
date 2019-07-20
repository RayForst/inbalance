<template lang="pug">
.row
  .col-xs-12
    .translate
      span Translate: 
      a(href="#" v-for="locale in locales") {{ locale.toUpperCase() }} 
</template>



<script>
import Api from "@/services/Api";
import EventBus from "@/event-bus";

export default {
  data() {
    return {
      locales: ["en", "lv", "ru"]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.translate {
  padding: 10px 0;
}
</style>
