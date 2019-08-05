<template lang="pug">
  ul.pagination
    li(v-for="page, index in items" :class="{ active: index === 0 }") {{ page }}
</template>

<script>
export default {
  props: ["total", "perPage"],
  data() {
    return {};
  },
  computed: {
    items() {
      return Math.ceil(this.total / this.perPage);
    }
  }
};
</script>

<style lang="stylus" soped>
@import '~@/assets/css/_variables';

ul.pagination {
  padding: 0;
  margin: 0;
  display: inline-flex;
  list-style-type: none;
  padding: 50px 0;

  li {
    font-size: 20px;
    line-height: 1.2em;
    color: #103324;
    cursor: pointer;
    padding: 12px;

    &.active {
      font-weight: bold;
      color: #66bb6a;
    }
  }
}
</style>

