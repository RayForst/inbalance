<template lang="pug">
  .container-fluid
    .row.center-xs
      .col-xs-12.center-xs.start-md.col-md-10.col-md-offset-1
        h1.code {{ title }}
        .message(v-html='message')
        div.back
          a.ui-btn.ui-secondary(@click="$router.go(-1)") Go back
</template>

<script>
export default {
  metaInfo: {
    title: "404 Error"
  },
  data() {
    return {
      title: "404",
      message: "Oops, the page you're<br> looking for dos not exist."
    };
  }
};
</script>

<style lang="stylus" scoped>
.code {
  font-size: 64px;
  color: #eb008b;
  margin-bottom: 10px;
}

.back {
  margin-bottom: 40px;
}

.message {
  color: #767676;
  font-size: 22px;
  margin-bottom: 30px;
}

h1 {
  max-width: none;
}
</style>
