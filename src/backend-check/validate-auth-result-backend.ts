import { config } from "../configuration/config.service";
import { LogUtil } from "../utils/log-util";
import { getNonce } from "../utils/nonce";
import { saveSessionId } from "./session-id";

import type { AuthResult } from "../jwt/model/auth-result.model";

export interface ValidSession {
  /**
   * User Session ID is a response given from the token validation call
   * and used to trigger session related calls through backend (i.e. kill all sessions)
   */
  user_session_id: string;
}

interface ValidateTokenRequest {
  nonce: string;
  id_token: string;
  access_token?: string;
}

/**
 * Posts the received token to the Backend for decryption and validation
 */
export async function validateAuthResultBackend(
  authResult: AuthResult,
): Promise<void> {
  if (!config.validate_token_endpoint) {
    return;
  }
  const nonce = getNonce();
  if (!nonce) {
    throw new Error("Nonce not found in local storage.");
  }
  const data: ValidateTokenRequest = {
    nonce,
    id_token: authResult.id_token,
  };

  // Access token is optional
  if (authResult.access_token) {
    data.access_token = authResult.access_token;
  }

  LogUtil.debug("Validate token with TokenValidation Endpoint");

  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (!config.validate_token_endpoint) {
      throw new Error("Token Validation endpoint must be defined");
    }

    xhr.open("POST", config.validate_token_endpoint, true);

    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const validationResult: ValidSession = JSON.parse(xhr.responseText);
          saveSessionId(validationResult.user_session_id);
          LogUtil.debug("Token validated by backend", validationResult);

          resolve();
        } else {
          LogUtil.error("Authorisation Token not valid");
          LogUtil.debug("Token NOT validated by backend", xhr.statusText);
          reject("token_invalid_backend");
        }
      }
    };
    xhr.send(JSON.stringify(data));
  });
}
