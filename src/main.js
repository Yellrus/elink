import Vue from 'vue';
import 'sanitize.css';
import App from './App.vue';
import store from './store';
import router from './router';
import './plugins/element.js';
import '@/styles/index.scss'; // global css

import './permission'; // permission control

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
