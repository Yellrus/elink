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
      <div class="nav-create-btn">
        <router-link to="/contracts/create">

          <create-btn />
        </router-link>
      </div>
      <el-dropdown
        placement="bottom-start"
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <span
            v-if="device !== 'mobile' && isLoadedProfile"
            class="avatar-name"
            >{{ profile.FirstName ? profile.FirstName : wmid }}</span
          >
          <user-avatar />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile">
            <el-dropdown-item>Профиль</el-dropdown-item>
          </router-link>
          <router-link to="/contracts/create">
            <el-dropdown-item>Создать</el-dropdown-item>
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
import UserAvatar from '../../components/UserAvatar/index';
import CreateBtn from '../../components/CreateBtn/index';

export default {
  components: {
    CreateBtn,
    UserAvatar,
    Breadcrumb,
    Hamburger,
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
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },

    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login`);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-create-btn {
  margin-right: 30px;
}
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
    -webkit-tap-highlight-color: rgba(#409eff, 0.2);

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
    display: flex;
    align-items: center;
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

          .el-icon-caret-bottom {
            transform: translateY(2px);
          }
        }
      }
    }

    .avatar-container {
      .avatar-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;
        padding-right: 30px;

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 15px;
          font-size: 12px;
          transition: transform 0.3s ease-in-out;
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
