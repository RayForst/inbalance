<template lang="pug">
  span.translate
    template(
      v-if="isEdit"
    )
      span Translate: 
      a(:href="`#${locale}`" v-for="locale in locales" :class="{ active: active === locale }" @click.prevent="change") {{ locale.toUpperCase() }} 
    template(
      v-else
    )
      span Translate will be available in edit

    slot(name="en" v-if="active === 'en'")
    template(
      v-if="isEdit"
    )
      slot(name="lv" v-if="active === 'lv'")
      slot(name="ru" v-if="active === 'ru'")
</template>



<script>
import Api from "@/services/Api";
import EventBus from "@/event-bus";

export default {
  props: ["storeKey", "isEdit"],
  data() {
    return {
      locales: ["en", "lv", "ru"]
    };
  },
  computed: {
    active() {
      return this.$store.state.forms[this.storeKey].formLang;
    }
  },
  methods: {
    change(event) {
      const newLocale = event.target.getAttribute("href").substr(1);

      this.$store.commit("setFormLang", {
        key: this.storeKey,
        locale: newLocale
      });
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
