<template lang="pug">
  .loading
    img(:src="require('../assets/img/logo-footer.svg')" alt="")
    .loader
      .dot.dot1
      .dot.dot2
      .dot.dot3
      .dot.dot4
</template>

<script>
import appLogo from "@/components/Logo";

export default {
  name: "loader",
  components: {
    appLogo
  }
};
</script>

<style lang="stylus" scoped>
@import './../assets/css/_variables';

.loading {
  text-align: center;
  padding-top: 40px;

  img {
    height: 80px;
  }
}

.loader {
  font-size: 20px;
  position: relative;
  width: 4em;
  height: 1em;
  margin: 100px auto;
}

.dot {
  width: 1em;
  height: 1em;
  border-radius: 0.5em;
  background: #103324;
  position: absolute;
  animation-duration: 0.5s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

.dot1, .dot2 {
  left: 0;
}

.dot3 {
  left: 1.5em;
}

.dot4 {
  left: 3em;
}

@keyframes reveal {
  from {
    transform: scale(0.001);
  }

  to {
    transform: scale(1);
  }
}

@keyframes slide {
  to {
    transform: translateX(1.5em);
  }
}

.dot1 {
  animation-name: reveal;
}

.dot2, .dot3 {
  animation-name: slide;
}

.dot4 {
  animation-name: reveal;
  animation-direction: reverse; /* thx @HugoGiraudel */
}
</style>

