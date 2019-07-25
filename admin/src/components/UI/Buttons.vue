<template lang="pug">
  section.colors
    .row
      .col-xs-12
        h2 Buttons
        p Also class .ui-button-group available
    .row
      .col-xs-2(v-for="variable in variables")
        .button-wrap
          a(:class="variable") button
          span {{ variable }}
</template>

<script>
export default {
  data() {
    return {
      variables: [
        "ui-button",
        "ui-button ui-button--white",
        "ui-button ui-button--full-green",
        "ui-button ui-button--full-red",
        "ui-button ui-button--big"
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.button-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #80808045;
  padding: 20px;
  text-align: center;
  height: 100%;
  box-sizing: border-box;

  span {
    margin-top: 10px;
  }
}
</style>

