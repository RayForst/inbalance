<template lang="pug">
  .content.blue-bg.flex_col
    .content-container.admin-page
      app-sidebar
      app-header(:name="'Products'" :icon="'nc-app'")
      .card-container
        .row
          .col-xs-12
            .card
              .row
                .col-xs-12
                  i.nc-icon.nc-air-baloon
                  i.nc-icon.nc-album-2
                  i.nc-icon.nc-alien-33
                  i.nc-icon.nc-align-center
                  i.nc-icon.nc-align-left-2
                  i.nc-icon.nc-ambulance
                  i.nc-icon.nc-android
                  i.nc-icon.nc-app
                  i.nc-icon.nc-apple
                  i.nc-icon.nc-atom
                  i.nc-icon.nc-attach-87
                  i.nc-icon.nc-audio-92
                  i.nc-icon.nc-backpack
                  i.nc-icon.nc-badge
                  i.nc-icon.nc-bag
                  i.nc-icon.nc-bank
                  i.nc-icon.nc-battery-81
                  i.nc-icon.nc-bell-55
                  i.nc-icon.nc-bold
                  i.nc-icon.nc-bulb-63
                  i.nc-icon.nc-bullet-list-67
                  i.nc-icon.nc-bus-front-12
                  i.nc-icon.nc-button-pause
                  i.nc-icon.nc-button-play
                  i.nc-icon.nc-button-power
                  i.nc-icon.nc-camera-20
                  i.nc-icon.nc-caps-small
                  i.nc-icon.nc-cart-simple
                  i.nc-icon.nc-cctv
                  i.nc-icon.nc-chart-bar-32
                  i.nc-icon.nc-chart-pie-35
                  i.nc-icon.nc-chart-pie-36
                  i.nc-icon.nc-chart
                  i.nc-icon.nc-chat-round
                  i.nc-icon.nc-check-2
                  i.nc-icon.nc-circle-09
                  i.nc-icon.nc-circle
                  i.nc-icon.nc-cloud-download-93
                  i.nc-icon.nc-cloud-upload-94
                  i.nc-icon.nc-compass-05
                  i.nc-icon.nc-controller-modern
                  i.nc-icon.nc-credit-card
                  i.nc-icon.nc-delivery-fast
                  i.nc-icon.nc-email-83
                  i.nc-icon.nc-email-85
                  i.nc-icon.nc-explore-2
                  i.nc-icon.nc-fav-remove
                  i.nc-icon.nc-favourite-28
                  i.nc-icon.nc-globe-2
                  i.nc-icon.nc-grid-45
                  i.nc-icon.nc-headphones-2
                  i.nc-icon.nc-html5
                  i.nc-icon.nc-istanbul
                  i.nc-icon.nc-key-25
                  i.nc-icon.nc-layers-3
                  i.nc-icon.nc-light-3
                  i.nc-icon.nc-lock-circle-open
                  i.nc-icon.nc-map-big
                  i.nc-icon.nc-mobile
                  i.nc-icon.nc-money-coins
                  i.nc-icon.nc-note-03
                  i.nc-icon.nc-notes
                  i.nc-icon.nc-notification-70
                  i.nc-icon.nc-palette
                  i.nc-icon.nc-paper-2
                  i.nc-icon.nc-pin-3
                  i.nc-icon.nc-planet
                  i.nc-icon.nc-preferences-circle-rotate
                  i.nc-icon.nc-puzzle-10
                  i.nc-icon.nc-quote
                  i.nc-icon.nc-refresh-02
                  i.nc-icon.nc-ruler-pencil
                  i.nc-icon.nc-satisfied
                  i.nc-icon.nc-scissors
                  i.nc-icon.nc-send
                  i.nc-icon.nc-settings-90
                  i.nc-icon.nc-settings-gear-64
                  i.nc-icon.nc-settings-tool-66
                  i.nc-icon.nc-simple-add
                  i.nc-icon.nc-simple-delete
                  i.nc-icon.nc-simple-remove
                  i.nc-icon.nc-single-02
                  i.nc-icon.nc-single-copy-04
                  i.nc-icon.nc-spaceship
                  i.nc-icon.nc-square-pin
                  i.nc-icon.nc-stre-down
                  i.nc-icon.nc-stre-left
                  i.nc-icon.nc-stre-right
                  i.nc-icon.nc-stre-up
                  i.nc-icon.nc-sun-fog-29
                  i.nc-icon.nc-support-17
                  i.nc-icon.nc-tablet-2
                  i.nc-icon.nc-tag-content
                  i.nc-icon.nc-tap-01
                  i.nc-icon.nc-time-alarm
                  i.nc-icon.nc-tv-2
                  i.nc-icon.nc-umbrella-13
                  i.nc-icon.nc-vector
                  i.nc-icon.nc-watch-time
                  i.nc-icon.nc-zoom-split
</template>

<script>
export default {
  metaInfo: {
    title: "Icons"
  },
  name: "icons",
  data() {
    return {
      show: false
    };
  },
  components: {
    appSidebar: () => import("@/components/Sidebar/Index"),
    appHeader: () => import("@/components/Header/Index")
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/_variables';

.nc-icon {
  font-size: 40px;
  padding: 10px;
}
</style>
