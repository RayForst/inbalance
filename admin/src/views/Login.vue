<template lang="pug">
  .content.color-background.flex_col.center-xs
    .content-container.login
      //- transition(name="fadeslide" mode="out-in")
      .text-center.c_white(v-show="show")
        img.logo(:src="require('../assets/img/logo-footer.svg')" alt="")
        app-form(
          :action="'/login'"
          :storeKey="'login'"
          :submitText="'Sign In'"
          @submit.prevent="sign"
        )
          app-form-input(
            :name="'login'"
            :label="'Login'"
            :type="'text'"
            placeholder="Username"
          )
          app-form-input(
            :name="'password'"
            :label="'Password'"
            :type="'password'"
            placeholder="Password"
          )
    ul.bg-bubbles
      li(v-for="item in 10")
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";

export default {
  metaInfo: {
    title: "Login"
  },
  name: "login",
  data() {
    return {
      show: false
    };
  },
  components: {
    appForm: () => import("@/components/Form/Form.vue"),
    appFormInput: () => import("@/components/Form/Inputs/Input.vue")
  },
  mounted() {
    this.show = true;
  },
  methods: {
    async sign() {
      try {
        const response = (await AuthenticationService.login({
          login: this.login,
          password: this.password
        })).data;

        this.$store.dispatch("setToken", response.token);
        this.$store.dispatch("setUser", response.user);

        this.$router.push("products");
      } catch (err) {
        this.error = err.response.data.message;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.color-background {
  background: #50a3a2;
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
}

.fade-enter {
  opacity: 0;
  transform: translateX(0px);
}

.fade-enter-active {
  transform: translateX(-50px);
  transition: all 2s ease;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 2s ease;
  opacity: 0;
}

.login {
  width: 280px;
  margin-top: 100px;
  margin-bottom: auto;
  padding-bottom: 52px;
  z-index: 2;

  @media (orientation: landscape) {
    margin-top: 30px;
  }

  @media $media_sm {
    margin-top: 140px;
  }
}

.logo {
  margin-bottom: 20px;
  height: 80px;
}

form {
  z-index: 2;

  * {
    box-sizing: border-box;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 250px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-size: 18px;
    color: white;
    transition-duration: 0.25s;
    font-weight: 300;
  }
}
</style>
