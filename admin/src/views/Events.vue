<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Events'" :icon="'nc-atom'")
      .card-container
        .row
          .col-xs-12
            app-list
</template>

<script>
export default {
  metaInfo: {
    title: 'Events',
  },
  name: 'Events',
  data() {
    return {
      show: false,
    };
  },
  components: {
    appSidebar: () => import('@/components/Sidebar/Index'),
    appHeader: () => import('@/components/Header/Index'),
    appList: () => import('@/components/Events/List'),
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables'
</style>
