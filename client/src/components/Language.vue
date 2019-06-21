<template lang="pug">
  .language
    .lang-xs
      vue-dropdown(
        :config="configShort"
        @setSelectedOption="setShortNewSelectedOption($event);"
      )
    .lang-lg
      vue-dropdown(
        :config="config"
        @setSelectedOption="setNewSelectedOption($event);"
      )
</template>

<script>
import vueDropdown from "@/components/dropdown/vue-dropdown";

export default {
  name: "App",
  components: {
    vueDropdown
  },
  data: function() {
    return {
      config: {
        options: [
          {
            value: "ПО-РУССКИ"
          },
          {
            value: "ENGLISH"
          }
        ],
        prefix: "",
        placeholder: "ПО-РУССКИ",
        backgroundColor: "#fff",
        hoverBackgroundColor: '#e9ebec',
        textColor: "black",
        borderRadius: "0",
        border: "none",
        width: 90
      },
      configShort: {
        options: [
          {
            value: "РУ"
          },
          {
            value: "EN"
          }
        ],
        prefix: "",
        placeholder: "РУ",
        backgroundColor: "#fff",
        hoverBackgroundColor: '#e9ebec',
        textColor: "black",
        borderRadius: "0",
        border: "none",
        width: 45
      }
    };
  },
  methods: {
    setNewSelectedOption(selectedOption) {
      this.config.placeholder = selectedOption.value;
    },
    setShortNewSelectedOption(selectedOption) {
      this.configShort.placeholder = selectedOption.value;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './../assets/css/_variables'
.lang-xs
  display inline-flex;

  @media $media_lg
    display none
.lang-lg
  display none 
  @media $media_lg
    display inline-flex
</style>
