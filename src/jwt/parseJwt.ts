import { LogUtil } from '../utils/log-util';

import type { JWT } from "./model/jwt.model";
import type { IdTokenPayload } from "./model/id-token.model";
import type { AccessTokenPayload } from "./model/access-token.model";

function decodeJwtPart(jwtPart: string) {
  const base64 = jwtPart.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

/**
 * transforms an JWT string (e.g. from an access token) to a
 * JWT object.
 *
 * @param token A JWT token string
 * @returns JSON Web Token
 */
export function parseJwt<T = AccessTokenPayload>(token: string): JWT<T> {
  const parts = token.split(".");
  if (parts.length < 3) {
    LogUtil.error("token is not a jwt token", token);
    throw new Error("token is not a JWT token");
  }

  const header = parts[0];
  const payload = parts[1];
  const verifySignature = parts[2];

  return {
    header: decodeJwtPart(header),
    payload: decodeJwtPart(payload),
    verifySignature,
  };
}

export const parseIdToken = (token: string): JWT<IdTokenPayload> =>
  parseJwt<IdTokenPayload>(token);
