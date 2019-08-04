<template lang="pug">
.editor
  v-jsoneditor(
    v-model="json" 
    :plus="false" 
    :height="'600px'" 
    @error="onError"
  )
  br
  button.ui-button.ui-button--full-green(@click="save") Save
</template>

<script>
import VJsoneditor from "v-jsoneditor/src/index";
import contentService from "@/services/ContentService";

export default {
  props: ["locale"],
  data() {
    return {
      json: {},
      locales: [
        {
          name: "English",
          locale: "en"
        },
        {
          name: "Russian",
          locale: "ru"
        },
        {
          name: "Latvian",
          locale: "lv"
        }
      ]
    };
  },
  computed: {
    label() {
      return this.locales.find(element => {
        return element.locale === this.locale;
      });
    }
  },
  components: {
    VJsoneditor
  },
  methods: {
    onError() {
      console.log("error");
    },
    async save() {
      const response = (await contentService.i18n.save({
        lang: this.locale,
        json: this.json
      })).data;

      this.$notify({
        group: "main",
        title: "Saved!",
        type: "success",
        text: `${this.label.name} language was succesfuly updated`
      });
    },
    async get() {
      const response = (await contentService.i18n.get({
        lang: this.locale
      })).data;

      // this.items = response;

      this.json = response;
    }
  },
  mounted() {
    this.get();
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

h5 {
  font-size: 20px;
  margin: 10px 0;
}
</style>
