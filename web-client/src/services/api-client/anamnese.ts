import superagent from "superagent";
import { throttle } from "throttle-debounce";
import urlJoin from "url-join";

import { Anamnese } from "@/types";

const THROTTLE_DELAY = 5000;
type onSuccessCallback = (response: superagent.Response) => void;
type onErrorCallback = (reason: any) => void;

export function createApiClient(apiBaseUrl: string) {
  async function fetch(): Promise<Anamnese> {
    const response = await superagent
      .get(urlJoin(apiBaseUrl, "/anamnese"))
      .withCredentials();

    return response.body.document;
  }

  async function save(
    document: Anamnese,
    onSuccess?: onSuccessCallback,
    onError?: onErrorCallback
  ): Promise<void> {
    console.log("saving anamnese", document);

    try {
      const response = await superagent
        .put(urlJoin(apiBaseUrl, "/anamnese"))
        .withCredentials()
        .send({ document });

      if (onSuccess) {
        onSuccess(response);
      }
    } catch (err) {
      if (onError) {
        onError(err);
      } else {
        throw err;
      }
    }
  }

  const throttledSave = throttle(THROTTLE_DELAY, save);

  return { fetch, throttledSave };
}
