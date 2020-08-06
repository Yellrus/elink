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
  payments: initialState.payments,
};

const getters = {
  getPayMethodsOfType: state => type =>
    state.payments.filter(x => x.Paymethod === type),
  // getPayMethod: (state, getters) => id =>
  //   getters.getPayments && getters.getPayments.find(x => x.Id === id),
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_WMID: (state, wmid) => {
    state.wmid = wmid;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
