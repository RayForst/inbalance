<template lang="pug">
  a.ui-button(
    :href="link" target="_blank"
  ) View on site
</template>


<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";

export default {
  props: ["item", "formKey"],
  data() {
    return {
      settings: [
        {
          formKey: "product",
          value: "product"
        },
        {
          formKey: "event",
          value: "events"
        },
        {
          formKey: "article",
          value: "articles"
        },
        {
          formKey: "static",
          value: "static"
        }
      ]
    };
  },
  computed: {
    link() {
      const obj = this.settings.filter(object => {
        return object.formKey === this.formKey;
      })[0];

      return `/${obj.value}/${this.item.slug}`;
    }
  }
};
</script>
