<template lang="pug">
  .subscribe
    .content-container.content.vertical-container
      .row.center-xs.text-start
        .col-xs-10.col-sm-10.col-lg-12
          .spacer
          .row.middle-md.sub-container
            .col-xs-12.col-md-6
              h2 {{ $t('events.subscribe.title') }}
              p.caption {{ $t('events.subscribe.caption') }}
            .col-xs-12.col-md-12
              .spacer
              app-form
              .spacer
              .spacer
</template>

<script>
import appForm from "@/components/forms/SeminarSubscribe";

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
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  margin: 0;
  margin-bottom: 10px;
}

.caption {
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.56;
  letter-spacing: normal;
  color: #7e8f97;
  margin-top: 0;
}
</style>
