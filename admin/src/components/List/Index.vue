<template lang="pug">
  .card
    .row
      app-list-header(
        :icon="icon"
        :title="title"
        :sup="supheading"
      )

      .col-xs-6.end-xs
        .ui-button-group
          app-view-on-site(
            v-if="edit"
            :item="edit"
            :formKey="formKey"
          )
          app-list-remove(
            v-if="edit"
            :item="edit"
            :formKey="formKey"
          )

          button.ui-button(
            @click="list = !list"
            v-text="list ? 'add new' : 'back'"
          )
    .row.list(v-if="list")
      div(
        v-for='(item, i) in items.slice(offset, onPage + offset)' 
        :key="i" 
        :class="{'col-xs-3': wide, 'col-xs-2': !wide }"
      )
        slot(name="item" v-bind:item="item")
      
      .col-xs-12
        .row
          .col-xs-12
            app-pagination(
              :total="items.length" 
              :perPage="onPage" 
              :current="page"
              @newpage="changePage"
            )
    .row(v-else)
      .col-xs-12
        .form-container
          slot(name="form" v-bind:isEdit="edit")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "list",
  props: ["items", "formKey", "title", "wide", "icon"],
  data() {
    return {
      list: true,
      edit: false,
      onPage: 12,
      page: 0
    };
  },
  watch: {
    list(old, current) {
      if (current !== true) this.clearStore();
    }
  },
  computed: {
    supheading() {
      if (this.list) return this.items.length;

      return !this.edit ? "Add New " : `Edit`;
    },
    offset() {
      return this.page > 0 ? this.page * this.onPage : 0;
    }
  },
  methods: {
    updateStore(item) {
      this.$store.commit("changeForm", {
        form: this.formKey,
        item
      });
    },
    clearStore() {
      this.list = true;
      this.edit = false;

      this.$store.commit("clearForm", {
        form: this.formKey
      });
    },
    changePage(event, lala) {
      this.page = event;
    }
  },
  mounted() {
    EventBus.$on("form-edit", item => {
      this.updateStore(item);
      this.edit = item;
      this.list = false;
    });

    EventBus.$on(`form-success-${this.formKey}`, () => {
      this.clearStore();

      EventBus.$emit("update-list", true);
    });
  },
  components: {
    appListHeader: () => import("@/components/List/Header"),
    appViewOnSite: () => import("@/components/List/ViewOnSite"),
    appListRemove: () => import("@/components/List/Remove"),
    appPagination: () => import("@/components/List/Pagination")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.form-container {
  padding: 0 1em;
}
</style>
