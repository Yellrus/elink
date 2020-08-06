import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import 'sanitize.css';
import './plugins/element.js';
import 'nprogress/nprogress.css';
import '@/styles/index.scss'; // global css
import './plugins/HTTP.js';

import './permission'; // permission control

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
