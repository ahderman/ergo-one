import superagent from "superagent";
import urlJoin from "url-join";

const API_BASE_URL = process.env.VUE_APP_API_URL as string;

console.log("VUE_APP_API_URL", API_BASE_URL);

enum ResponseCode {
  OK = 200,
  Forbidden = 403,
}

enum IsAuthenticated {
  UNINITIALIZED,
  INITIALIZED_AND_UNAUTHENTICATED,
  INITIALIZED_AND_AUTHENTICATED,
}

export class Credentials {
  username?: string;
  password?: string;
}

class AuthenticationState {
  isAuthenticated = IsAuthenticated.UNINITIALIZED;
}

const getInitialState = () => new AuthenticationState();

const getters = {
  mustLogin(state: AuthenticationState): boolean {
    return (
      state.isAuthenticated === IsAuthenticated.INITIALIZED_AND_UNAUTHENTICATED
    );
  },
  isAuthenticated(state: AuthenticationState): boolean {
    return (
      state.isAuthenticated === IsAuthenticated.INITIALIZED_AND_AUTHENTICATED
    );
  },
};

const mutations = {
  setIsAuthenticated(state: AuthenticationState, val: IsAuthenticated) {
    state.isAuthenticated = val;
  },
};

const actions = {
  async login({ commit }: any, credentials: Credentials) {
    try {
      await superagent
        .post(urlJoin(API_BASE_URL, "/login"))
        .withCredentials()
        .send(credentials);
      commit(
        "setIsAuthenticated",
        IsAuthenticated.INITIALIZED_AND_AUTHENTICATED
      );
    } catch (err) {
      if (err.status === ResponseCode.Forbidden) {
        commit(
          "setIsAuthenticated",
          IsAuthenticated.INITIALIZED_AND_UNAUTHENTICATED
        );
      } else {
        console.error(
          "Failed to login",
          { message: err.message, status: err.status },
          err
        );
      }
    }
  },
  async logout({ commit }: any) {
    try {
      await superagent
        .post(urlJoin(API_BASE_URL, "/logout"))
        .withCredentials()
        .ok(
          (res) =>
            res.status === ResponseCode.OK ||
            res.status === ResponseCode.Forbidden
        );
      commit(
        "setIsAuthenticated",
        IsAuthenticated.INITIALIZED_AND_UNAUTHENTICATED
      );
    } catch (err) {
      console.error(
        "Failed to logout",
        { message: err.message, status: err.status },
        err
      );
    }
  },
  async authenticate({ commit }: any) {
    try {
      await superagent
        .get(urlJoin(API_BASE_URL, "/authenticate"))
        .withCredentials();
      commit(
        "setIsAuthenticated",
        IsAuthenticated.INITIALIZED_AND_AUTHENTICATED
      );
    } catch (err) {
      if (err.status === ResponseCode.Forbidden) {
        commit(
          "setIsAuthenticated",
          IsAuthenticated.INITIALIZED_AND_UNAUTHENTICATED
        );
      } else {
        console.error(
          "Failed to authenticate",
          { message: err.message, status: err.status },
          err
        );
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
