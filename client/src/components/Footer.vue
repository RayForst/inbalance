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
                        a.footer-link.ui-link(href="#") {{ text(link) }}               
          hr  
          .row.contacts
            .col-xs-12.col-md-12.col-lg-2.center-xs.start-lg.first-lg.middle-xs
              app-social-buttons(:colorClass="socialColor")
            .col-xs-12.col-lg-8.first-md.align-center
              app-short-contacts
            .col-xs-12.text-center.last-xs
              app-logo
            .col-xs-12.col-lg-2.text-center.last-md.first-lg.align-center
              .copyright © inbalans, 2015-2019
</template>

<script>
import appSocialButtons from "@/components/social/SocialButtons";
import appLogo from "@/components/Logo";
import appShortContacts from "@/components/ShortContacts";

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
    categoryText(menuItem) {
      return menuItem.hasOwnProperty("i18n")
        ? this.$t(menuItem.category)
        : menuItem.category;
    },
    text(link) {
      return link.hasOwnProperty("i18n") ? this.$t(link.title) : link.title;
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
@import './../assets/css/_variables';

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
