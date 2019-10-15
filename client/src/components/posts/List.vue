<template lang="pug">
  .recent-posts.px-2-sm.px-0-lg.list
    .row.center-xs
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-4-sm.col-gap-4-lg
          .col-xs-12.col-sm-6.col-md-4(v-for="item in list.slice(offset, perPage + offset)")
            app-post(:content="item")
      .col-xs-12
        app-pagination(
          :total="list.length" 
          :perPage="perPage" 
          :current="page"
          @newpage="changePage"
        )
</template>

<script>
import appPost from "@/components/posts/ListItem";
import appPagination from "@/components/Pagination";
import contentService from "@/services/ContentService";

export default {
  name: "recent-posts",
  data() {
    return {
      list: [],
      perPage: 9,
      page: 0
    };
  },
  components: {
    appPost,
    appPagination
  },
  computed: {
    offset() {
      return this.page > 0 ? this.page * this.perPage : 0;
    },
  },
  methods: {
    async get() {
      const list = (await contentService.articles.get()).data;

      this.list = list;
    },
    changePage(event) {
      this.page = event;
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
.recent-posts {
  margin-top: 50px;
}
</style>
