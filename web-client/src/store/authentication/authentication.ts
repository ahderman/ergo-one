import superagent from "superagent";
import urlJoin from "url-join";

const API_BASE_URL = process.env.VUE_APP_API_URL as string;

console.log("VUE_APP_API_URL", API_BASE_URL);

enum ResponseCode {
  OK = 200,
  Forbidden = 403,
}

class AuthenticationState {
  mustLogin = false;
}

const getInitialState = () => new AuthenticationState();

const getters = {
  mustLogin(state: AuthenticationState): boolean {
    return state.mustLogin;
  },
};

const mutations = {
  setMustLogin(state: AuthenticationState, val: boolean) {
    state.mustLogin = val;
  },
};

const actions = {
  async authenticate({ commit }: any) {
    try {
      await superagent.get(urlJoin(API_BASE_URL, "/authenticate"));
      commit("setMustLogin", false);
    } catch (err) {
      if (err.status === ResponseCode.Forbidden) {
        commit("setMustLogin", true);
      } else {
        console.error(err);
      }
    }
  },
};

export default {
  namespaced: true,
  actions,
  mutations,
  getters,
  state: getInitialState,
};
