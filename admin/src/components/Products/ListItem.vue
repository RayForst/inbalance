<template lang="pug">
  .product-preview.flex-col.middle-xs
    .image-prev
      .image-wrap(
        class="uploaded-image"
        :style="{ backgroundImage: 'url(/uploads/' + image + ')' }"
      )
      .badges
        i.nc-icon.nc-satisfied(v-if="item.priority")
    .name {{ item.name }}
    .category {{ item['ProductSubcategory.name'] }}
    .list-controls
      a.ui-link(:href="'/product/'+item.slug" target="_blank") View
      a.ui-link(@click.prevent="edit(item)") Edit
      a.ui-link(@click.prevent="removeConfirm(item.id, item.name)") Remove
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-list-item",
  props: ["item"],
  data() {
    return {
      category: "super catgory name"
    };
  },
  methods: {
    removeConfirm(id, name) {
      if (confirm(`You sure want to delete "${name}" product?`)) {
        this.remove(id);
      }
    },
    async remove(id) {
      const response = (await contentService.products.remove({
        id
      })).data;

      EventBus.$emit("form-success-product");
    },
    edit(item) {
      EventBus.$emit("modal-edit-product", item);
    }
  },
  computed: {
    image() {
      return this.item.hasOwnProperty("images") && this.item.images !== ""
        ? this.item.images.split(",")[0]
        : "default.png";
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.image-wrap {
  width: 100%;
  background-position: center center;
  background-size: cover;

  &:before {
    content: '';
    padding-top: 100%;
    display: block;
  }
}

.product-preview {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;

  .name {
    font-size: 14px;
    line-height: 1.33em;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .category {
    font-size: 10px;
    line-height: 1.33em;
    text-transform: uppercase;
    margin-bottom: 10px;
    color: gray;
  }

  .image-prev {
    display: flex;
    margin-bottom: 10px;
    justify-content: center;
    width: 100%;
    position: relative;

    .badges {
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(#000, 0.4);
      height: 28px;
      text-align: right;

      .nc-icon {
        color: #fff;
        font-size: 18px;
        padding: 5px;
      }
    }

    img {
      max-height: 100px;
      max-width: 100px;
    }
  }
}
</style>
