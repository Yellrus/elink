import { Message } from 'element-ui';
import {
  createContract,
  getContracts,
  getContract,
  getContractExtended,
  closeContract,
  createTemplateContract,
} from '@/api/contract';

const state = {
  deal: {},
  contracts: [],
  contractsCSV: [],
  contract: {},
  contractDetail: {},
  loadingCSV: false,
};

const mutations = {
  SET_DEAL: (state, deal) => {
    state.deal = deal;
  },

  SET_CONTRACTS: (state, contracts) => {
    state.contracts = contracts;
  },

  SET_CONTRACTS_CSV: (state, contractsCSV) => {
    state.contractsCSV = contractsCSV;
  },

  SET_CONTRACT: (state, contract) => {
    state.contract = contract;
  },

  SET_CONTRACT_DETAIL: (state, contract) => {
    state.contract = contract;
  },

  LOADING_CSV: (state, payload) => (state.loadingCSV = payload),
};

const actions = {
  createContract({ commit }, data) {
    return new Promise((resolve, reject) => {
      createContract(data)
        .then(response => {
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

  // eslint-disable-next-line no-unused-vars
  createTemplate({ commit }, data) {
    return new Promise((resolve, reject) => {
      createTemplateContract(data)
        .then(response => {
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

  // eslint-disable-next-line no-unused-vars
  contractClose({ commit }, data) {
    return new Promise((resolve, reject) => {
      closeContract(data)
        .then(resp => {
          resolve(resp);
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

  getContractsCSV({ commit }, data) {
    commit('LOADING_CSV', true);
    return new Promise((resolve, reject) => {
      getContracts(data)
        .then(response => {
          const { Items } = response;
          commit('SET_CONTRACTS_CSV', Items);
          commit('LOADING_CSV', false);

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
