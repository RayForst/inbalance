<template lang="pug">
  .card
    app-list-header(
      :icon="icon"
      :title="title"
      :wide="true"
    )

    app-modal(
      @update="newData"
    )

    template(
      v-if="loaded"
    )
      table.ui-table
        tr
          th #
          th Name
          th Main category
          th Actions
        tr(v-for="item, index in items")
          td {{ index + 1 }}
          td {{ item.name }}
          td {{ item["ProductCategory.name"] }}
          td
            a.ui-link(href="#" @click.prevent="showEditModal(item.id)") Edit
            a.ui-link(href="#" @click.prevent="remove(item.id, item.name)") Remove
    template(
      v-else
    )
      | Loading...
    button.ui-button.ui-button--full-green(@click="showModal") Add new
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-list-category",
  data() {
    return {
      title: "Product Subcategories",
      icon: "nc-app",
      items: [],
      loaded: false
    };
  },
  components: {
    appModal: () => import("./Modal.vue"),
    appListHeader: () => import("@/components/List/Header")
  },
  methods: {
    async get() {
      const response = (await contentService.productSubcategories.get({})).data;

      this.items = [];
      response.forEach(element => {
        this.items.push(element);
      });

      this.loaded = true;
    },
    showModal() {
      EventBus.$emit("modal-add-subcategory", true);
    },
    showEditModal(id) {
      const category = this.items.filter(obj => {
        return obj.id === id;
      });

      EventBus.$emit("modal-edit-subcategory", category[0]);
    },
    async remove(id, name) {
      if (confirm(`You sure want to delete "${name}" subcategory?`)) {
        const response = (await contentService.productSubcategories.remove({
          id
        })).data;
        this.get();
      }
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
