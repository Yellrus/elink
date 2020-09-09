import { Message } from 'element-ui';
import { getTransactions } from '@/api/transactions';

const state = {
  transactions: [],
};

const mutations = {
  SET_TRANSACTIONS: (state, payload) => (state.transactions = payload),
};

const actions = {
  getTransactions({ commit }, data) {
    return new Promise((resolve, reject) => {
      getTransactions(data)
        .then(transactions => {
          commit('SET_TRANSACTIONS', transactions);

          resolve(transactions);
        })
        .catch(error => {
          Message({
            message: error.Description || error.Error || 'Error Transactions',
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
};
