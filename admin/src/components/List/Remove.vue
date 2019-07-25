<template lang="pug">
  a.ui-button.ui-button--full-red(
    :href="'/product/'+item.slug" target="_blank"
    @click.prevent="removeConfirm(item.id, item.name)"
  ) Remove
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
          value: "product",
          contentServiceKey: "products",
          event: "form-success-static"
        },
        {
          formKey: "event",
          value: "event page",
          contentServiceKey: "events",
          event: "form-success-event"
        },
        {
          formKey: "article",
          value: "article page",
          contentServiceKey: "articles",
          event: "form-success-static"
        },
        {
          formKey: "static",
          value: "static page",
          contentServiceKey: "static",
          event: "form-success-product"
        }
      ]
    };
  },
  methods: {
    removeConfirm(id, name) {
      const settings = this.getMessage(this.formKey);

      if (confirm(`You sure want to delete "${name}" ${settings.value}?`)) {
        this.remove(id, settings.contentServiceKey, settings.event);
      }
    },
    getMessage(key) {
      return this.settings.filter(object => {
        return object.formKey === key;
      })[0];
    },
    async remove(id, contentServiceKey, event) {
      await contentService[contentServiceKey].remove({ id });

      EventBus.$emit(event);
    }
  }
};
</script>
