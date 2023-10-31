const state = () => ({
  lineAccessToken: null,
  profile: null,
  member: false,
  firstContact: true,
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
  },
  SET_FIRST_CONTACT(state, bool) {
    state.firstContact = false
  }
};

const actions = {
  setToken({ commit }, value) {
    commit("SET_LINE_TOKEN", value);
  },
  setProfile({ commit }, value) {
    commit('SET_PROFILE', value)
  },
  setMember({ commit }, value) {
    commit('SET_MEMBER', value)
  },
  setFirstContact({ commit }) {
    commit('SET_FIRST_CONTACT')
  }
};

const getters = {
  getToken: (state) => state.lineAccessToken,
  getProfile: (state) => state.profile,
  getMember: (state) => state.member,
  getFirstContact: (state) => state.firstContact,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
