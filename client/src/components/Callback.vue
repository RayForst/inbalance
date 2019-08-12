<template lang="pug">
  .callback(@click="open = !open" :class="{open: open}")
    .callback-header
      img.callback-icon(
        :src="require('@/assets/img/widget-callback__icon.png')"
      )
      .callback-text
        div Понравились продукты? 
        div Закажите звонок
    .callback-form
      form
        input(type="text" v-model='value')
        button перезвоните мне
</template>


<script>
export default {
  name: "callMeBack",
  data() {
    return {
      open: false,
      value: "+371"
    };
  },
  methods: {}
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.callback {
  background: #103324;
  width: 270px;
  position: fixed;
  bottom: 0;
  right: 18px;
  color: #fff;
  border-radius: 10px 10px 0 0;
  cursor: pointer;

  &-header {
    padding: 11px 15px 11px 60px;
    position: relative;
  }

  &-icon {
    position: absolute;
    top: 15px;
    left: 20px;
  }

  &-form {
    background: #e5e5e5;
    padding: 20px;
    border: 1px solid #0f3324;
    border-bottom: 0;
    border-top: 0;

    input {
      width: 100%;
      box-sizing: border-box;
      background-color: #fff;
      border: 1px solid #cbcbcb;
      border-radius: 4px;
      height: 35px;
      padding: 0 10px;
      letter-spacing: 0.1em;
    }

    button {
      height: 35px;
      color: #fff;
      font-size: 11px;
      line-height: 1;
      text-transform: uppercase;
      letter-spacing: 1px;
      width: 100%;
      box-sizing: border-box;
      border: none;
      background: #103324;
      margin-top: 10px;
      border-radius: 3px;
    }
  }

  &.open {
    bottom: 100px;
  }
}
</style>