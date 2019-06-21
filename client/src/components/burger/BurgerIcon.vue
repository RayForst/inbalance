<template lang="pug">
  a.burger__button#burger-button(@click="toggle" v-bind:class="{ open: visible }")
    span.burger__button__icon
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    toggle() {
      document.body.classList.toggle("open")
      this.visible = !this.visible
    },
    close() {
      window.addEventListener('resize', function() {
        document.body.classList.remove("open")
        this.visible = false
      });
    }
  },
  mounted() {
    this.close()
  }
}
</script>

<style lang="stylus">
@import './../../assets/css/_variables'

.burger__button
  display: block
  position: relative
  width: 40px
  height: 40px
  border-radius: 50%
  text-align: center
  vertical-align: middle
  transition: all 0.5s ease
  z-index: 20

  @media $media_lg
    display none

  &.open 
    background: $c_primary

    .burger__button__icon 
      background: transparent

      &:before,
      &:after
        transform-origin: 0 50%
        width: 23.78570999570961px

      &:before 
        transform: rotateZ(0.7378150601204649rad)
      &:after 
        transform: rotateZ(-0.7378150601204649rad)
      
    & + .burger__menu li
      transform: translateX(0)
      visibility: visible
      transition: all 0.5s ease

    .burger__button__icon,
    .burger__button__icon:before,
    .burger__button__icon:after
          background: #fff

  &__icon
    display: inline-block
    position: absolute
    background: #000
    margin: 0 auto
    width: 17.6px
    height: 2px
    top: 50%
    left: 0
    right: 0
    transition: all 0.5s ease
    transform: translateY(-1px)

    &:before,
    &:after
      content: ""
      position: absolute
      margin: 0 auto
      background: #000
      width: 17.6px
      height: 2px
      left: 0
      right: 0
      transition: all 0.5s ease

    &:before
      bottom: 8px
    
    &:after
      top: 8px
</style>
