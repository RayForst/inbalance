<template lang="pug">
  div.static(
    v-if="item"
  )
    section.hero
      div.bg-image.hero-main.bg-hero(
        :style="{ backgroundImage: `url(${image})` }"
      )
        .content-container.content
          .row.center-xs.start-lg
            .col-xs-11.col-lg-10.text-start
              h1 {{ toLocale(item, "name") }}
    .content-container.content
      div
        .container
          p(
            v-html="toLocale(item, 'text')"
          )
          .spacer
          template(v-if='showPartnerForm')
            app-partnership-form
      app-products(:heading="$t('reccomendProducts')" :products="products")
      .spacer
      .spacer
    app-subscribe
</template>

<script>
import appPartnershipForm from "@/components/Partnership";
import contentService from "@/services/ContentService";
import appProducts from "@/components/products/ListPreview";
import appSubscribe from "@/components/Subscribe";
import LocaleService from "@/services/LocaleService";

export default {
  metaInfo: {
    title: "Static page"
  },
  props: ["slug"],
  name: "static",
  data() {
    return {
      showPartnerForm: false,
      products: [],
      item: null
    };
  },
  methods: {
    async get() {
      const response = (await contentService.static.getOne({
        slug: this.slug
      })).data;

      if (Object.keys(response).length < 1) {
        return this.$router.push({ name: "error" });
      }

      response.text = this.replaceAll(response.text, "&lt;", "<");
      response.text = this.replaceAll(response.text, "&gt;", ">");

      this.item = response;
    },
    toLocale(item, field) {
      return LocaleService.toLocale(item, field, this.$i18n.locale);
    },
    replaceAll(target, search, replacement) {
      return target.split(search).join(replacement);
    },
    async getProducts() {
      const priority = (await contentService.priority.get()).data;
      const response = (await contentService.products.getByPriority({
        category: priority[0].priorityOnMain
      })).data;
      this.products.splice(0, this.products.length);

      if (response.length) {
        this.productsHeading += `<b>${
          response[0]["ProductSubcategory.ProductCategory.name"]
        }</b>`;
      }
      response.forEach(element => {
        this.products.push(element);
      });
    }
  },
  computed: {
    image() {
      return `/uploads/${this.item.image}`;
    }
  },
  components: {
    appProducts,
    appPartnershipForm,
    appSubscribe
  },
  mounted() {
    this.get();
    this.getProducts();

    if (
      this.slug === "become-a-partner" ||
      this.slug === "become-a-partner-skin-regimen"
    ) {
      this.showPartnerForm = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

h1 {
  font-size: 32px;
  line-height: 1.29em;
  font-weight: normal;
  color: #ffffff;
  margin-bottom: 40px;

  @media $media_lg {
    font-size: 36px;
  }
}

.bg-hero {
  background-image: url('./../assets/img/banner2.jpg');
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url('https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg');
  display: flex;
  background-color: $c_primary;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

p {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.43em;
  color: #000000;

  &.padding-right {
    padding-right: 30px;
  }

  &.padding-left {
    padding-left: 30px;
  }

  &.gray {
    color: #7e8f97;
  }
}
</style>

