<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *
    .container(v-if="image")
      .row
        .preview.col-xs-4
          .image-wrap(
            class="uploaded-image"
            :style="{ backgroundImage: 'url(/uploads/' + image + ')' }"
          )

    .file-upload-wrapper(
      data-text="Select your file!"
      :class="{ inputError: error }"
    )
      input(
        type="file"
        placeholder="File"
        @change="onFileSelected" 
        ref="fileInput"
        data-text="Select your file!"
      )

    input(
      :name="name"
      v-model="value"
      type="hidden"
    )

    .error(v-if="error" v-html="error")
</template>

<script>
import contentService from "@/services/ContentService";
import EventBus from "@/event-bus";
import Form from "@/services/Form.js";

export default {
  props: ["name", "label", "required"],
  inject: ["formKey"],
  data() {
    return {
      file: {
        value: null
      },
      uploaded: false
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
    image() {
      let value = this.$store.state.forms[this.formKey][this.name].value;
      return value ? value : "";
    },
    error() {
      return this.$store.state.forms[this.formKey][this.name].error;
    }
  },
  methods: {
    onFileSelected(event) {
      this.file.value = event.target.files[0];
      this.save();
    },
    async save() {
      let fd = new FormData();
      fd.append("file", this.file.value);

      try {
        const image = (await contentService.upload.save(fd)).data;
        const imagename = image.file.filename;

        this.uploaded = imagename;
        this.value = imagename;
      } catch (err) {
        this.$notify({
          group: "main",
          title: "Error!",
          type: "error",
          text: `Max image size 2MB`,
          duration: 5000
        });
      }
    },
    clear() {
      this.uploaded = false;
      this.$store.commit("changeFormInput", {
        form: this.formKey,
        input: this.name,
        value: null
      });
    }
  },
  mounted() {
    EventBus.$on("modal-close", this.clear);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.image-wrap {
  width: 100%;
  background-position: center center;
  background-size: cover;

  &:before {
    content: '';
    padding-top: 100%;
    display: block;
  }
}

.file-upload-wrapper {
  $height = 60px;
  position: relative;
  width: 100%;
  height: $height;
  border: 1px solid #e3e3e3;

  &:after {
    content: attr(data-text);
    font-size: 18px;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    padding: 10px 15px;
    display: block;
    width: calc(100% - 40px);
    pointer-events: none;
    z-index: 20;
    height: $height - 20px;
    line-height: $height - 20px;
    color: #999;
    border-radius: 5px 10px 10px 5px;
    font-weight: 300;
  }

  &:before {
    content: 'Upload';
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    height: 60px;
    background: $c_accent;
    color: #fff;
    font-weight: 700;
    z-index: 25;
    font-size: 16px;
    line-height: $height;
    padding: 0 15px;
    text-transform: uppercase;
    pointer-events: none;
    border-radius: 0 5px 5px 0;
  }

  &:hover {
    // &:before {
    // background: darken($c_accent, 10%);
    // }
  }

  input {
    opacity: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    height: $height - 20px;
    margin: 0;
    padding: 0;
    display: block;
    cursor: pointer;
    width: 100%;
  }
}

.preview {
  margin-bottom: 20px;

  img {
    width: 100%;
  }
}

.container {
  padding: 0 0.5rem;
}

.inputError {
  border-color: $c_error;
}
</style>
