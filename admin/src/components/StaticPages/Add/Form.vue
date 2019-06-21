<template lang="pug">
  app-form(
    :action="action"
    :storeKey="'static'" 
    :submitText="'Save'"
  )
    app-form-input(:name="'name'" :label="'Name'")
    app-form-select(:name="'menupos'" :label="'Menu Category'" :options="menu")
    app-form-image(:name="'image'" :label="'Main image'")
    app-form-text-editor(:name="'text'" :label="'Text'")
    template(
      v-if="isEdit"
    )
      app-form-input-hidden(:name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "article-add-form",
  props: ["menu", "isEdit"],
  data() {
    return {
      categories: [],
      actions: {
        add: "/static",
        edit: "/static/edit"
      }
    };
  },
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    }
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormImage: () => import("@/components/Form/Inputs/Image.vue"),
    appFormSelect: () => import("@/components/Form/Inputs/Select.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
