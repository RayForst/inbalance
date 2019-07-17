<template lang="pug">
  .product-preview.flex-col.middle-xs
    .image-prev
      .image-wrap(
        class="uploaded-image"
        :style="{ backgroundImage: `url(${image})` }"
      )
    .name(v-html="item.name")
    .list-controls
      a.ui-link(:href="'/articles/'+item.slug" target="_blank") View
      a.ui-link(@click.prevent="edit(item)") Edit
      a.ui-link(@click.prevent="removeConfirm(item.id, item.name)") Remove
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
    removeConfirm(id, name) {
      if (confirm(`You sure want to delete "${name}" article page?`)) {
        this.remove(id);
      }
    },
    async remove(id) {
      const response = (await contentService.articles.remove({
        id
      })).data;

      EventBus.$emit("form-success-static");
    },
    edit(item) {
      EventBus.$emit("modal-edit-article", item);
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
