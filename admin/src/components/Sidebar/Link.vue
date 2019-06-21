<template lang="pug">
  router-link(
      :to="{ name: item.route }"
    )
    i.nc-icon(:class="item.icon")
    span {{ item.name }}
</template>

<script>
export default {
  name: 'sidebar',
  props: ['item'],
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

i
  font-size: 28px;
  margin-right: 20px;

a
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 10px 15px;
  line-height: 32px;
  opacity: 0.86
  transition: all .3s;
  color: inherit;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin: 5px 0;

  &:hover
    background: hsla(0,0%,100%,.13);
    opacity: 0.85;

  &.router-link-exact-active
    color: #fff;
    opacity: 1;
    background: hsla(0,0%,100%,.23);

</style>
