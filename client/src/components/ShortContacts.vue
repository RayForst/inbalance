<template lang="pug">
  .contact-details
    template(v-if="column")
      .row.column-view
        .col-xs-12
          .contact-item
            .icon-wrap
              img.icon(:src="require('../assets/img/location-footer.svg')" alt="")
            | {{ address }}
        .col-xs-12
          .contact-item
            .icon-wrap
              img.icon(:src="require('../assets/img/phone-footer.svg')" alt="")
            | {{ phone }}
        .col-xs-12
          .contact-item
            .icon-wrap
              img.icon(:src="require('../assets/img/mail-footer.svg')" alt="")
            | {{ mail }}
    template(v-else)
      span.contact-item
        img.icon(:src="require('../assets/img/location-footer.svg')" alt="")
        | {{ address }}
      span.contact-item
        img.icon(:src="require('../assets/img/phone-footer.svg')" alt="")
        | {{ phone }}
      span.contact-item
        img.icon(:src="require('../assets/img/mail-footer.svg')" alt="")
        | {{ mail }}
</template>


<script>
import appLogo from "@/components/Logo";
import appLanguage from "@/components/Language";
import appSocialButtons from "@/components/social/SocialButtons";
import appDropdown from "@/components/dropdown/vue-dropdown";

export default {
  props: ["column"],
  name: "short-contacts",
  data() {
    return {
      phone: "22 18 21 88",
      mail: "hello@inbalans.lv",
      address: "Marijas iela 13 k-4"
    };
  }
};
</script>

<style lang="stylus" soped>
@import './../assets/css/_variables';

.column-view {
  color: #7e8f97;
  padding-bottom: 15px;

  .contact-item {
    padding: 7px 0;
  }
}

.contact-details {
  display: flex;
  flex-direction: column;

  @media $media_sm {
    flex-direction: row;
    justify-content: center;
  }
}

.icon-wrap {
  width: 40px;
}

.contact-item {
  padding: 0 25px;
  border-left: 1px solid rgba(#7e8f97, 0.2);
  font-size: 18px;
  font-family: 'Lora', sans-serif;
  display: inline-flex;
  color: #858585;

  &:first-child {
    border: none;
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}

.icon {
  margin-right: 15px;
}
</style>

