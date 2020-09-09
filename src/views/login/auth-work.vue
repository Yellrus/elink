<template>
  <div class="auth-work">
    <loading-data />
  </div>
</template>

<script>
import { param2Obj } from '@/utils/common';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';
import LoadingData from '@/components/LoadingData';
import { getRedirectPath } from '@/utils/redirectPath';

export default {
  name: 'AuthWork',
  components: { LoadingData },
  beforeCreate() {
    const redirectPath = getRedirectPath();
    if (getToken()) {
      if (!redirectPath) {
        this.$router.replace('/');
        return;
      }
      this.$router.push({
        path: redirectPath,
      });
      return;
    }
    (async () => {
      try {
        const urlData = JSON.parse(param2Obj(window.location.href).authData);

        await this.$store.dispatch('user/login', urlData);
        await this.$store.dispatch('profile/getInfo');
        await this.$store.dispatch('dictionary/getDictionary');

        let wmid = this.$store.getters.wmid;

        if (wmid) {
          if (!redirectPath) {
            this.$router.replace('/');
            return;
          }
          this.$router.push({
            path: redirectPath,
          });
        }
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
  fill: #337ab7;
  path {
    fill: #337ab7;
  }
}
.auth-work {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9fafc;
  color: #337ab7;
  flex-direction: column;
}
</style>
