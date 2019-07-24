<template lang="pug">
  .list-header.col-xs-6(:class="{'col-xs-12': wide === true}")
    h4.card-title
      i.nc-icon(:class="icon")
      span {{ title }}
      sup.caption(
        v-html="sup"
      )
</template>

<script>
export default {
  props: ["icon", "title", "sup", "wide"],
  data() {
    return {};
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

i {
  margin-right: 10px;
  font-size: 32px;
}

sup.caption {
  text-transform: uppercase;
  margin-left: 7px;
  line-height: 1.5;
  color: $c_accent;
}
</style>
