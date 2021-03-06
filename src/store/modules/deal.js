import { Message } from 'element-ui';
import {
  getDeals,
  getDeal,
  getDealDetails,
  createClaim,
  getByDisputeDeal,
  getDealsStatus,
  dealCancel,
} from '@/api/deals';

const state = {
  deals: [],
  dealsCSV: [],
  deal: {},
  dealDetail: {},
  disputeDeal: {},
  statuses: {},
  loadingCSV: false,
};

const mutations = {
  SET_DEAL: (state, deal) => {
    state.deal = deal;
  },

  SET_DEAL_DETAIL: (state, dealDetail) => {
    state.deal = dealDetail;
  },

  SET_DEALS: (state, deals) => {
    state.deals = deals;
  },

  SET_DEALS_CSV: (state, dealsCSV) => {
    state.dealsCSV = dealsCSV.map(item => ({
      ...item,
      Contract: item.Contract.Name,
    }));
  },

  SET_STATUSES: (state, statuses) => {
    state.statuses = statuses;
  },

  SET_DISPUTE_DEAL: (state, disputeDeal) => {
    state.disputeDeal = disputeDeal;
  },

  LOADING_CSV: (state, payload) => (state.loadingCSV = payload),
};

const actions = {
  getDeals({ commit }, data) {
    return new Promise((resolve, reject) => {
      getDeals(data)
        .then(response => {
          const { Items } = response;
          commit('SET_DEALS', Items);

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

  getDealsCSV({ commit }, data) {
    commit('LOADING_CSV', true);
    return new Promise((resolve, reject) => {
      getDeals(data)
        .then(response => {
          const { Items } = response;
          commit('SET_DEALS_CSV', Items);
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

  getDeal({ commit }, data) {
    return new Promise((resolve, reject) => {
      getDeal(data)
        .then(deal => {
          commit('SET_DEAL', deal);

          resolve(deal);
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
  dealCancel({ commit }, id) {
    return new Promise((resolve, reject) => {
      dealCancel(id)
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

  getDealsStatus({ commit }, data) {
    return new Promise((resolve, reject) => {
      getDealsStatus(data)
        .then(statuses => {
          commit('SET_STATUSES', statuses);

          resolve(statuses);
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

  getDealDetail({ commit }, id) {
    return new Promise((resolve, reject) => {
      getDealDetails(id)
        .then(dealDetail => {
          commit('SET_DEAL_DETAIL', dealDetail);

          resolve(dealDetail);
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
  getByDisputeDeal({ commit }, data) {
    return new Promise((resolve, reject) => {
      getByDisputeDeal(data)
        .then(disputeDeal => {
          commit('SET_DISPUTE_DEAL', disputeDeal);
          resolve(disputeDeal);
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
  createClaim({ commit }, data) {
    return new Promise((resolve, reject) => {
      createClaim(data)
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  //getters,
};
