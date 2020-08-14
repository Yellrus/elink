import { Message } from 'element-ui';
import { createDeal } from '@/api/deals';

const state = {
  deal: {},
  deals: [],
};

const mutations = {
  // SET_DEAL: (state, profile) => {
  //   state.profile = profile;
  // },
};

const actions = {
  createDeal() {
    return new Promise((resolve, reject) => {
      createDeal()
        .then(response => {
          console.log('response CreateDeal', response);
          //commit('SET_DEAL', Profile);

          resolve(response);
        })
        .catch(error => {
          Message({
            message: error.Description || 'Error',
            type: 'error',
            duration: 3 * 1000,
          });
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  //getters,
};
