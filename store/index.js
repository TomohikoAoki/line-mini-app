const state = () => ({
  lineAccessToken: "kjlkjlkjlklkjl",
  profile: null,
  member: false,
});

const mutations = {
  SET_LINE_TOKEN(state, token) {
    state.lineAccessToken = token;
  },
  SET_PROFILE(state, value) {
    state.profile = value
  },
  SET_MEMBER(state, value) {
    state.member = value
  }
};

const actions = {
  setToken({ commit }, value) {
    commit("SET_LINE_TOKEN", value);
  },
  setProfile({commit}, value) {
    commit('SET_PROFILE', value)
  },
  setMember({commit}, value) {
    commit('SET_MEMBER', value)
  }
};

const getters = {
  getToken: (state) => state.lineAccessToken,
  getProfile: (state) => state.profile,
  getMember: (state) => state.member,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
