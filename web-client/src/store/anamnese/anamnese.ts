import Vue from "vue";
import { Anamnese } from "@/types";
import apiClient from "@/services/api-client";

class AnamneseState {
  document: Anamnese = {};
}

class FieldNameAndValue {
  name = "";
  value = "";
}

const getInitialState = () => new AnamneseState();

const getters = {
  getDocument(state: AnamneseState): Anamnese {
    return state.document;
  },
};

const mutations = {
  setField(state: AnamneseState, { name, value }: FieldNameAndValue) {
    Vue.set(state.document, name, value);
  },
  setDocument(state: AnamneseState, document: Anamnese) {
    Vue.set(state, "document", document);
  },
};

const actions = {
  setField({ commit, getters }: any, fieldNameAndValue: FieldNameAndValue) {
    commit("setField", fieldNameAndValue);
    commit("apiRequestStatus/setSaveAnamneseInProgress", null, { root: true });

    apiClient.anamnese.throttledSave(
      getters.getDocument,
      () => {
        commit("apiRequestStatus/setSaveAnamneseSuccessful", null, {
          root: true,
        });
      },
      (error) => {
        commit("apiRequestStatus/setSaveAnamneseFailed", error, { root: true });
      }
    );
  },
  async fetchAnamnese({ commit }: any) {
    commit("apiRequestStatus/setFetchAnamneseInProgress", null, { root: true });

    try {
      const document = await apiClient.anamnese.fetch();
      commit("setDocument", document);

      commit("apiRequestStatus/setFetchAnamneseSuccessful", null, {
        root: true,
      });
    } catch (error) {
      commit("apiRequestStatus/setFetchAnamneseFailed", error, { root: true });
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
