<template lang="pug">
  .form-group(
    :class="{ inputError: error }"
  )
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *
    VueTrix(
      :inputId="'editor1'+name" 
      v-model="value"
      placeholder="enter your content..."
      @trix-file-accept="fileAccept"
      @trix-attachment-add="attacmentAdd"
    )

    .error(v-if="error" v-html="error")
</template>

<script>
import Form from "@/services/Form.js";
import VueTrix from "vue-trix";

const HOST = "http://localhost:3000/upload-editor";
const UPLOAD_HOST = "http://localhost:280";

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
        return Form.inputs.get(this.$store, this.formKey, this.name);
      },
      set(value) {
        return Form.inputs.set(value, this.$store, this.formKey, this.name);
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
      var key = this.createStorageKey(file);
      var formData = this.createFormData(key, file);
      var xhr = new XMLHttpRequest();

      xhr.open("POST", HOST, true);

      xhr.upload.addEventListener("progress", function(event) {
        var progress = (event.loaded / event.total) * 100;
        progressCallback(progress);
      });

      xhr.addEventListener("load", function(event) {
        console.log('LOAD FIRE 2', xhr)
        if (xhr.status == 200) {
          var attributes = {
            url: UPLOAD_HOST + xhr.response,
            href: UPLOAD_HOST + xhr.response
          };

          successCallback(attributes);
        }
      });

      xhr.send(formData);
    },
    createStorageKey(file) {
      var date = new Date();
      var day = date.toISOString().slice(0, 10);
      var name = date.getTime() + "-" + file.name;
      return [day, name].join("/");
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

<style lang="stylus">
@import '~@/assets/css/_variables';

.inputError .trix-content {
  border-color: $c_error;
}
</style>
