<template lang="pug">
  #hamburger.hamburglar.is-close(@click="burgerTime" ref="trigger")
    .burger-icon
      .burger-container
        .burger-bun-top
        .burger-filling
        .burger-bun-bot
      
    .burger-ring
      svg.svg-ring
        path.path(fill="none", stroke="#103324", stroke-miterlimit="10", stroke-width="4", d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2")
      svg(width="0", height="0")
        mask#mask
        path(xmlns="http://www.w3.org/2000/svg", fill="none", stroke="#ff0000", stroke-miterlimit="10", stroke-width="4", d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4")

    .path-burger
      .animate-path
        .path-rotation
</template>

<script>
import EventBus from "@/event-bus";

export default {
  data() {
    return {
      visible: false,
      isClosed: false
    };
  },
  watch: {
    $route(to, from) {
      this.closeBurger();
    }
  },
  methods: {
    toggle() {},
    close() {
      let that = this;

      window.addEventListener("resize", function() {
        that.closeBurger();
      });
    },
    burgerTime() {
      if (this.isClosed == true) {
        this.closeBurger();
      } else {
        this.openBurger();
      }
    },
    closeBurger() {
      this.visible = false;
      document.body.classList.remove("open");
      this.$refs.trigger.classList.remove("is-open");
      this.$refs.trigger.classList.add("is-closed");
      this.isClosed = false;
    },
    openBurger() {
      this.visible = true;
      document.body.classList.add("open");
      this.$refs.trigger.classList.remove("is-closed");
      this.$refs.trigger.classList.add("is-open");
      this.isClosed = true;
    }
  },
  mounted() {
    this.close();
  }
};
</script>

<style lang="stylus">
$color = #103324;
$blue = #44f;
$animation = 0.6s;
$scale = 0.5;

#hamburger {
  box-sizing: border-box;

  *, *::before, *::after {
    box-sizing: border-box;
  }
}

@import '~@/assets/css/_variables';

.hamburglar {
  cursor: pointer;
  display: block;
  height: 68px;
  position: relative;
  -webkit-touch-callout: none;
  transform: scale($scale);
  user-select: none;
  width: 68px;
  position: absolute;
  top: -70px;

  @media $media_lg {
    display: none;
  }
}

// transition mask
.path-burger {
  height: 68px;
  left: 0;
  -webkit-mask-box-image: url('https://raygun.io/upload/mask.svg'); // raygun.io/upload/mask.svg);
  mask: url('#mask');
  position: absolute;
  top: 0;
  width: 68px;
}

.animate-path {
  height: 68px;
  left: 0;
  position: absolute;
  top: 0;
  width: 68px;
}

// what this does is create a small square that I then rotate behind an svg mask, giving the apparence of the line animating
.path-rotation {
  height: 34px;
  width: 34px;
  margin: 34px 34px 0 0;
  transform: rotate(0deg);
  transform-origin: 100% 0;

  &::before {
    content: '';
    display: block;
    width: 30px;
    height: 34px;
    margin: 0 4px 0 0;
    background: $color;
  }
}

// box rotation animation
@keyframes rotate-out {
  0% {
    transform: rotate(0deg);
  }

  40% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-in {
  0% {
    transform: rotate(360deg);
  }

  40% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.hamburglar.is-open {
  .path {
    animation: dash-in $animation linear normal;
    animation-fill-mode: forwards;
  }

  .animate-path {
    animation: rotate-in $animation linear normal;
    animation-fill-mode: forwards;
  }

  & + .burger__menu li {
    transform: translateX(0);
    visibility: visible;
    transition: all 0.5s ease;
  }
}

.hamburglar.is-closed {
  .path {
    animation: dash-out $animation linear normal;
    animation-fill-mode: forwards;
  }

  .animate-path {
    animation: rotate-out $animation linear normal;
    animation-fill-mode: forwards;
  }
}

.path {
  stroke-dasharray: 240;
  stroke-dashoffset: 240;
  stroke-linejoin: round;
}

@keyframes dash-in {
  0% {
    stroke-dashoffset: 240;
  }

  40% {
    stroke-dashoffset: 240;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes dash-out {
  0% {
    stroke-dashoffset: 0;
  }

  40% {
    stroke-dashoffset: 240;
  }

  100% {
    stroke-dashoffset: 240;
  }
}

// All good burgers need filling!
.burger {
  &-icon {
    position: absolute;
    padding: 20px 16px;
    height: 68px;
    width: 68px;
  }

  &-container {
    position: relative;
    height: 28px;
    width: 36px;
  }

  &-bun-top, &-bun-bot, &-filling {
    position: absolute;
    display: block;
    height: 4px;
    width: 36px;
    border-radius: 2px;
    background: $color;
  }

  &-bun-top {
    top: 0;
    transform-origin: 34px 2px;
  }

  &-bun-bot {
    bottom: 0;
    transform-origin: 34px 2px;
  }

  // .burger-filling {
  // @include transition(all,($animation/2.5),ease-in-//out);
  // }
  // relative parent is the button
  &-filling {
    top: 12px;
  }

  // burger ring container
  &-ring {
    position: absolute;
    top: 0;
    left: 0;
    width: 68px;
    height: 68px;
  }
}

.svg-ring {
  width: 68px;
  height: 68px;
}

// bun animations
.hamburglar.is-open {
  .burger-bun-top {
    animation: bun-top-out $animation linear normal;
    animation-fill-mode: forwards;
  }

  .burger-bun-bot {
    animation: bun-bot-out $animation linear normal;
    animation-fill-mode: forwards;
  }
}

.hamburglar.is-closed {
  .burger-bun-top {
    animation: bun-top-in $animation linear normal;
    animation-fill-mode: forwards;
  }

  .burger-bun-bot {
    animation: bun-bot-in $animation linear normal;
    animation-fill-mode: forwards;
  }
}

@keyframes bun-top-out {
  0% {
    left: 0;
    top: 0;
    transform: rotate(0deg);
  }

  20% {
    left: 0;
    top: 0;
    transform: rotate(15deg);
  }

  80% {
    left: -5px;
    top: 0;
    transform: rotate(-60deg);
  }

  100% {
    left: -5px;
    top: 1px;
    transform: rotate(-45deg);
  }
}

@keyframes bun-bot-out {
  0% {
    left: 0;
    transform: rotate(0deg);
  }

  20% {
    left: 0;
    transform: rotate(-15deg);
  }

  80% {
    left: -5px;
    transform: rotate(60deg);
  }

  100% {
    left: -5px;
    transform: rotate(45deg);
  }
}

@keyframes bun-top-in {
  0% {
    left: -5px;
    bottom: 0;
    transform: rotate(-45deg);
  }

  20% {
    left: -5px;
    bottom: 0;
    transform: rotate(-60deg);
  }

  80% {
    left: 0;
    bottom: 0;
    transform: rotate(15deg);
  }

  100% {
    left: 0;
    bottom: 1px;
    transform: rotate(0deg);
  }
}

@keyframes bun-bot-in {
  0% {
    left: -5px;
    transform: rotate(45deg);
  }

  20% {
    left: -5px;
    bottom: 0;
    transform: rotate(60deg);
  }

  80% {
    left: 0;
    bottom: 0;
    transform: rotate(-15deg);
  }

  100% {
    left: 0;
    transform: rotate(0deg);
  }
}

// burger filling
.hamburglar.is-open {
  .burger-filling {
    animation: burger-fill-out $animation linear normal;
    animation-fill-mode: forwards;
  }
}

.hamburglar.is-closed {
  .burger-filling {
    animation: burger-fill-in $animation linear normal;
    animation-fill-mode: forwards;
  }
}

@keyframes burger-fill-in {
  0% {
    width: 0;
    left: 36px;
  }

  40% {
    width: 0;
    left: 40px;
  }

  80% {
    width: 36px;
    left: -6px;
  }

  100% {
    width: 36px;
    left: 0px;
  }
}

@keyframes burger-fill-out {
  0% {
    width: 36px;
    left: 0px;
  }

  20% {
    width: 42px;
    left: -6px;
  }

  40% {
    width: 0;
    left: 40px;
  }

  100% {
    width: 0;
    left: 36px;
  }
}
</style>
