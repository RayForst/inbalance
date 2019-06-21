<template lang="pug">
  .create-product(@click="showAddForm")
    .icon-create-wrap
      i.nc-icon.nc-simple-add
    .name NEW
</template>

<script>
import EventBus from "@/event-bus";

export default {
  name: "articles-list-add",
  data() {
    return {};
  },
  methods: {
    showAddForm() {
      EventBus.$emit("modal-add-article", true);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.create-product {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  padding: 11px;
  box-sizing: border-box;
  height: 100%;
  text-align: center;

  .icon-create-wrap {
    height: 90px;
    width: 90px;
    border: 1px solid rgba(#dfe2e1, 0.7);
    display: flex;
    justify-content: center;
    border-radius: 5px;
    color: blue;
    font-size: 30px;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 20px;
  }

  .name {
    font-size: 14px;
    line-height: 1.33em;
    text-transform: uppercase;
    margin-bottom: 10px;
    letter-spacing: 0.05em;
  }
}
</style>
