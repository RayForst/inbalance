<template lang="pug">
 div.static
  section.hero
    div.bg-image.hero-main.bg-hero
  .contact-wrap.content-container.content
    .row
      .col-xs-12.col-lg-6
        .container
          h1 {{ $t('contacts.title') }}
          app-contact-form
      .col-xs-12.col-lg-6
        .row.container
          .col-xs-12
            .caption {{ $t('contacts.workTime') }}
          .col-xs-12
            app-short-contacts(:column="true")
          .col-xs-12
            .map-wrapper
              app-map
  app-subscribe
</template>

<script>
import appContactForm from "@/components/forms/Contact";
import appMap from "@/components/Map";
import appSubscribe from "@/components/Subscribe";
import appShortContacts from "@/components/ShortContacts";

export default {
  name: "contacts",
  metaInfo: {
    title: "Contacts"
  },
  components: {
    appContactForm,
    appMap,
    appSubscribe,
    appShortContacts
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
@import './../assets/css/_variables';

.bg-hero {
  background-image: url('./../assets/img/contact.jpg');
}

.map-wrapper .vue-map-container {
  height: 320px !important;
}

.contact-wrap {
  padding-bottom: 50px;
}

h1 {
  position: absolute;
  top: 200px;
  left: 50%;
  padding: 0 50px;
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: 36px;
  font-weight: normal;
  line-height: 1.28em;
  margin-bottom: 107px;
  transform: translateX(-50%);

  @media $media_md {
    position: initial;
    padding: 0;
    text-align: left;
    color: #000000;
    transform: none;
  }
}

.caption {
  font-size: 20px;
  font-weight: 300;
  font-style: normal;
  line-height: 1.15em;
  color: #000000;
  margin-top: 42px;
  margin-bottom: 20px;
}
</style>
