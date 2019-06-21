<template lang="pug">
  .articles.content-container.content
    app-recent-posts
</template>

<script>
import appRecentPosts from '@/components/posts/List';

export default {
  name: 'articles',
  metaInfo: {
    title: "Articles",
  },
  components: {
    appRecentPosts
  }
};
</script>
