<template lang="pug">
    .row.center-xs
      vue-easy-lightbox(
        v-if="gallery && gallery.length > 1"
        :visible="galleryVisible"
        :imgs="gallery"
        :index="index"
        @hide="handleHide"
      )
      .col-xs-10.col-lg-6.col-padding.col-border
        .product
          .media_sm.row
              .col-xs-6
                .image-wrap.bg-image(
                  :style="{ backgroundImage: 'url(/uploads/' + image + ')' }"
                )
              .col-xs-6.sm-desc
                .name {{ toLocale(product, 'name') }}
                router-link.desc(
                  :to="{ name: 'products-subcategory', params: { slug: product.ProductSubcategory.ProductCategory.slug, subcategory: product.ProductSubcategory.slug} }"
                ) {{ toLocale(product.ProductSubcategory, 'name') }}
                .share
                  h5 {{ $t('share') }}
                  .share-list
                    a(href="#").item
                      img(
                        :src="require('@/assets/img/fb-share.svg')"
                      )
                    a(href="#").item
                      img(
                        :src="require('@/assets/img/twitter-share.svg')"
                      )
          .media_desktop-and-mob
            .row.relative
              .col-xs-12.first-lg
                .name {{ toLocale(product, 'name') }}
                router-link.desc(
                  :to="{ name: 'products-subcategory', params: { slug: product.ProductSubcategory.ProductCategory.slug, subcategory: product.ProductSubcategory.slug} }"
                ) {{ toLocale(product.ProductSubcategory, 'name') }}
              .col-xs-12.first-xs
                .carousel-wrap(v-if="gallery && gallery.length > 1")
                  carousel(
                    loop=true 
                    :items=1
                    :dots="true" 
                    :nav="false"
                  )
                    .square-block(
                      v-for="(src, index) in gallery"
                      :style="{ backgroundImage: 'url(' + src + ')' }"
                      @click="() => showImg(index)"
                    )
                .carousel-wrap(v-else)
                  .square-block(
                    :style="{ backgroundImage: 'url(' + image + ')' }"
                  )
              .col-xs-12
                .share
                  h5 {{ $t('share') }}
                  .share-list
                    a(href="#").item
                      img(
                        :src="require('@/assets/img/fb-share.svg')"
                      )
                    a(href="#").item
                      img(
                        :src="require('@/assets/img/twitter-share.svg')"
                      )
                
      .col-xs-10.col-lg-6.pre-line.col-padding
        .tabs-wrap
          tabs(:options="{ useUrlFragment: false }")
            tab(
              :name="$t('products.tab1')"
              v-html="toLocale(product, 'description')"
            )
            tab(
              :name="$t('products.tab2')"
            )
              p(
                v-html="toLocale(product, 'howtouse')"
              )
            tab(
              :name="$t('products.tab3')"
            )
              p(
                v-html="toLocale(product, 'ingridients')"
              )
</template>

<script>
import carousel from "vue-owl-carousel";
import LocaleService from "@/services/LocaleService";

export default {
  name: "product-preview",
  props: ["product"],
  data() {
    return {
      gallery: false,
      galleryVisible: false,
      index: 0
    };
  },
  methods: {
    toLocale(item, field) {
      return LocaleService.toLocale(item, field, this.$i18n.locale);
    },
    showImg(index, key) {
      this.index = index;
      this.galleryVisible = true;

      document.body.classList.add("hidden-scroll");
    },
    handleHide() {
      this.galleryVisible = false;

      document.body.classList.remove("hidden-scroll");
    }
  },
  computed: {
    image() {
      const img =
        this.product.hasOwnProperty("images") && this.product.images.length > 1
          ? this.product.images.split(",")[0]
          : "default.png";

      return "/uploads/" + img;
    }
  },
  components: {
    carousel
  },
  mounted() {
    console.log("produt", this.product);
    if (
      this.product.images &&
      (this.product.images.indexOf(",") > -1 || this.product.images.length > 1)
    ) {
      this.gallery = this.product.images.split(",").map(function(image) {
        return "/uploads/" + image;
      });
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.product {
  text-align: left;
  margin-bottom: 50px;
}

.media_sm {
  display: none;

  @media $media_sm {
    display: flex;
  }

  @media $media_lg {
    display: none;
  }
}

.media_desktop-and-mob {
  @media $media_sm {
    display: none;
  }

  @media $media_lg {
    display: block;
  }
}

.image-wrap {
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31);
  background-image: url('https://cdn.shopify.com/s/files/1/1068/2502/products/Shadow-Aloe-Infusion-9oz_d3ec928d-c570-4b86-afb9-f8f985547468.jpg');
  display: flex;
  box-shadow: none;
  margin-bottom: 10px;

  &:before {
    content: '';
    display: block;
    padding-top: 100%;
    background: #fff;
  }
}

.sm-desc {
  display: flex;
  flex-direction: column;
  padding: 30px;
}

.name {
  font-family: 'Lora', sans-serif;
  font-size: 19px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  margin-bottom: 10px;
  text-transform: uppercase;

  @media $media_md {
    font-size: 22px;
  }
}

.desc {
  font-size: 16px;
  font-weight: 300;
  line-height: 1.44em;
  color: #7e8f97;
  text-decoration: none;

  @media $media_md {
    font-size: 18px;
  }
}

.share {
  margin-top: auto;

  h5 {
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 1px;
    color: #7e8f97;
    margin-bottom: 20px;
    margin-top: 15px;
    text-transform: uppercase;
  }
}

.share-list {
  display: flex;
  align-items: center;

  .item {
    margin-right: 15px;
  }
}

.col-padding {
  @media $media_lg {
    padding: 50px 60px 65px 60px;
    padding-top: 10px;
  }
}

.col-border {
  @media $media_lg {
    border-right: 1px solid rgba(50, 65, 72, 0.2);
  }
}

.border-top {
  border-top: 1px solid rgba(50, 65, 72, 0.2);
}
</style>
