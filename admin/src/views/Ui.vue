<template>
  <div class="parallax">
    test
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="stylus" scoped>
@import './../assets/css/_variables'
$scroll-factor = .5

h1
  font-size 32px
  line-height 1.29em
  font-weight: normal
  color: #ffffff
  margin-bottom 40px

  @media $media_lg
    font-size 36px

.content
  z-index 0

.bg-hero
  position relative

.parallax
  background-image: url('./../assets/img/banner2.jpg');
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index -1
  transform-origin center
  transform translateZ(-1px) scale(2)
  transform-style preserve-3d

.image-wrap
  box-shadow: -1px 13px 20px 0 rgba(197, 197, 197, 0.31)
  display: flex

  &:before
    content: ''
    display: block;
    padding-top: 100%;
    background:#fff;

p
  font-size: 24px;
  font-weight: 300;
  line-height: 1.83em
  color: #000000;

  &.gray
    color: #7e8f97

</style>
