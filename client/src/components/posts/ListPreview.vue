<template lang="pug">
  .recent-posts.px-2-sm.px-0-lg
    .row.center-xs
      .col-xs-12
        .offset-heading
          h2.offset-heading__text {{ heading }}
        .spacer
      .col-xs-12.col-sm-10.col-lg-12
        .row.col-gap-4-sm.col-gap-4-lg.max-xs-item-2.max-sm-item-2.max-md-item-3.max-lg-item-3
          .col-xs-12.col-sm-6.col-md-4(v-for="item in list")
            app-post(:content="item")
</template>

<script>
import appPost from "@/components/posts/ListItem";
import contentService from "@/services/ContentService";

export default {
  name: "recent-posts",
  props: ["heading"],
  data() {
    return {
      list: [
        {
          name: "Article 1",
          image: "castle.jpg"
        },
        {
          name: "Article 2",
          image: "road.jpg"
        },
        {
          name: "Article 3",
          image: "nature.jpg"
        },
        {
          name: "Article 4",
          image: "castle.jpg"
        }
      ]
    };
  },
  components: {
    appPost
  },
  methods: {
    async get() {
      const response = (await contentService.articles.getRecent({})).data;
      this.list.splice(0, this.list.length);

      response.forEach(element => {
        this.list.push(element);
      });
    }
  },
  mounted() {
    this.get();
  }
};
</script>

<style lang="stylus" scoped>
h2 {
  position: relative;
  background: #fff;
}
</style>
