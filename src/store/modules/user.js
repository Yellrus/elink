import {
  getToken,
  setToken,
  removeToken,
  getRefreshToken,
  setRefreshToken,
} from '@/utils/auth';
import { resetRouter } from '@/router';

const state = {
  token: getToken(),
  refreshToken: getRefreshToken(),
  roles: [],
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.refreshToken = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { AccessToken, RefreshToken } = userInfo;
    commit('SET_TOKEN', AccessToken);
    commit('SET_REFRESH_TOKEN', RefreshToken);
    setToken(AccessToken);
    setRefreshToken(RefreshToken);
  },

  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '');
    commit('SET_REFRESH_TOKEN', '');
    commit('SET_ROLES', []);
    removeToken();
    resetRouter();
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_REFRESH_TOKEN', '');
      commit('SET_ROLES', []);
      removeToken();
      resolve();
    });
  },
  // // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token';
  //   commit('SET_TOKEN', token);
  //   setToken(token);
  //   const { roles } = await dispatch('getInfo');
  //   resetRouter();
  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, {
  //     root: true,
  //   });
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes);
  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true });
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
