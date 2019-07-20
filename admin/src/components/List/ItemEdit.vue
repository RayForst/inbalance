<template lang="pug">
  .edit-wrap(
    @click="edit"
  )
    .edit-overlay
      i.nc-icon.nc-settings-tool-66
      span Edit

    <slot></slot>
</template>


<script>
export default {
  name: "list-edit-view",
  methods: {
    edit() {
      this.$emit("edit", true);
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.edit-wrap {
  position: relative;

  .edit-overlay {
    display: none;

    i {
      font-size: 30px;
      margin-bottom: 10px;
    }

    span {
      letter-spacing: 0.0725em;
      font-size: 16px;
    }
  }

  &:hover {
    .edit-overlay {
      display: block;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 200;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-size: 20px;
      background: radial-gradient(rgba(0, 0, 0, 0.23) 10%, transparent, transparent);
      flex-direction: column;
      color: white;
    }
  }
}
</style>