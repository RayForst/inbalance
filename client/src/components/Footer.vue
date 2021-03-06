<template lang="pug">
  footer.main
    .content-container
      .row.center-xs.middle-xs.text-start
        .col-xs-10.col-lg-12
          .row.menu
            template(v-if="mount")
              .col-xs-12.col-sm-6.col-lg-3(
                v-for="i in 4"
              )
                template(v-for="column, index in menu")
                  nav(v-if="i == column.categoryIndex")
                    h4 {{ categoryText(column) }}
                    ul
                      li(v-for="link in column.links ")
                        router-link.footer-link.ui-link(
                          :to="url(link)"
                          v-text="text(link)"
                        )              
          hr  
          .row.contacts
            .col-xs-12.col-md-12.col-lg-2.center-xs.start-lg.first-lg.middle-xs
              app-social-buttons(:colorClass="socialColor")
            .col-xs-12.col-lg-8.first-md.align-center
              app-short-contacts
            .col-xs-12.text-center.last-xs.logo-wrap
              app-logo
            .col-xs-12.col-lg-2.text-center.last-md.first-lg.align-center
              .copyright © {{ this.$store.state.settings.copyright }}{{ new Date().getFullYear() }}
</template>

<script>
import appSocialButtons from "@/components/social/SocialButtons";
import appLogo from "@/components/Logo";
import appShortContacts from "@/components/ShortContacts";
import LocaleService from "@/services/LocaleService";

export default {
  data() {
    return {
      socialColor: "gray",
      mount: false
    };
  },
  computed: {
    menu: function() {
      return this.$store.state.menu;
    }
  },
  methods: {
     url(link) {
      let route = { name: link.route.name };

      if (link.route.hasOwnProperty("slug"))
        route.params = { slug: link.route.slug };

      return route;
    },
    categoryText(menuItem) {
      return menuItem.hasOwnProperty("i18n")
        ? this.$t(menuItem.category)
        : LocaleService.toLocale(menuItem, "category", this.$i18n.locale);
    },
    text(link) {
      return link.hasOwnProperty("i18n")
        ? this.$t(link.title)
        : LocaleService.toLocale(link, "title", this.$i18n.locale);
    }
  },
  components: {
    appSocialButtons,
    appLogo,
    appShortContacts
  },
  mounted() {
    this.mount = true;
  }
};
</script>


<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

footer.main {
  background-color: $c_gray3;
  color: #fff;
  padding: 50px 0 30px;
}

.container {
  text-align: left;
}

h4 {
  font-size: 14px;
  line-height: 1.14em;
  letter-spacing: 0.18em;
  color: $c_gray4;
  text-transform: uppercase;
}

.footer-link {
  font-size: 16px;
  font-weight: 300;
  color: #4a4a4a;
  line-height: 22px;
  margin-bottom: 23px;
  display: inline-flex;
  transition: color 0.3s ease;
  max-width: 205px;

  &:hover {
    color: #000;
    font-weight: 400;
  }
}

.contact-details {
  font-size: 18px;
  font-family: 'Lora', sans-serif;
}

.copyright {
  font-size: 16px;
  font-weight: 300;
  color: #4a4a4a;
}

.logo-wrap {
  margin-top: 40px;
  margin-bottom: 40px;

  @media $media_lg {
    margin-top: 70px;
    margin-bottom: 0;
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 25px 0;
}

.menu {
  padding: 30px 0;
}

.logo {
  margin-top: 70px;
}

.contacts {
  padding: 40px 0 30px 0;
}
</style>
