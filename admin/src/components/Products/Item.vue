<template lang="pug">
  .list-item
    list-edit-on-click(
      @edit="edit(item)"
    )
      .product-preview.flex-col.middle-xs
        .image-prev
          .image-wrap(
            class="uploaded-image"
            :style="{ backgroundImage: 'url(/uploads/' + image + ')' }"
          )
          .ui-badges
            .badge(v-if="item.priority") priority
            .badge.acent(v-if="item.isNew") new
            .badge.red(v-if="item.totalCount == 0") OUT OF STOCK
            .badge.blue(v-else) {{ item.totalCount }}
            .badge.red(v-if="!item.show") hidden
        .name 
          | {{ item.name }}
          | / 
          span.category {{ item['ProductSubcategory.name'] }}
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
    edit(item) {
      EventBus.$emit("form-edit", item);
    }
  },
  computed: {
    image() {
      return this.item.hasOwnProperty("images") && this.item.images !== ""
        ? this.item.images.split(",")[0]
        : "default.png";
    }
  },
  components: {
    listEditOnClick: () => import("@/components/List/ItemEdit.vue")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.list-item {
  margin-bottom: 20px;
}

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

    img {
      max-height: 100px;
      max-width: 100px;
    }
  }
}
</style>
