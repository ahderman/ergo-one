import * as anamnese from "./anamnese";

export function createApiClient(apiBaseUrl: string) {
  return {
    anamnese: anamnese.createApiClient(apiBaseUrl),
  };
}

const API_BASE_URL = process.env.VUE_APP_API_URL as string;
export default createApiClient(API_BASE_URL);
