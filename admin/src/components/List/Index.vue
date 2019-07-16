<template lang="pug">
  .card
    .row
      .col-xs-6
        h4.card-title {{ heading }}
        p.caption {{ subheading }}
      .col-xs-6.end-xs
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
        slot(name="form" v-bind:isEdit="isEdit")
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
    "wide"
  ],
  data() {
    return {
      list: true,
      isEdit: false
    };
  },
  computed: {
    heading() {
      let heading = `${this.title} (${this.items.length})`;
      if (!this.isEdit && this.list) return heading;

      return this.isEdit ? this.editTitle : this.addTitle;
    },
    subheading() {
      return !this.list ? this.addCaption : this.caption;
    },
    isWide() {
      console.log("is wide", this.wide);
      return this.wide;
    }
  },
  watch: {
    list(old, current) {
      console.log(current);
      if (current !== true) this.clearStore();
    }
  },
  components: {},
  methods: {
    updateStore(item) {
      this.$store.commit("changeForm", {
        form: this.formKey,
        item
      });
    },
    clearStore() {
      console.log("CLEAR STORE FUNCTION");
      this.list = true;
      this.isEdit = false;
      this.$store.commit("clearForm", {
        form: this.formKey
      });
    }
  },
  mounted() {
    EventBus.$on("form-edit", item => {
      this.updateStore(item);
      this.isEdit = true;
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
</style>
