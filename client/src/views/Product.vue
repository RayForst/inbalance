<template lang="pug">
  .product(
    v-if="product"
  )
    .content-container.content.border-bottom
      app-back
      app-product-preview(:product="product")
    .border-top(
      v-if="products.length" 
    )
      .content-container.content
        app-products(:heading="$t('reccomendProducts')" :products="products")
    app-callback
</template>

<script>
import contentService from "@/services/ContentService";
import appCallback from "@/components/CallMeBack";
import appProductPreview from "@/components/products/Preview.vue";

export default {
  metaInfo: {
    title: "Example product"
  },
  name: "product",
  props: ["slug"],
  data() {
    return {
      product: null,
      products: [
        {
          name: "Product 1"
        },
        {
          name: "Product 2"
        },
        {
          name: "Product 3"
        },
        {
          name: "Product 4"
        },
        {
          name: "Product 5"
        },
        {
          name: "Product 6"
        }
      ]
    };
  },
  components: {
    appBack: () => import("@/components/Back.vue"),
    appProducts: () => import("@/components/products/ListPreview.vue"),
    appProductPreview,
    appCallback
  },
  methods: {
    async getList(categoryId) {
      const response = (await contentService.products.getByPriority({
        category: categoryId
      })).data;

      this.products.splice(0, this.products.length);

      response.forEach(element => {
        this.products.push(element);
      });
    },
    async get() {
      const response = (await contentService.products.getOne({
        slug: this.slug
      })).data;

      if (Object.keys(response).length < 1) {
        return this.$router.push({ name: "error" });
      }
      this.product = response;
      this.getList(response.ProductSubcategory.ProductCategory.id);
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.product {
  text-align: left;
  margin-bottom: 50px;
  margin-top: 20px;

  @media $media_md {
    margin-top: 40px;  
  }

  @media $media_lg {
    margin-top: 0;  
  }
}

.border-bottom {
  border-bottom: 1px solid rgba(50, 65, 72, 0.2);
}
</style>

