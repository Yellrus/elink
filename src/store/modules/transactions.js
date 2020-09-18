import { Message } from 'element-ui';
import { getTransactions } from '@/api/transactions';

const state = {
  transactions: [],
  transactionsCSV: [],
};

const mutations = {
  SET_TRANSACTIONS: (state, payload) => (state.transactions = payload),
  SET_TRANSACTIONS_CSV: (state, transactionsCSV) => {
    state.transactionsCSV = transactionsCSV.map(item => ({
      ...item,
      Deal: item.Deal.Id,
    }));
  },
  LOADING_CSV: (state, payload) => (state.loadingCSV = payload),
};

const actions = {
  getTransactions({ commit }, data) {
    return new Promise((resolve, reject) => {
      getTransactions(data)
        .then(response => {
          const { Items } = response;
          commit('SET_TRANSACTIONS', Items);

          resolve(response);
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

  getTransactionsCSV({ commit }, data) {
    return new Promise((resolve, reject) => {
      getTransactions(data)
        .then(response => {
          const { Items } = response;
          commit('SET_TRANSACTIONS_CSV', Items);

          resolve(response);
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
