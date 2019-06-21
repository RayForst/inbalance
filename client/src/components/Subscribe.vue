<template lang="pug">
  .subscribe
    .content-container.content.vertical-container
      .row.center-xs.text-start
        .col-xs-10.col-sm-10.col-lg-12
          .row.middle-md.sub-container
            .col-xs-12.col-md-6
              h2 Узнавайте первыми
              p.caption Место единения души и тела, оазис спокойного благоденствия посреди стремительных будней
            .col-xs-12.col-md-6
              app-form
</template>

<script>
import appForm from "@/components/forms/Subscribe";

export default {
  name: "subscribe",
  data() {
    return {};
  },
  components: {
    appForm
  }
};
</script>

<style lang="stylus" scoped>
.subscribe {
  border-top: 1px solid rgba(#324148, 0.2);
}

h2 {
  font-size: 32px;
  margin: 0;
  margin-bottom: 10px;
}

p {
  font-size: 20px;
  font-weight: 300;
  margin: 0;
  line-height: 1.6em;
  color: #4a4a4a;
}

.caption {
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  letter-spacing: normal;
  color: #7e8f97;
  padding-right: 30px;
}

.sub-container {
  padding: 25px 0 50px 0;
}
</style>
