import { getInfo } from '@/api/profile';

const initialState = {
  payments: [
    {
      Currency: 'RUB',
      Guid: 'AB3C22E6-493E-45C8-A20D-226B7A6CF066',
      Id: 4125,
      Paymethod: 'Cards',
      Purse: '5470 70XX XXXX 8041',
    },
    {
      Currency: 'RUB',
      Guid: 'AB3C22E6-493E-45C8-A20D-226B7A6CF066',
      Id: 4122,
      Paymethod: 'Cards',
      Purse: '5470 70XX XXXX 4444',
    },
    {
      Currency: 'BTC',
      Guid: '464D8660-432A-44E4-A2F7-305A7AB3324B',
      Id: 4333,
      Paymethod: 'WebMoney',
      Purse: 'X684427353810',
    },
    {
      Currency: 'RUB',
      Guid: '464D8660-432A-44E4-A2F7-305A7AB3324B',
      Id: 4337,
      Paymethod: 'WebMoney',
      Purse: 'R684427353814',
    },
  ],
};

const state = {
  wmid: null,
  profile: null,
  payments: initialState.payments,
  dialogAddPaymethod: false,
  isLoaded: false,
};

const getters = {
  getPayMethodsOfType: state => type =>
    state.payments.filter(x => x.Paymethod === type),
};

const mutations = {
  SET_WMID: (state, wmid) => {
    state.wmid = wmid;
  },

  SET_PROFILE: (state, profile) => {
    state.profile = profile;
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

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { Profile, UserLogin } = response;
          commit('SET_PROFILE', Profile);
          commit('SET_WMID', UserLogin);
          commit('SET_PROFILE_LOADED', true);

          resolve(response);
        })
        .catch(error => {
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
