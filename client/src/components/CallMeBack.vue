<template lang="pug">
  .callback(
    :class="{open: open}"
  )
    .callback-header(
      @click="open = !open"
    )
      img.callback-icon(
        :src="require('@/assets/img/widget-callback__icon.png')"
      )
      .callback-text
        div Понравились продукты? 
        div Закажите звонок
    .callback-form
      app-form
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
  components: {
    appForm: () => import("@/components/forms/CallMeBack")
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
  margin-left: auto;
  bottom: 0;
  right: 18px;
  color: #fff;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  transform: translateY(120px);
  transition: all 0.4s;

  &-header {
    padding: 11px 15px 11px 60px;
    position: relative;
  }

  &-icon {
    position: absolute;
    top: 15px;
    left: 20px;
  }

  &.open {
    transform: translateY(0);
  }
}
</style>