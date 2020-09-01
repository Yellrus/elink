import Vue from 'vue';
import 'sanitize.css';
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins/element.js';
import '@/styles/index.scss'; // global css
import './plugins/dayjs';
import VueSocialSharing from 'vue-social-sharing';

Vue.use(VueSocialSharing);

import { hello } from '@/mixins/common';
import './permission';
import { getToken } from '@/utils/auth'; // permission control
import * as filters from './filters'; // global filters

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

async function initState(app) {
  return new Promise(function(resolve) {
    let token = getToken();

    if (token) {
      app.$store.dispatch('profile/getInfo');
      app.$store.dispatch('dictionary/getDictionary');
    }
    resolve();
  });
}

new Vue({
  mixins: [hello],
  router,
  store,
  async created() {
    await initState(this).then(() => {});
  },
  render: h => h(App),
}).$mount('#app');
