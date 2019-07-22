<template lang="pug">
  .list-header.col-xs-6
    h4.card-title
      i.nc-icon(:class="icon")
      span {{ title }}
      sup.caption {{ sup }}
</template>

<script>
export default {
  props: ["icon", "title", "sup"],
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
</style>
