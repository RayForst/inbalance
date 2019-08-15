<template lang="pug">
  .recent-posts.px-2-sm.px-0-lg
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-3-sm
          .col-xs-12.col-sm-6.col-md-4(v-for="item in items")
            app-post(:content="item")
</template>

<script>
export default {
  name: "page-preview",
  props: ["items"],
  data() {
    return {};
  },
  components: {
    appPost: () => import("@/components/pagePreview/ListItem")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
