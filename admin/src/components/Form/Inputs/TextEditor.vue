<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *
    ckeditor(
      v-model="value"
      :editor="editor"
      :config="editorConfig"
    )
    .error(v-if="error" v-html="error")
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: ["name", "label", "type", "required"],
  inject: ["formKey"],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "bold",
          "italic",
          "link",
          "blockquote",
          "numberedList",
          "bulletedList"
        ]
      }
    };
  },
  computed: {
    value: {
      get() {
        return this.$store.state.forms[this.formKey][this.name].value;
      },
      set(value) {
        this.$store.commit("changeFormInput", {
          form: this.formKey,
          input: this.name,
          value
        });
      }
    },
    error() {
      return this.$store.state.forms[this.formKey][this.name].error;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
