import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import '@/scripts/fontLoader';
import Tabs from 'vue-tabs-component';
import SlideUpDown from 'vue-slide-up-down';
// import CKEditor from '@ckeditor/ckeditor5-vue';
import VJsoneditor from 'v-jsoneditor/src/index';
import Notifications from 'vue-notification';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import VueCkeditor from 'vue-ckeditor5';
import wysiwyg from 'vue-wysiwyg';
import store from './store';
import router from './router';
import App from './App.vue';

Vue.use(Notifications);
Vue.use(VJsoneditor);
// Vue.use(CKEditor);
// const options = {
//   editors: {
//     classic: ClassicEditor,
//   },
//   name: 'ckeditor',
// };

// Vue.use(VueCkeditor.plugin, options);
Vue.use(wysiwyg, {
  image: {
    uploadURL: 'http://localhost:3000/upload-editor',
    dropzoneOptions: {},
  },
}); // config is optional. more below

Vue.config.productionTip = false;
Vue.use(Tabs);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBiqPVo8Anjm534FSZ4-89L1H1yZxfQWvU',
    libraries: 'places',
    installComponents: true,
  },
});

Vue.component('slide-up-down', SlideUpDown);

router.beforeEach((to, from, next) => {
  // if (to.name !== 'login') {
  //   next({ name: "login" });
  // } else {
  next();
  // }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
