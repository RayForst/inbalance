<template lang="pug">
  .row.center-xs  
    .col-xs-10.col-lg-12
      a.back(@click.prevent="goBack" href="/")
        img(
          :src="require('@/assets/img/arrow.svg')"
        )
        | {{ $t('back') }}
</template>

<script>
export default {
  name: "back-link",
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.back {
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1.1px;
  text-transform: uppercase;
  color: #7e8f97;
  font-family: 'Lora', sans-serif;
  display: flex;
  padding-top: 5px;
  padding-bottom: 20px;
  transition: opacity 0.3s ease;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }

  img {
    margin-right: 17px;
  }
}
</style>

