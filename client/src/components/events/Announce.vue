<template lang="pug">
  section.ca
    .carousel-wrap(
      v-if="loaded"
    )
      carousel(
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
          .row.text-center.middle-xs.relative.z-index-wrap
            .col-xs-12.col-lg-2 
              .date {{ date(item.dateStart, item.dateEnd) }}
            .col-xs-12.col-lg-8 
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
      const response = (await contentService.events.get({})).data;
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
.ca {
  margin: 20px 0;
}

h2, .date {
  font-size: 24px;
  line-height: 1.42;
}

h2 {
  position: relative;

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
