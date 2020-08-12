import Vue from 'vue';
import 'sanitize.css';
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins/element.js';
import '@/styles/index.scss'; // global css

import './permission';
import { getToken } from '@/utils/auth'; // permission control

Vue.config.productionTip = false;

async function initState(app) {
  return new Promise(function(resolve) {
    let token = getToken();
    if (token) {
      app.$store.dispatch('profile/getInfo');
    }
    resolve();
  });
}

new Vue({
  router,
  store,
  async created() {
    await initState(this).then(() => {});
  },
  render: h => h(App),
}).$mount('#app');
