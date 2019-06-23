<template lang="pug">
  #app.sticky-footer-container
      //- app-burger
      //-- transition(name="fade" mode="out-in")
      router-view
      app-footer
</template>
<script>
import appFooter from "@/components/Footer.vue";

export default {
  metaInfo: {
    title: "Default Title",
    titleTemplate: "%s | Inbalanse admin"
  },
  data() {
    return {};
  },
  components: {
    appFooter
  },
  mounted() {},
  beforeCreate() {
    // alert('hey 2', this.$store.state.isAuthorized)
    // console.log( this.$store.state.isAuthorized)
    // // if (
    //   !this.$store.state.isAuthorized &&
    //   this.$store.state.route.path != "/login"
    // ) {
    //   alert('push')
    //   this.$router.push({ name: "login" });
    // }
  }
};
</script>

<style lang="stylus">
@import './assets/css/main';

body {
  perspective: 1px;
  transform-style: preserve-3d;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.2s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 0.2s ease;
  opacity: 0;
}

a {
  text-decoration: none;
}
</style>
