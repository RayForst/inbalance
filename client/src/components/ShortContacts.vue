<template lang="pug">
  .contact-details
    template(v-if="column")
      .row.column-view
        .col-xs-12
          a.contact-item(
            taget="_blank"
            :href="`https://www.google.com/maps/place/${encodeURIComponent(address)}`"
          )
            .icon-wrap
              img.icon(:src="require('../assets/img/location-footer.svg')" alt="")
            | {{ address }}
        .col-xs-12
          a.contact-item(
            :href="'tel:+371'+phone.replace(/ /g, '')"
          )
            .icon-wrap
              img.icon(:src="require('../assets/img/phone-footer.svg')" alt="")
            | {{ phone }}
        .col-xs-12
          a.contact-item(
            :href="`mailto:${mail}`"
          )
            .icon-wrap
              img.icon(:src="require('../assets/img/mail-footer.svg')" alt="")
            | {{ mail }}
    template(v-else)
      a.contact-item(
        taget="_blank"
        :href="`https://www.google.com/maps/place/${encodeURIComponent(address)}`"
      )
        .icon-wrap 
          img.icon(:src="require('../assets/img/location-footer.svg')" alt="")
        | {{ address }}
      a.contact-item(
        :href="'tel:+371'+phone.replace(/ /g, '')"
      )
        .icon-wrap
          img.icon(:src="require('../assets/img/phone-footer.svg')" alt="")
        | {{ phone }}
      a.contact-item(
        :href="`mailto:${mail}`"
      )
        .icon-wrap
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
      phone: this.$store.state.settings.phone,
      mail: this.$store.state.settings.email,
      address: this.$store.state.settings.address
    };
  }
};
</script>

<style lang="stylus" soped>
@import '~@/assets/css/_variables';

.column-view {
  color: #7e8f97;
  padding-bottom: 15px;
  width: 100%;

  .contact-item {
    margin-bottom: 45px;

    @media $media_lg {
      margin-bottom: 0;
      padding: 7px 0;
    }
  }
}

.contact-details {
  display: flex;
  flex-direction: column;

  @media $media_md {
    flex-direction: row;
    justify-content: center;
  }
}

.icon-wrap {
  width: 40px;
}

.contact-item {
  font-size: 20px;
  font-family: 'Lora', sans-serif;
  display: inline-flex;
  color: #858585;
  text-decoration: none;

  &:first-child {
    border: none;
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }

  @media $media_lg {
    font-size: 18px;
  }
}

.icon {
  margin-right: 15px;
}
</style>

