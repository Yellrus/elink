import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

const BASE_URL_DEV = 'http://172.16.29.23:99/';
const BASE_URL_PROD = 'https://biz-api.wmkeeper.com/';

export const BASE_URL =
  process.env.NODE_ENV === 'development' ? BASE_URL_DEV : BASE_URL_PROD;

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000, // request timeout
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
    console.log('error debug', error); // for debug
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
      console.log('response.status', response.status);
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
    if (error.response.status === 401) {
      // to re-login
      MessageBox.alert(
        'Вы долго не совершали активных действий на сайте. Чтобы продолжить работу, нажмите "Авторизоваться"',
        'Сеанс прерван',
        {
          customClass: 'auth-session-dialog',
          confirmButtonText: 'Авторизоваться',
          cancelButtonClass: 'auth-cancel-button',
          type: 'warning',
          center: true,
        }
      ).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.href = `${BASE_URL}/login`;
        });
      });

      return;
    }

    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });

    return Promise.reject(error);
  }
);

export default service;
