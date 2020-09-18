import { Message } from 'element-ui';
import { getTemplates, deleteTemplate } from '@/api/templates';

const state = {
  templates: [],
};

const mutations = {
  SET_TEMPLATES: (state, templates) => {
    state.templates = templates;
  },

  DELETE_TEMPLATE: (state, id) => {
    const idx = state.templates.findIndex(item => item.Id === id);

    state.templates.splice(idx, 1);
  },
};

const actions = {
  getTemplates({ commit }, data) {
    return new Promise((resolve, reject) => {
      getTemplates(data)
        .then(response => {
          //const { Items } = response;
          commit('SET_TEMPLATES', response);

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

  deleteTemplate({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteTemplate(id)
        .then(response => {
          commit('DELETE_TEMPLATE', id);
          Message({
            message: 'Шаблон успешно удалён!',
            type: 'success',
            duration: 3 * 1000,
          });

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
};
