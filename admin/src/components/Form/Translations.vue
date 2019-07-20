<template lang="pug">
  span.translate
    span Translate: 
    a(href="#" v-for="locale in locales" :class="{ active: active === locale }") {{ locale.toUpperCase() }} 
</template>



<script>
import Api from "@/services/Api";
import EventBus from "@/event-bus";

export default {
  data() {
    return {
      locales: ["en", "lv", "ru"],
    };
  },
  computed: {
    active() {
      return this.$store.state.forms['product'].formLang
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.translate {
  padding: 10px 0;
  margin-right: 10px;

  a {
    color: black;
    &:hover {
      text-decoration: underline;
    }
  }

  .active {
    color: $c_accent;
  }
}
</style>
