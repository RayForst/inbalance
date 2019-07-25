<template lang="pug">
  .product-preview.flex-col.middle-xs
    list-edit-on-click(
      @edit="edit(item)"
    )
      .image-prev
        .image-wrap(
          class="uploaded-image"
          :style="{ backgroundImage: `url(${image})` }"
        )
      .name(v-html="item.name")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "article-list-item",
  props: ["item"],
  data() {
    return {};
  },
  computed: {
    image() {
      const path = `/uploads/${this.item.image}`;

      return path;
    }
  },
  methods: {
    edit(item) {
      EventBus.$emit("form-edit", item);
    }
  },
  components: {
    listEditOnClick: () => import("@/components/List/ItemEdit.vue")
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
    padding-top: 60%;
    display: block;
  }
}

.product-preview {
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

    img {
      max-height: 100px;
      max-width: 100px;
    }
  }
}
</style>
