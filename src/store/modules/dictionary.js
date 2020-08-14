import { Message } from 'element-ui';
import { getDictionary } from '@/api/dictionary';

const state = {
  dictionaryLoaded: false,
  categories: [],
};

const mutations = {
  DICTIONARY_LOADED(state, payload) {
    state.dictionaryLoaded = payload;
  },
  DICTIONARY_SUCCESS(state, { data }) {
    const { categories } = data;
    state.categories = categories;
  },
};

const actions = {
  getDictionary({ commit }) {
    return new Promise((resolve, reject) => {
      getDictionary()
        .then(response => {
          commit('DICTIONARY_SUCCESS', {
            data: {
              categories: response,
            },
          });
          commit('DICTIONARY_LOADED', true);

          resolve(response);
        })
        .catch(error => {
          Message({
            message: error.Description || 'Error dictionary',
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
  // getters,
};
