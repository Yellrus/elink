import { getInfo, addNewPaymethod, removePaymethod } from '@/api/profile';
import { Message } from 'element-ui';
import { setLastAddedPaymethod, removeLastAddedPaymethod } from '@/utils/profile';
import { getPassportDataLink } from '@/api/profile';
import { getLastAddedPaymethod } from '../../utils/profile';

const state = {
  wmid: null,
  wmpPurses: [],
  lastAddedPaymethod: {},
  paymethods: [],
  profile: {},
  profileFullData: {},
  dialogAddPaymethod: false,
  isLoaded: false,
};

const getters = {
  getWmpPurse: state => state.paymethods.find(item => item.Paymethod === 'WebMoneyWMP' || item.Paymethod === 'WebMoneyWMPTest'),
  getProfile: state => state.profile,
  getProfileFullData: state => state.profileFullData,
  getPaymethods: state => state.paymethods.filter(item => item.Paymethod === 'Cards' || item.Paymethod === 'CardsTest')
};

const mutations = {
  SET_WMID: (state, wmid) => {
    state.wmid = wmid;
  },

  SET_PROFILE: (state, profile) => {
    state.profile = profile;
  },

  SET_FULL_DATA_PROFILE: (state, profileFullData) => {
    state.profileFullData = profileFullData;
  },

  SET_NEW_PAYMETHOD: (state, lastAddedPaymethod) => {
    state.lastAddedPaymethod = lastAddedPaymethod;
  },

  SET_PAYMETHODS: (state, payload) => {
    state.paymethods = payload;
  },

  REMOVE_PAYMETHOD: (state, id) => {
    let checkLastAddedCard = getLastAddedPaymethod();

    if (checkLastAddedCard) {
      let IdLastAddedCard = JSON.parse(getLastAddedPaymethod()).Id;
      if (IdLastAddedCard && IdLastAddedCard === id) {
        removeLastAddedPaymethod();
        state.lastAddedPaymethod = {};
      }
    }

    let idx = state.paymethods.findIndex(item => item.Id === id);
    state.paymethods.splice(idx, 1);
  },

  UPDATE_PAYMETHODS: (state, paymethod) => {
    state.paymethods.push(paymethod);
  },

  SET_WMP_PURSES: (state, payload) => {
    state.wmpPurses = payload;
  },

  SET_PROFILE_LOADED: (state, payload) => {
    state.isLoaded = payload;
  },

  TOGGLE_DIALOG_ADD_PAYMETHOD: (state, payload) => {
    state.dialogAddPaymethod = payload;
  },
};

const actions = {
  toggleDialogPaymethod({ commit }, payload) {
    commit('TOGGLE_DIALOG_ADD_PAYMETHOD', payload);
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { Profile, UserLogin, WmpPurses } = response;
          commit('SET_FULL_DATA_PROFILE', response);
          commit('SET_PROFILE', Profile);
          commit('SET_PAYMETHODS', Profile.PaymentAccounts);
          commit('SET_WMID', UserLogin);
          commit('SET_WMP_PURSES', WmpPurses);
          commit('SET_PROFILE_LOADED', true);

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

  getPassportDataLink({ commit }) {
    return new Promise((resolve, reject) => {
      getPassportDataLink()
        .then(response => {
          commit('SET_PROFILE_LOADED', true);

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

  addNewPaymethod({ commit }, payload) {
    return new Promise((resolve, reject) => {
      addNewPaymethod(payload)
        .then(card => {
          commit('UPDATE_PAYMETHODS', card);
          commit('SET_NEW_PAYMETHOD', card);
          setLastAddedPaymethod(card);
          resolve(card);
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

  removePaymethod({ commit }, id) {
    return new Promise((resolve, reject) => {
      removePaymethod(id)
        .then(card => {
          commit('REMOVE_PAYMETHOD', id);
          resolve(card);
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
  getters,
};
