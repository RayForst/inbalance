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
            value: "Latviski",
            locale: "lv"
          },
          {
            value: "ПО-РУССКИ",
            locale: "ru"
          },
          {
            value: "ENGLISH",
            locale: "en"
          }
        ],
        prefix: "",
        placeholder: "ENGLISH",
        backgroundColor: "#fff",
        hoverBackgroundColor: "#e9ebec",
        textColor: "black",
        borderRadius: "0",
        border: "none",
        width: 96
      },
      configShort: {
        options: [
          {
            value: "LV",
            locale: "lv"
          },
          {
            value: "РУ",
            locale: "ru"
          },
          {
            value: "EN",
            locale: "en"
          }
        ],
        prefix: "",
        placeholder: "РУ",
        backgroundColor: "#fff",
        hoverBackgroundColor: "#e9ebec",
        textColor: "black",
        borderRadius: "0",
        border: "none",
        width: 45
      }
    };
  },
  methods: {
    setNewSelectedOption(selectedOption) {
      let found = this.config.options.find(obj => {
        return obj.value === selectedOption.value;
      });

      this.$i18n.locale = found.locale;
      this.config.placeholder = selectedOption.value;
    },
    setShortNewSelectedOption(selectedOption) {
      this.configShort.placeholder = selectedOption.value;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './../assets/css/_variables';

.lang-xs {
  display: inline-flex;

  @media $media_lg {
    display: none;
  }
}

.lang-lg {
  display: none;

  @media $media_lg {
    display: inline-flex;
  }
}
</style>
