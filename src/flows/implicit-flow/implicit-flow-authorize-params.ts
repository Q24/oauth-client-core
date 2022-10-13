import { config } from "../../configuration/config.service";
import { LogUtil } from "../../utils/log-util";
import { generateNonce, getNonce, saveNonce } from "../../utils/nonce";
import { generateState, getState, saveState } from "../../utils/state";

import type { OpenIdImplicitAuthorizationParameters } from "./model/implicit-request-parameters.model";

/**
 * Gather the URL params for Authorize redirect method
 *
 * @param scopes the scopes to authorise for.
 * @param promptNone If true, the user will not be asked to
 * authorise this app. If no authentication is required,
 * the user will not be asked with any configuration.
 * @returns the parameters to use for an authorise request
 */
export function createImplicitFlowAuthorizeRequestParameters(
  scopes: string[],
  promptNone = false,
): OpenIdImplicitAuthorizationParameters {
  const storedState = getState() || generateState();
  const authorizeParams: OpenIdImplicitAuthorizationParameters = {
    nonce: getNonce() || generateNonce(),
    state: storedState,
    client_id: config.client_id,
    response_type:
      config.response_type as OpenIdImplicitAuthorizationParameters["response_type"],
    redirect_uri:
      promptNone && config.silent_refresh_uri
        ? config.silent_refresh_uri
        : config.redirect_uri,
    scope: scopes.join(" "),
  };

  if (config.login_hint) {
    authorizeParams.login_hint = config.login_hint;
  }

  if (promptNone) {
    authorizeParams.prompt = "none";
  }

  // Save the generated discoveryState & nonce
  saveState(storedState);
  saveNonce(authorizeParams.nonce);

  LogUtil.debug("Gather the Authorize Params", authorizeParams);
  return authorizeParams;
}
