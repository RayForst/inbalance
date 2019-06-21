<template lang="pug">
nav.header
  .name
    span(v-text="name")
    i.nc-icon(:class="icon")

  .right-controls
    a.nav-link(
      href="#"
      v-text="routes.logout.name"
    )
</template>

<script>
export default {
  name: "app-header",
  props: ["name", "icon"],
  data() {
    return {
      routes: {
        logout: {
          name: "Log out"
        }
      }
    };
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

nav.header {
  border: 0;
  font-size: 16px;
  border-radius: 0;
  min-height: 50px;
  background-color: hsla(0, 0%, 100%, 0.96);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  i {
    font-size: 16px;
    margin-left: 10px;
  }

  .name {
    font-size: 20px;
    color: #888;
    font-weight: 400px;
    display: inline-flex;
    align-items: center;
  }

  .nav-link {
    color: #888;
    padding: 10px 15px;
  }
}
</style>
