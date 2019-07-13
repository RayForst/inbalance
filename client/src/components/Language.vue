<template lang="pug">
  .language
    .lang-xs
      vue-dropdown(
        :config="configShort"
        @setSelectedOption="setShortNewSelectedOption($event);"
      )
    .lang-md
      vue-dropdown(
        :config="config"
        @setSelectedOption="setNewSelectedOption($event);"
      )
</template>

<script>
import vueDropdown from "@/components/dropdown/vue-dropdown";
import EventBus from "@/event-bus";

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
      const option = this.config.options.find(obj => {
        return obj.value === selectedOption.value;
      });

      this.config.placeholder = selectedOption.value;

      EventBus.$emit("lang-request", option.locale);
    },
    setShortNewSelectedOption(selectedOption) {
      const option = this.configShort.options.find(obj => {
        return obj.value === selectedOption.value;
      });

      this.configShort.placeholder = selectedOption.value;

      EventBus.$emit("lang-request", option.locale);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.lang-xs {
  display: inline-flex;

  @media $media_md {
    display: none;
  }
}

.lang-md {
  display: none;

  @media $media_md {
    display: inline-flex;
  }
}
</style>
