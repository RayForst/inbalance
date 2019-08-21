<template lang="pug">
  .logout Loading
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  name: "logout",
  mounted() {
    this.$store.dispatch("setToken", null);
    this.$store.dispatch("setUser", null);

    this.$router.push({ name: "login" });
  }
};
</script>
