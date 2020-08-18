import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

export const BASE_URL = 'http://172.16.29.168:99/';

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      config.headers['Authorization'] = 'Bearer ' + getToken();
    }

    return config;
  },
  error => {
    // do something with request error
    console.log('123123', error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response.status !== 200) {
      Message({
        message: response.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (response.code === 401) {
      //   // to re-login
      //   MessageBox.confirm(
      //     'Вы вышли из системы, вы можете отменить, чтобы остаться на этой странице, или войти снова',
      //     'Подтверждение выхода',
      //     {
      //       confirmButtonText: 'Перезайти',
      //       cancelButtonText: 'Отмена',
      //       type: 'warning',
      //     }
      //   ).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload();
      //     });
      //   });
      // }
      return Promise.reject(new Error(response.message || 'Error'));
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);

export default service;
