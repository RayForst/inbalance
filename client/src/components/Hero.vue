<template lang="pug">
  section.hero(
    v-if="show"
  )
    carousel(
      v-if="loaded"
      loop=true 
      :items=1
      :dots="false" 
      :nav="false"
      :autoplay="true"
      :autoplayTimeout="5300"
      :autoplaySpeed="700"
    )
      div.container.bg-image.hero-main(
        v-for="item in items"
        :style="{ backgroundImage: 'url(' + image(item) + ')' }"
      )
        .row.center-xs.height-100
          .col-xs-11.col-md-7.align-center.text-center.text-container
            template(v-if="item.preview")
              .preview
                h2 {{ toLocale(item, 'name') }}
                h1 {{ toLocale(item, 'caption') }}
            template(v-else)
              div
                h2 {{ toLocale(item, 'name') }}
                h1 {{ toLocale(item, 'caption') }}
                span.date {{ date(item.dateStart, item.dateEnd) }}
                div.button-wrap
                  router-link(:to="{ name: 'event', params: { slug: item.slug } }").ui-button.ui-button--full-green {{ $t('links.discover') }}
</template>

<script>
import carousel from "vue-owl-carousel";
import contentService from "@/services/ContentService";
import moment from "moment";
import DateService from "@/services/DateService";
import LocaleService from "@/services/LocaleService";

export default {
  props: ["titleTag"],
  data() {
    return {
      loaded: false,
      show: true,
      items: []
    };
  },
  components: {
    carousel
  },
  methods: {
    toLocale(item, field) {
      return LocaleService.toLocale(item, field, this.$i18n.locale);
    },
    image(item) {
      const img = item.image != "" ? item.image : "default.png";

      return "/uploads/" + img;
    },
    async get() {
      const response = (await contentService.events.getHero({})).data;
      this.items.splice(0, this.items.length);

      response.forEach(element => {
        this.items.push(element);
      });

      this.show = this.items.length > 0;
      this.loaded = true;
    },
    dateFormat(date) {
      return `${date.date()} ${date.format("MMMM")}`;
    },
    date(start, end) {
      return DateService.eventDate(start, end);
    }
  },
  mounted() {
    this.get();
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.hero {
  height: 520px;
  background: #f7f7f7;
  margin-bottom 20px;

  @media $media_sm {
    height: 442px;
  }

  @media $media_sm {
    height: 590px;
  }

  @media $media_lg {
    margin-top: 20px;
  }
}

.preview {
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: 26px;
  line-height: 1.5em;

  @media $media_lg {
    font-size: 36px;
  }
}

h2 {
  margin: 0;
  font-size: 18px;
  line-height: 1.5em;

  @media $media_md {
    font-size: 21px;
  }
}

.text-container {
  z-index: 200;
}
.button-wrap {
  margin-top: 35px;
}
.date {
  font-family: 'Lora', sans-serif;
  font-weight: bold;
  font-size: 24px;
  line-height: 1.42;
}

a {
  color: #fff;
  text-decoration: none;
}

.hero-main {
  height: 520px;
  background-image: url('~@/assets/img/big-banner-front.jpg');
  position: relative;

  @media $media_sm {
    height: 442px;
  }

  @media $media_sm {
    height: 590px;
  }

  &:before {
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    background-image: linear-gradient(to bottom, rgba(97, 118, 127, 0), rgba(0, 0, 0, 0.81));
  }
}
</style>