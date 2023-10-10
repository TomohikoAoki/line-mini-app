const state = () => ({
  lineToken: "token",
});

const mutations = {
  SET_LINE_TOKEN(state, token) {
    state.lineToken = token;
  },
};

const actions = {
  setToken({ commit }, value) {
    commit("SET_LINE_TOKEN", value);
  },
};

const getters = {
  getToken: (state) => state.lineToken,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
