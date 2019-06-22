import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Tabs from 'vue-tabs-component';
import SlideUpDown from 'vue-slide-up-down';
import Lightbox from 'vue-easy-lightbox';
import i18n from './i18n';
import store from './store';
import router from './router';
import App from './App.vue';
import '@/scripts/fontLoader';

Vue.config.productionTip = false;

Vue.use(Lightbox);
Vue.use(Tabs);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBiqPVo8Anjm534FSZ4-89L1H1yZxfQWvU',
    libraries: 'places',
    installComponents: true,
  },
});

Vue.component('slide-up-down', SlideUpDown);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
