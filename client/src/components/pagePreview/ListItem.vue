<template lang="pug">
  .page-list-item(@click="goEvent")
    .image-wrap.bg-image(
      :style="image ? { backgroundImage: 'url(/uploads/' + image + ')'} : { backgroundColor: '#103324'}"
    )
    .container
      .slide-container
        .name {{ toLocale(content, 'name') }}
        router-link(:to="{name: 'static', params: { slug: content.slug } }").ui-button.ui-button--full-green {{ $t('links.discover') }}
</template>

<script>
import LocaleService from "@/services/LocaleService";

export default {
  props: ["content"],
  name: "event-list-item",
  data() {
    return {};
  },
  computed: {
    image() {
      return this.content.hasOwnProperty("image")
        ? this.content.image
        : "default.png";
    }
  },
  methods: {
    toLocale(item, field) {
      return LocaleService.toLocale(item, field, this.$i18n.locale);
    },
    goEvent(result) {
      this.$router.push({
        name: "static",
        params: {
          slug: this.content.slug
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.page-list-item {
  cursor: pointer;
  margin: auto;
  text-align: left;
  position: relative;
  margin-bottom: 40px;

  &:hover {
    .slide-container {
      transform: translateY(-80px);
    }
  }

  .container {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    color: #fff;
    left: 0;
    padding: 30px;
    overflow: hidden;
  }

  .slide-container {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: all 0.4s ease;
  }

  .ui-button {
    margin-top: auto;
  }
}

.image-wrap.bg-image {
  &:before {
    padding-top: 54%;
  }
}

.container {
  background-image: linear-gradient(to bottom, rgba(97, 118, 127, 0), rgba(0, 0, 0, 0.61));
}

.name {
  font-family: 'Lora';
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.42;
  letter-spacing: normal;
  color: #ffffff;
  padding-top: 20px;
  margin-top: 50px;
  position: relative;

  &:before {
    content: '';
    width: 90px;
    height: 1px;
    position: absolute;
    top: 0;
    left: 0;
    background: #103324;
  }
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  display: flex;

  &:before {
    content: '';
    display: block;
    padding-top: 60%;
    background: #fff;
  }
}
</style>
