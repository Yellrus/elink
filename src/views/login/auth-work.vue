<template>
  <div class="auth-work">
    Auth request...
    <svg
      id="L2"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enable-background="new 0 0 100 100"
      xml:space="preserve"
    >
      <circle
        fill="none"
        stroke="#fff"
        stroke-width="4"
        stroke-miterlimit="10"
        cx="50"
        cy="50"
        r="48"
      />
      <line
        fill="none"
        stroke-linecap="round"
        stroke="#fff"
        stroke-width="4"
        stroke-miterlimit="10"
        x1="50"
        y1="50"
        x2="85"
        y2="50.5"
      >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </line>
      <line
        fill="none"
        stroke-linecap="round"
        stroke="#fff"
        stroke-width="4"
        stroke-miterlimit="10"
        x1="50"
        y1="50"
        x2="49.5"
        y2="74"
      >
        <animateTransform
          attributeName="transform"
          dur="15s"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  </div>
</template>

<script>
import { param2Obj } from '@/utils/common';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';

export default {
  name: 'AuthWork',

  beforeCreate() {
    if (getToken()) {
      this.$router.replace('/');
      return;
    }
    (async () => {
      try {
        let urlData = JSON.parse(param2Obj(window.location.href).authData);
        await this.$store.dispatch('user/login', urlData);
        await this.$store.dispatch('profile/getInfo');

        let wmid = this.$store.getters.wmid;
        wmid && this.$router.replace('/');
      } catch (err) {
        Message({
          message: err || 'Error',
          type: 'error',
          duration: 5 * 1000,
        });
        this.$router.replace('/login');
      }
    })();
  },
};
</script>

<style lang="scss" scoped>
svg {
  width: 100px;
  height: 100px;
  margin: 20px;
  display: inline-block;
  fill: #fff;
}
.auth-work {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #97a8be;
  color: #fff;
  flex-direction: column;
}
</style>
