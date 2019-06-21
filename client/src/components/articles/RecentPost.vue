<template lang="pug">
.article
  a.article-wrap(href="#")
    .image-wrap.article-small.bg-image(
      :style="{ backgroundImage: `url(${image})` }"
    ) 
    .name {{ item.name }}
</template>


<script>
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
