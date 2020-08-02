enum ApiRequest {
  SAVE_ANAMNESE = "SAVE_ANAMNESE",
  FETCH_ANAMNESE = "FETCH_ANAMNESE",
}

enum ApiRequestStatus {
  UNSET,
  IN_PROGRESS,
  SUCCESSFUL,
  FAILED,
}

class ApiRequestStatusData {
  status: ApiRequestStatus = ApiRequestStatus.UNSET;
  error?: Error;

  setInProgress(): void {
    this.status = ApiRequestStatus.IN_PROGRESS;
    this.error = undefined;
  }
  setSuccessful(): void {
    this.status = ApiRequestStatus.SUCCESSFUL;
    this.error = undefined;
  }
  setFailed(error: Error): void {
    this.status = ApiRequestStatus.FAILED;
    this.error = error;
  }
  isInProgress(): boolean {
    return this.status === ApiRequestStatus.IN_PROGRESS;
  }
  isSuccessful(): boolean {
    return this.status === ApiRequestStatus.SUCCESSFUL;
  }
  isFailed(): boolean {
    return this.status === ApiRequestStatus.FAILED;
  }
  getError(): Error | undefined {
    return this.error;
  }
}

type ApiRequestStatusState = Record<ApiRequest, ApiRequestStatusData>;

const getInitialState = (): ApiRequestStatusState => ({
  [ApiRequest.SAVE_ANAMNESE]: new ApiRequestStatusData(),
  [ApiRequest.FETCH_ANAMNESE]: new ApiRequestStatusData(),
});

const getters = {
  isSaveAnamneseInProgress(state: ApiRequestStatusState): boolean {
    return state[ApiRequest.SAVE_ANAMNESE].isInProgress();
  },
  isSaveAnamneseSuccessful(state: ApiRequestStatusState): boolean {
    return state[ApiRequest.SAVE_ANAMNESE].isSuccessful();
  },
  isSaveAnamneseFailed(state: ApiRequestStatusState): boolean {
    return state[ApiRequest.SAVE_ANAMNESE].isFailed();
  },
  getSaveAnamneseError(state: ApiRequestStatusState): Error | undefined {
    return state[ApiRequest.SAVE_ANAMNESE].getError();
  },
  isFetchAnamneseInProgress(state: ApiRequestStatusState): boolean {
    return state[ApiRequest.FETCH_ANAMNESE].isInProgress();
  },
  isFetchAnamneseSuccessful(state: ApiRequestStatusState): boolean {
    return state[ApiRequest.FETCH_ANAMNESE].isSuccessful();
  },
  isFetchAnamneseFailed(state: ApiRequestStatusState): boolean {
    return state[ApiRequest.FETCH_ANAMNESE].isFailed();
  },
  getFetchAnamneseError(state: ApiRequestStatusState): Error | undefined {
    return state[ApiRequest.FETCH_ANAMNESE].getError();
  },
};

const mutations = {
  setSaveAnamneseInProgress(state: ApiRequestStatusState) {
    state[ApiRequest.SAVE_ANAMNESE].setInProgress();
  },
  setSaveAnamneseSuccessful(state: ApiRequestStatusState) {
    state[ApiRequest.SAVE_ANAMNESE].setSuccessful();
  },
  setSaveAnamneseFailed(state: ApiRequestStatusState, error: Error) {
    state[ApiRequest.SAVE_ANAMNESE].setFailed(error);
  },
  setFetchAnamneseInProgress(state: ApiRequestStatusState) {
    state[ApiRequest.FETCH_ANAMNESE].setInProgress();
  },
  setFetchAnamneseSuccessful(state: ApiRequestStatusState) {
    state[ApiRequest.FETCH_ANAMNESE].setSuccessful();
  },
  setFetchAnamneseFailed(state: ApiRequestStatusState, error: Error) {
    state[ApiRequest.FETCH_ANAMNESE].setFailed(error);
  },
};

export default {
  namespaced: true,
  mutations,
  getters,
  state: getInitialState,
};
