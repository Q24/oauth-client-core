import { LogUtil } from "../../utils/log-util";
import { getState } from "../../utils/state";
import { getSearchParameters } from "../../utils/url";

import type { OAuthCodeFlowAuthorizeResponse } from "./model/authorization-response.model";

export function getCodeFromUrl(): string | null {
  const oAuthCodeFlowAuthorizeResponse =
    getSearchParameters<OAuthCodeFlowAuthorizeResponse>();

  LogUtil.debug(
    "comparing state from response to state from request",
    "response",
    oAuthCodeFlowAuthorizeResponse,
  );

  const requestState = getState();

  if (oAuthCodeFlowAuthorizeResponse.state !== requestState) {
    LogUtil.warn(
      "State from response was not the same as the state from the request",
      "response state",
      oAuthCodeFlowAuthorizeResponse.state,
      "request state",
      requestState,
    );
    return null;
  }

  LogUtil.debug("state is the same; returning the code");

  return oAuthCodeFlowAuthorizeResponse.code;
}
