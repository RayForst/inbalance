<template lang="pug">
  section.colors
    .row
      .col-xs-12
        h2 Colors
    .row
      .col-xs-2(v-for="variable in variables")
        .color
          .color-preview(:style="{'background-color': variable.value }")
          .value {{ variable.name }}
</template>

<script>
export default {
  data() {
    return {
      variables: [
        {
          name: "$c_primary",
          value: "#103324"
        },
        {
          name: "$c_accent",
          value: "#009688"
        },
        {
          name: "$c_gray",
          value: "#7e8f97"
        },
        {
          name: "$c_error",
          value: "#F44336"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.color {
  .color-preview {
    height: 60px;
    margin-bottom: 10px;
  }
}
</style>

