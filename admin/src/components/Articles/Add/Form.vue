<template lang="pug">
  app-form(
    :action="action"
    :storeKey="'article'" 
    :submitText="'Save'"
  )
    app-form-input(:name="'name'" :label="'Name'" :required="true")
    app-form-image(:name="'image'" :label="'Main image'" :required="true")
    app-form-text-editor(:name="'text'" :label="'Text'" :required="true")
    template(
      v-if="isEdit"
    )
      app-form-input-hidden(:name="'id'")
</template>

<script>
import contentService from "@/services/ContentService";

export default {
  name: "article-add-form",
  props: ["isEdit"],
  data() {
    return {
      categories: [],
      actions: {
        add: "/article",
        edit: "/article/edit"
      }
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormTextEditor: () => import("@/components/Form/Inputs/TextEditor.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue"),
    appFormImage: () => import("@/components/Form/Inputs/Image.vue"),
    appFormInputHidden: () => import("@/components/Form/Inputs/Hidden.vue")
  },
  computed: {
    action() {
      return this.isEdit ? this.actions.edit : this.actions.add;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
