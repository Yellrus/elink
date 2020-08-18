import { Message } from 'element-ui';
import {
  createDeal,
  getContracts,
  getContract,
  getContractExtended,
} from '@/api/deals';

const state = {
  deal: {},
  contracts: [],
  contract: {},
  contractDetail: {},
};

const mutations = {
  SET_DEAL: (state, deal) => {
    state.deal = deal;
  },

  SET_CONTRACTS: (state, contracts) => {
    state.contracts = contracts;
  },

  SET_CONTRACT: (state, contract) => {
    state.contract = contract;
  },

  SET_CONTRACT_DETAIL: (state, contract) => {
    state.contract = contract;
  },
};

const actions = {
  createDeal({ commit }, data) {
    return new Promise((resolve, reject) => {
      createDeal(data)
        .then(response => {
          console.log('response CreateDeal', response);
          commit('SET_DEAL', 'true');

          resolve(response);
        })
        .catch(error => {
          Message({
            message: error.Description || error.Error || 'Error',
            type: 'error',
            duration: 3 * 1000,
          });
          reject(error);
        });
    });
  },

  getContracts({ commit }, data) {
    return new Promise((resolve, reject) => {
      getContracts(data)
        .then(response => {
          const { Items } = response;
          commit('SET_CONTRACTS', Items);

          resolve(response);
        })
        .catch(error => {
          Message({
            message: error.Description || error.Error || 'Error',
            type: 'error',
            duration: 3 * 1000,
          });
          reject(error);
        });
    });
  },

  getContract({ commit }, data) {
    return new Promise((resolve, reject) => {
      getContract(data)
        .then(contract => {
          console.log('response contract detail', contract);
          commit('SET_CONTRACT_DETAIL', contract);

          resolve(contract);
        })
        .catch(error => {
          Message({
            message: error.Description || error.Error || 'Error',
            type: 'error',
            duration: 3 * 1000,
          });
          reject(error);
        });
    });
  },

  getContractDetail({ commit }, data) {
    return new Promise((resolve, reject) => {
      getContractExtended(data)
        .then(contract => {
          console.log('response contract', contract);
          commit('SET_CONTRACT', contract);

          resolve(contract);
        })
        .catch(error => {
          Message({
            message: error.Description || error.Error || 'Error',
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
