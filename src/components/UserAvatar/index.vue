<template>
  <el-avatar
    :src="isLoadedProfile ? userAvatar : ''"
    alt="WebMoney login"
    :size="size"
    @error="errorHandler"
  >
    <img
      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
      alt=""
    />
  </el-avatar>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import { getUserWMAvatar } from '../../utils/profile';

export default {
  name: 'UserAvatar',
  props: {
    size: {
      type: Number,
      default: 40,
    },
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'wmid']),
    ...mapGetters({
      profile: 'profile/getProfile',
    }),
    ...mapState({
      device: state => state.app.device,
      isLoadedProfile: state => state.profile.isLoaded,
    }),

    userAvatar() {
      return getUserWMAvatar(this.wmid);
    },
  },
  methods: {
    errorHandler() {
      return true;
    },
  },
};
</script>
