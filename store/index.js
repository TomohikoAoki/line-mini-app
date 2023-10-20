const state = () => ({
  lineAccessToken: "token",
  profile: null,
  memberId: null,
});

const mutations = {
  SET_LINE_TOKEN(state, token) {
    state.lineAccessToken = token;
  },
  SET_PROFILE(state, value) {
    state.profile = value
  },
  SET_MEMBER_ID(state, value) {
    state.memberId = value
  }
};

const actions = {
  setToken({ commit }, value) {
    commit("SET_LINE_TOKEN", value);
  },
  setProfile({commit}, value) {
    commit('SET_PROFILE', value)
  },
  setMemberId({commit}, value) {
    commit('SET_MEMBER_ID', value)
  }
};

const getters = {
  getToken: (state) => state.lineAccessToken,
  getProfile: (state) => state.profile,
  getMemberId: (state) => state.memberId,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
