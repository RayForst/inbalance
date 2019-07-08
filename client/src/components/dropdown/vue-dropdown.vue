<template>
  <div
    class="dropdown"
    @click="toggleRiskLevels"
    :style="[
      { '--options-height': optionsHeight + 'px' },
      { '--option-height': optionHeight + 'px' },
      { '--main-el-border-radius': borderRadius },
      { '--dropdown-width': width + 'px' },
      { '--dropdown-background-color': backgroundColor },
      { '--dropdown-border': border },
      { '--dropdown-hover-background-color': hoverBackgroundColor },
      { '--dropdown-default-text-color': textColor }
    ]"
    ref="container"
  >
    <span class="text">
      {{ (config.prefix ? config.prefix : "") + " "
      }}{{ config.placeholder ? config.placeholder : "" }}
    </span>
    <i class="angle-down"></i>
    <div v-if="isBottomSectionToggled" class="options">
      <div
        v-for="option in configOptions"
        class="option"
        @click="setCurrentSelectedOption(option);"
      >{{ option.value }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dropdown",
  data() {
    return {
      isBottomSectionToggled: false,
      optionsHeight: 0,
      optionHeight: 35,
      width: 100,
      configOptions: [],
      backgroundColor: "gray",
      hoverBackgroundColor: "#7e8f97",
      border: "1px solid  #232b35",
      borderRadius: 0,
      textColor: "#fff"
    };
  },
  components: {},
  props: ["config"],
  computed: {},
  methods: {
    toggleRiskLevels() {
      this.isBottomSectionToggled = !this.isBottomSectionToggled;
      this.$refs.container.classList.toggle("open");
    },
    setCurrentSelectedOption(option) {
      this.$emit("setSelectedOption", option);
    },
    setConfigData() {
      this.configOptions = this.config.options;
      this.width = this.config.width;
      this.placeholder = this.config.placeholder;
      if (this.config.backgroundColor) {
        this.backgroundColor = this.config.backgroundColor;
      }
      if (this.config.border) {
        this.border = this.config.border;
      }
      if (this.config.hoverBackgroundColor) {
        this.hoverBackgroundColor = this.config.hoverBackgroundColor;
      }
      if (this.config.textColor) {
        this.textColor = this.config.textColor;
      }
      if (this.config.borderRadius) {
        this.borderRadius = this.config.borderRadius;
      }
    },
    setOptionsHeight() {
      this.optionsHeight = this.optionHeight * this.configOptions.length;
    }
  },
  created() {
    this.setConfigData();
    this.setOptionsHeight();
  },
  beforeUdate() {
    // this.setOptionsHeight();
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

// * * binded style variables * *
// --options-height --> dynamic options menu height
// --option-height --> dynamic single option item height
// --dropdown-width --> dynamic dropdown & options drawer width

// * * * Variables * * *
@default-border-radius : 4px;@default-text-hover-color : black;@default-hover-color : #0084d4;@default-text-color : #fff;
.dropdown {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: var(--dropdown-width);
  height: var(--option-height);
  padding: 0 10px;
  position: relative;
  border: var(--dropdown-border);
  border-radius: var(--main-el-border-radius);
  cursor: pointer;
  color: var(--dropdown-default-text-color);
  background: var(--dropdown-background-color);
  user-select: none;
  font-size: 10px;
  font-family: 'Lora', sans-serif;
  letter-spacing: 0.13em;
  justify-content: center;
  border-radius: 3px;

  .text {
    margin-left: auto;
    text-transform: uppercase;
  }

  &.open {
    .angle-down {
      transform: rotate(-180deg);
    }
  }

  .angle-down {
    arrow(5px);
    margin-left: auto;
    transition: all 0.2s ease;
  }

  .options {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: calc(-1 * var(--options-height) - 3px);
    position: absolute;
    left: -1px;
    top: calc(var(--option-height));
    z-index: 9999;
    background: var(--dropdown-background-color);
    border: 1px solid #d7d9da;
    border-radius: 5px;
    margin-top: 6px;
    font-size: 12px;
    padding: 5px 0;

    .option {
      display: flex;
      align-items: center;
      width: auto;
      padding: 0 10px;
      height: 35px;
      justify-content: center;
      text-transform: uppercase;
    }

    .option:hover {
      color: @default-text-hover-color;
      background: @default-hover-color;
      transition: all 0.7s;
    }

    .option:last-child {
      border-radius: 0 0 4px 4px;
    }
  }

  .shown {
    // border: 1px solid black;
    max-height: 999px;
    transition: all 1s linear;
  }
}

.dropdown:hover {
  background: var(--dropdown-hover-background-color);
  transition: 0.7s all;

  .text, i {
    color: var(--dropdown-default-text-color);
  }
}

.dropdown-shown {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

// Smartphones - Landscape + Portrait
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
}
</style>
