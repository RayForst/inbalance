<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Articles'" :icon="'nc-single-copy-04'")
      .card-container
        .row
          .col-xs-12
            app-list
</template>

<script>
export default {
  metaInfo: {
    title: 'Articles',
  },
  name: 'Articles',
  data() {
    return {
      show: false,
    };
  },
  components: {
    appSidebar: () => import('@/components/Sidebar/Index'),
    appHeader: () => import('@/components/Header/Index'),
    appList: () => import('@/components/Articles/List'),
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';
</style>
