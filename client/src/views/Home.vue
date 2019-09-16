<template lang="pug">
  .home
    .content-container.content
      app-hero(
        :titleTag="heroTitleTag"
      )
      app-announce
      app-products(:heading="productsHeading" :caption="productsCaption" :products="products")
      .spacer
      app-recent-posts(:heading="postsHeading")
    .spacer
    app-subscribe
</template>

<script>
import appHero from "@/components/Hero";
import appAnnounce from "@/components/events/Announce";
import appProducts from "@/components/products/ListPreview";
import appRecentPosts from "@/components/posts/ListPreview";
import appSubscribe from "@/components/Subscribe";
import contentService from "@/services/ContentService";
import LocaleService from "@/services/LocaleService";

export default {
  metaInfo: {
    title: "Home"
  },
  name: "home",
  components: {
    appAnnounce,
    appProducts,
    appRecentPosts,
    appSubscribe,
    appHero
  },
  computed: {
    productsHeading() {
      return (
        this.$t("events.bestsellers.title") + " " + this.productsHeadingCategory
      );
    },
    productsCaption() {
      return this.$t("events.bestsellers.caption");
    },
    postsHeading() {
      return this.$t("articles.recent");
    }
  },
  data() {
    return {
      heroTitleTag: "h1",
      productsHeadingCategory: "",
      products: []
    };
  },
  methods: {
    async get() {
      const priority = (await contentService.priority.get()).data;
      const response = (await contentService.products.getByPriority({
        category: priority[0].priorityOnMain
      })).data;

      this.products.splice(0, this.products.length);

      if (response.length) {
        this.productsHeadingCategory += `<b>${LocaleService.toLocale(
          response[0],
          "ProductSubcategory.ProductCategory.name",
          this.$i18n.locale
        )}</b>`;
      }
      response.forEach(element => {
        this.products.push(element);
      });
    }
  },
  mounted() {
    this.get();
  }
};
</script>
