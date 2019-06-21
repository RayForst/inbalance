<template lang="pug">
  section.hero(
    v-if="loaded"
  )
    carousel(
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
            router-link(:to="{ name: 'event', params: { slug: item.slug } }")
              h2 {{ item.name }}
              h1 {{ item.caption }}
              span.date {{ date(item.dateStart, item.dateEnd) }}
</template>

<script>
import carousel from "vue-owl-carousel";
import contentService from "@/services/ContentService";
import moment from "moment";

export default {
  props: ["titleTag"],
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
    },
    dateFormat(date) {
      return `${date.date()} ${date.format("MMMM")}`;
    },
    date(start, end) {
      const now = moment(new Date());
      const dateStart = moment(start);
      const yearStart =
        now.year() === dateStart.year() ? false : dateStart.year();

      if (end && start != end) {
        const dateEnd = moment(end);
        const yearEnd = now.year() === dateEnd.year() ? false : dateEnd.year();

        if (yearEnd) {
          if (
            dateStart.format("M") === dateEnd.format("M") &&
            dateStart.year() !== dateEnd.year()
          ) {
            // day - day month
            return `${this.dateFormat(
              dateStart
            )} ${dateStart.year()} - ${this.dateFormat(dateEnd)} ${yearEnd}`;
          }

          if (dateStart.format("M") === dateEnd.format("M")) {
            // day - day month
            return `${dateStart.date()} - ${this.dateFormat(
              dateEnd
            )} ${yearEnd}`;
          } else {
            // day month - day month
            return `${this.dateFormat(dateStart)} - ${this.dateFormat(
              dateEnd
            )} ${yearEnd}`;
          }
        } else {
          if (dateStart.format("M") === dateEnd.format("M")) {
            // day - day month
            return `${dateStart.date()} - ${this.dateFormat(dateEnd)}`;
          } else {
            // day month - day month
            return `${this.dateFormat(dateStart)} - ${this.dateFormat(
              dateEnd
            )}`;
          }
        }
      }

      // day month year
      if (yearStart) {
        return `${this.dateFormat(dateStart)} ${yearStart}`;
      }

      // day month
      return this.dateFormat(dateStart);
    }
  },
  mounted() {
    this.get();
  }
};
</script>


<style lang="stylus" scoped>
@import './../assets/css/_variables';

.hero {
  margin-top: 40px;
}

h1 {
  font-size: 32px;
  line-height: 1.5em;

  @media $media_lg {
    font-size: 36px;
  }
}

.text-container {
  z-index: 200;
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