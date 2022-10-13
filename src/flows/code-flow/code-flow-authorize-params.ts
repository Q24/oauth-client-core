import { config } from "../../configuration/config.service";
import { usesOpenId } from "../../open-id/uses-openid";
import { generateNonce, saveNonce } from "../../utils/nonce";
import { generateState, saveState } from "../../utils/state";
import { createCodeChallenge } from "./code-challenge";
import { storeAndGetNewCodeVerifier } from "./code-verifier";
import {cleanCode} from "../../utils/url";

import type { OAuthCodeFlowAuthorizeParameters } from "./model/authorization-request.model";

export function createCodeFlowAuthorizeRequestParameters(): OAuthCodeFlowAuthorizeParameters {
  const state = generateState();
  saveState(state);

  // Create code verifier
  const code_verifier = storeAndGetNewCodeVerifier();
  // Encode code verifier to get code challenge
  const code_challenge = createCodeChallenge(code_verifier);

  const oAuthCodeFlowAuthorizeParameters: OAuthCodeFlowAuthorizeParameters = {
    client_id: config.client_id,
    response_type: "code",
    state,
    code_challenge: code_challenge,
    code_challenge_method: "S256",
  };

  if (usesOpenId()) {
    const nonce = generateNonce();
    saveNonce(nonce);
    oAuthCodeFlowAuthorizeParameters.nonce = nonce;
  }

  if (config.redirect_uri) {
    oAuthCodeFlowAuthorizeParameters.redirect_uri = cleanCode(config.redirect_uri);
  }
  if (config.scope) {
    oAuthCodeFlowAuthorizeParameters.scope = config.scope;
  }

  return oAuthCodeFlowAuthorizeParameters;
}
