<template lang="pug">
  .form-group
    .label 
      | {{ label }}
      template(v-if="required")
        span.requied-mark *
    .container
      .row
        .preview.col-xs-4.col-lg-2(v-for="image in images")
          .image-wrap(
            class="uploaded-image"
            :style="{ backgroundImage: 'url(/uploads/' + image + ')' }"
          )
            .remove(title="Remove" @click="remove(image)")

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

export default {
  props: ["name", "label", "required"],
  inject: ["formKey"],
  data() {
    return {
      file: {
        value: null
      },
      uploaded: []
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
    images() {
      let value = this.$store.state.forms[this.formKey][this.name].value;
      return value ? value.split(",") : [];
    },
    error() {
      return this.$store.state.forms[this.formKey][this.name].error;
    }
  },
  methods: {
    remove(image) {
      if (confirm("Are you sure?")) {
        let images = this.images;
        var index = images.indexOf(image);
        if (index !== -1) images.splice(index, 1);

        this.value = this.images.join(",");
      }
    },
    onFileSelected(event) {
      this.file.value = event.target.files[0];
      this.save();
    },
    async save() {
      let fd = new FormData();
      fd.append("file", this.file.value);

      const image = (await contentService.upload.save(fd)).data;
      const imagename = image.file.filename;

      this.uploaded.push(imagename);

      this.value = this.uploaded.join(",");
    },
    clear() {
      this.uploaded = [];
      this.$store.commit("changeFormInput", {
        form: this.formKey,
        input: this.name,
        value: null
      });
    }
  },
  mounted() {
    EventBus.$on(
      [
        "modal-close",
        "form-success-product",
        "form-success-event",
        "form-success-article",
        "form-success-static"
      ],
      this.clear
    );
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.image-wrap {
  width: 100%;
  background-position: center center;
  background-size: cover;
  position: relative;

  &:before {
    content: '';
    padding-top: 100%;
    display: block;
  }

  .remove {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    cursor: pointer;

    &:before {
      content: '+';
      position: absolute;
      top: 0;
      right: 0;
      font-size: 30px;
      color: red;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 25px;
      transform: rotate(45deg);
    }
  }
}

.file-upload-wrapper {
  $defaultColor = #4daf7c;
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
    background: $defaultColor;
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
    // background: darken($defaultColor, 10%);
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
  img {
    width: 100%;
  }

  margin-bottom: 20px;
}

.container {
  padding: 0 0.5rem;
}

.inputError {
  border-color: red;
}
</style>
