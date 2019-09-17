<template lang="pug">
.article
  router-link.article-wrap(
    :to="{ name: 'article', params: { slug: item.slug }}"
  )
    .image-wrap.article-small.bg-image(
      :style="{ backgroundImage: 'url(/uploads/' + item.image + ')' }"
    ) 
    .name(
      v-text="toLocale(item, 'name')"
    )
</template>


<script>
import LocaleService from "@/services/LocaleService";

export default {
  name: "recent-post",
  props: ["item"],
  data() {
    return {};
  },
  computed: {
    image: function() {
      return require("../../assets/img/" + this.item.image);
    }
  },
  methods: {
    toLocale(item, field) {
      return LocaleService.toLocale(item, field, this.$i18n.locale);
    },
  }
};
</script>

<style lang="stylus" scoped>
.image-wrap.article-small {
  min-width: 110px;
  width: 110px;
  height: 60px;
  margin-right: 20px;

  &:before {
    padding-top: 54%;
  }
}

.article-wrap {
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  text-decoration: none;

  &:hover {
    .name {
      color: #000;
    }
  }
}

.name {
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #18375c;
  font-family: 'Lora';
}
</style>
