<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *
    VueTrix(
      inputId="editor1" 
      v-model="value"
      placeholder="enter your content..."
      @trix-file-accept="fileAccept"
      @trix-attachment-add="attacmentAdd"
    )

    .error(v-if="error" v-html="error")
</template>

<script>
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import VueTrix from "vue-trix";

const HOST = "http://localhost:3000/upload-editor";

export default {
  props: ["name", "label", "type", "required"],
  inject: ["formKey"],
  data() {
    return {
      html: ""
    };
  },
  computed: {
    value: {
      get() {
        return this.$store.state.forms[this.formKey][this.name].value;
      },
      set(value) {
        console.log("setting value", value);
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
  },
  methods: {
    fileAccept(file) {
      console.log(file);
    },
    attacmentAdd(event) {
      if (event.attachment.file) {
        this.uploadFileAttachment(event.attachment);
      }
    },
    uploadFileAttachment(attachment) {
      this.uploadFile(attachment.file, setProgress, setAttributes);

      function setProgress(progress) {
        attachment.setUploadProgress(progress);
      }

      function setAttributes(attributes) {
        attachment.setAttributes(attributes);
      }
    },
    uploadFile(file, progressCallback, successCallback) {
      console.log("FILE TO UPLOAD", file);
      var key = this.createStorageKey(file);
      var formData = this.createFormData(key, file);
      var xhr = new XMLHttpRequest();

      xhr.open("POST", HOST, true);

      xhr.upload.addEventListener("progress", function(event) {
        var progress = (event.loaded / event.total) * 100;
        progressCallback(progress);
      });

      xhr.addEventListener("load", function(event) {
        if (xhr.status == 204) {
          var attributes = {
            url: HOST + key,
            href: HOST + key + "?content-disposition=attachment"
          };
          this.successCallback(attributes);
        }
      });

      xhr.send(formData);
    },
    createStorageKey(file) {
      var date = new Date();
      var day = date.toISOString().slice(0, 10);
      var name = date.getTime() + "-" + file.name;
      return ["tmp", day, name].join("/");
    },
    createFormData(key, file) {
      var data = new FormData();

      data.append("key", key);
      data.append("file", file);
      data.append("Content-Type", file.type);

      return data;
    }
  },
  components: {
    VueTrix
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
