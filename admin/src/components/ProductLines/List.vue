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
            a.ui-link(href="#" @click.prevent="showEditModal(item.id)") Edit
            a.ui-link(href="#" @click.prevent="remove(item.id, item.name)") Remove
    template(
      v-else
    )
      | Loading...
    app-modal(
      @update="newData"
    )
    button.ui-button.ui-button--full-green(@click="showModal") Add new
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "product-list-lines",
  data() {
    return {
      items: [],
      title: "Product Lines",
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
      const response = (await contentService.productLines.get()).data;

      this.items = response;
      this.loaded = true;
    },
    rename(id) {
      const category = this.items.filter(obj => {
        return obj.id === id;
      });

      EventBus.$emit("modal-rename-category", category[0]);
    },
    showModal() {
      EventBus.$emit("modal-add-line", true);
    },
    showEditModal(id) {
      const category = this.items.filter(obj => {
        return obj.id === id;
      });

      EventBus.$emit("modal-edit-line", category[0]);
    },
    newData() {
      this.get();
    },
    async remove(id, name) {
      if (confirm(`You sure want to delete "${name}" product line?`)) {
        const response = (await contentService.productLines.remove({
          id
        })).data;
        this.get();
      }
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
