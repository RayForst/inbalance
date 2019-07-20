<template lang="pug">
  .card
    .row
      .col-xs-6
        h4.card-title
          i.nc-icon(:class="icon")
          span(v-text="`${heading} `")
          sup.caption {{ subheading }}
      .col-xs-6.end-xs
        .ui-button-group
          a.ui-button(
            v-if="edit"
            :href="'/product/'+edit.slug" target="_blank"
            @click.prevent="removeConfirm(edit.id, edit.name)"
          ) Remove

          a.ui-button(
            v-if="edit"
            :href="'/product/'+edit.slug" target="_blank"
          ) View on site

          button.ui-button(
            v-if="list"
            @click="list = !list"
          ) add new
          button.ui-button(
            v-else
            @click="list = !list"
          ) back
        
    .row.list(v-if="list")
      div(
        v-for='(item, i) in items' 
        :key="i" 
        :class="{'col-xs-3': wide, 'col-xs-2': !wide }"
      )
        slot(name="item" v-bind:item="item")
    .row(v-else)
      .col-xs-12
        slot(name="form" v-bind:isEdit="edit !== null")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  name: "list",
  props: [
    "items",
    "formKey",
    "title",
    "addTitle",
    "editTitle",
    "caption",
    "addCaption",
    "wide",
    "icon"
  ],
  data() {
    return {
      list: true,
      edit: false
    };
  },
  computed: {
    heading() {
      let heading = `${this.title}`;
      if (!this.edit && this.list) return heading;

      return this.edit ? this.editTitle : this.addTitle;
    },
    subheading() {
      return !this.list ? this.addCaption : this.items.length;
    }
  },
  watch: {
    list(old, current) {
      if (current !== true) this.clearStore();
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
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

i {
  margin-right: 10px;
  font-size: 32px;
}
</style>
