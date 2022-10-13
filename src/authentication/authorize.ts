import { assertProviderMetadata } from '../discovery/assert-provider-metadata';
import { discoveryState } from '../discovery/discovery-state';
import { LogUtil } from '../utils/log-util';
import { timeout } from '../utils/timeout';
import { getURLParameters, toUrlParameterString, URLParams } from '../utils/url';

import type { AuthResult } from "../jwt/model/auth-result.model";

export async function authorize<
  T extends {
    [key in keyof T]: any;
  },
>(urlParameters: T): Promise<AuthResult> {
  assertProviderMetadata(discoveryState.providerMetadata);
  const urlParamsString = toUrlParameterString(urlParameters);
  window.location.href = `${discoveryState.providerMetadata.authorization_endpoint}?${urlParamsString}`;

  // Send Authorization code and code verifier to token endpoint -> server returns access token
  await timeout(20000);
  throw Error("authorize_redirect_timeout");
}

export function ensureNoErrorInParameters(): void {
  const urlParams = getURLParameters<URLParams>();
  if (urlParams["error"]) {
    // Error in authorize redirect
    LogUtil.error("Redirecting to Authorisation failed");
    LogUtil.debug(`Error in authorize redirect: ${urlParams["error"]}`);
    throw Error("redirect_failed");
  }
}
