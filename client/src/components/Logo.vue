<template lang="pug">
  a(href="/")
    .logo-xs
      img(:src="require('../assets/img/logo-green-small.svg')" alt="")
    .logo-md
      img(:src="require('../assets/img/logo-tablet.svg')" alt="")
    .logo-lg
      img(:src="require('../assets/img/logo-footer.svg')" alt="")
</template>

<script>
export default {
  props: ["logo"]
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.logo {
  height: 35px;
  width: 32px;
  display: inline-flex;
  opacity: 0.7;
  color: #fff;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  text-decoration: none;

  @media $media_md {
    height: 35px;
    width: 140px;
  }

  @media $media_lg {
    height: 80px;
    width: 140px;
    margin-top: 25px;
  }
}

.logo-xs {
  &:active {
    transition: all 0.4s ease;
    transform: translateY(3px);
  }

  @media $media_md {
    display: none;
  }
}

.logo-md {
  display: none;

  @media $media_md {
    display: inline-flex;
  }

  @media $media_lg {
    display: none;
  }
}

.logo-lg {
  display: none;

  @media $media_lg {
    display: inline-flex;
    height: 80px;
  }
}
</style>