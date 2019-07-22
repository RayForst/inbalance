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
          a.ui-button(
            v-if="edit"
            :href="'/product/'+edit.slug" target="_blank"
            @click.prevent="removeConfirm(edit.id, edit.name)"
          ) Remove

          button.ui-button(
            @click="list = !list"
            v-text="list ? 'add new' : 'back'"
          )
    .row.list(v-if="list")
      div(
        v-for='(item, i) in items' 
        :key="i" 
        :class="{'col-xs-3': wide, 'col-xs-2': !wide }"
      )
        slot(name="item" v-bind:item="item")

    .row(v-else)
      .col-xs-12(v-if="edit")
        app-form-translate
      .col-xs-12
        .ui-button-group
          a.ui-button(
            v-if="edit"
            :href="'/product/'+edit.slug" target="_blank"
          ) View on site

      .col-xs-12
        .form-container
          slot(name="form" v-bind:isEdit="edit !== null")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "list",
  props: ["items", "formKey", "title", "caption", "addCaption", "wide", "icon"],
  data() {
    return {
      list: true,
      edit: false
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

      return !this.edit ? "Add New " : "Edit";
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
    appFormTranslate: () => import("@/components/Form/Translations")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.form-container {
  padding: 0 1em;
}
</style>
