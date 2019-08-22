<template lang="pug">
  .card
    app-list-header(
      :icon="icon"
      :title="title"
    )
    template(
      v-if="loaded"
    )
      table.ui-table
        tr
          th #
          th Name
          th Actions
        tr(v-for="item, index in items")
          td {{ index + 1 }}
          td {{ item.name }}
          td
            a.ui-link(href="#" @click.prevent="rename(item.id)") Edit
    template(
      v-else
    )
      | Loading...
    app-modal(
      @update="newData"
    )
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-list-category",
  data() {
    return {
      items: [],
      title: "Product Categories",
      icon: "nc-app",
      loaded: false
    };
  },
  components: {
    appModal: () => import("./Modal.vue"),
    appListHeader: () => import("@/components/List/Header")
  },
  methods: {
    async get() {
      const response = (await contentService.productCategories.get({})).data;

      this.items = response;
      this.loaded = true;
    },
    rename(id) {
      const category = this.items.filter(obj => {
        return obj.id === id;
      });

      EventBus.$emit("modal-rename-category", category[0]);
    },
    newData() {
      this.get();
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
