<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <span
            v-if="device !== 'mobile' && isLoadedProfile"
            class="avatar-name"
            >{{ profile.FirstName ? profile.FirstName : wmid }}</span
          >
          <el-avatar
            :src="isLoadedProfile ? userAvatar : ''"
            alt="WebMoney login"
            :size="40"
            @error="errorHandler"
          >
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>Профиль</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>Главная</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Выйти</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import { getUserWMAvatar } from '../../utils/profile';

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  computed: {
    ...mapGetters(['sidebar', 'device', 'wmid']),
    ...mapState({
      device: state => state.app.device,
      isLoadedProfile: state => state.profile.isLoaded,
      profile: state => state.profile,
    }),

    userAvatar() {
      return getUserWMAvatar(this.wmid);
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    errorHandler() {
      return true;
    },
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 1;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
      .avatar-name {
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
}
</style>
