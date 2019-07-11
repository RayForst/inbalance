<template lang="pug">
.event(
  v-if="item"
)
  vue-easy-lightbox(
    v-if="gallery && gallery.length > 1"
    :visible="galleryVisible"
    :imgs="gallery"
    :index="index"
    @hide="handleHide"
  )
  section.hero
    .bg-image.hero-main.bg-hero(
        v-if="item"
        :style="{ backgroundImage: `url(${image})` }"
      )
      .content-container.content
        .row
          .col-xs-12
            .ui-tag {{ date }}
            h1 {{ item.name }}
  .content-container.content(v-if="item")
    .row
      .col-xs-12
        p(v-html="item.description")
      .col-xs-12
        .carousel-wrap(v-if="item")
          carousel(
            loop=true 
            :items=3
            :dots="true" 
            :nav="false"
            :margin="10"
          )
            .square-block(
              v-for="(src, index) in gallery"
              :style="{ backgroundImage: 'url(' + src + ')' }"
              @click="() => showImg(index)"
            )
  .spacer
  .spacer
  input(id="hidden" type="hidden" :value="item.id")
  app-seminar-subscribe
</template>

<script>
import appSeminarSubscribe from "@/components/events/Subscribe";
import contentService from "@/services/ContentService";
import moment from "moment";
import DateService from "@/services/DateService";

export default {
  name: "event",
  metaInfo: {
    title: "Example Event"
  },
  props: ["slug"],
  components: {
    appSeminarSubscribe,
    appBack: () => import("@/components/Back"),
    carousel: () => import("vue-owl-carousel")
  },
  data() {
    return {
      item: null,
      galleryVisible: false,
      index: 0,
      loaded: false
    };
  },
  computed: {
    id() {
      return this.item.id;
    },
    image() {
      return `/uploads/${this.item.image}`;
    },
    date() {
      return DateService.eventDate(this.item.dateStart, this.item.dateEnd);
    },
    gallery() {
      return this.item.images.split(",").map(function(image) {
        return "/uploads/" + image;
      });
    }
  },
  methods: {
    dateFormat(date) {
      return `${date.date()} ${date.format("MMMM")}`;
    },
    showImg(index, key) {
      this.index = index;
      this.galleryVisible = true;

      document.body.classList.add("hidden-scroll");
    },
    handleHide() {
      this.galleryVisible = false;

      document.body.classList.remove("hidden-scroll");
    },
    randomList() {
      let images = Array.apply(null, Array(this.getRandomInt(1, 4)));

      images.forEach(function(element, index) {
        images[index] = "testik";
      });
      return images;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    async get() {
      const response = (await contentService.events.getOne({
        slug: this.slug
      })).data;

      if (Object.keys(response).length < 1) {
        return this.$router.push({ name: "error" });
      }

      this.item = response;
      this.loaded = true;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

h1 {
  font-size: 36px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.28em;
  letter-spacing: normal;
  color: #ffffff;
}

.bg-hero {
  background-image: url('./../assets/img/banner-events.jpg');
}

p {
  font-size: 24px;
  font-weight: 300;
  line-height: 1.83em;
  color: #000000;

  &.gray {
    color: #7e8f97;
  }
}

.event {
  margin-top: 18px;
}
</style>
