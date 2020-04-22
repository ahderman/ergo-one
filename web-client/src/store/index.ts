import Vue from "vue";
import Vuex, { Store } from "vuex";

import authentication from "./authentication/authentication";

Vue.use(Vuex);

export function createStore(): Store<void> {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: { authentication },
  });
}
