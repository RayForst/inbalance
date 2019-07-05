<template lang="pug">
  section.ca
    .carousel-wrap
      carousel(
        v-if="loaded"
        loop=true 
        :items=1
        :dots="false" 
        :nav="false"
        :autoplay="true"
        :autoplayTimeout="3000"
        :autoplaySpeed="700"
      )
        .container.bg-image.ca-main(
          v-for="item in items"
          :style="{ backgroundImage: 'url(' + image(item) + ')' }"
        )
          .row.start-xs.center-sm.middle-xs.relative.z-index-wrap.announce-item
            .col-xs-12.col-lg-2 
              .date {{ date(item.dateStart, item.dateEnd) }}
            .col-xs-12.col-lg-8
              .text-container
                h2 {{ item.name }}
            .col-xs-12.col-lg-2
              router-link.ui-button.ui-button--white(:to="{ name: 'event', params: { slug: item.slug } }") {{ $t('links.discover') }}
</template>

<script>
import carousel from "vue-owl-carousel";
import contentService from "@/services/ContentService";
import moment from "moment";
import DateService from "@/services/DateService";

export default {
  name: "event-calendar",
  data() {
    return {
      loaded: false,
      items: []
    };
  },
  components: {
    carousel
  },
  methods: {
    date(dateStart, dateEnd) {
      return DateService.eventDate(dateStart, dateEnd);
    },
    image(item) {
      const img = item.image != "" ? item.image : "default.png";

      return "/uploads/" + img;
    },
    async get() {
      const response = (await contentService.events.getAnnounce({})).data;
      this.items.splice(0, this.items.length);

      response.forEach(element => {
        this.items.push(element);
      });

      this.loaded = true;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/css/_variables';

h2, .date {
  font-size: 24px;
  line-height: 1.42;
}

.announce-item {
  padding: 10px 0;

  @media $media_md {
    padding: 5px 0;
  }

  @media $media_lg {
    padding: 0;
  }
}

.text-container {
  border: 1px solid rgba(#fff, 0.3);
  border-left: none;
  border-right: none;
  margin: 20px 0 30px;
  min-height: 165px;

  @media $media_sm {
    min-height: 110px;
  }

  @media $media_md {
    min-height: auto;
    margin: 15px 0 20px 0;
  }

  @media $media_lg {
    border: none;
  }
}

h2 {
  margin: 15px 0;
  position: relative;

  @media $media_md {
    margin: 20px 0;
  }

  @media $media_lg {
    &:before, &:after {
      content: '';
      display: inline-flex;
      width: 1px;
      height: 30px;
      opacity: 0.3;
      background: #fff;
      position: absolute;
      top: 2px;
    }

    &:before {
      left: 3%;
    }

    &:after {
      right: 3%;
    }
  }
}

.date {
  font-family: 'Lora', sans-serif;
  font-weight: bold;
}

.container {
  padding-left: 30px;
  padding-right: 30px;
}

.bg-image {
  background-image: url('~@/assets/img/banner.png');
}

.z-index-wrap {
  z-index: 2;
  position: relative;
}

.ca-main {
  position: relative;
  min-height: 120px;

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
