import { isAuthResult } from '../../authentication/auth-result';
import { LogUtil } from '../../utils/log-util';
import { StorageUtil } from '../../utils/storage';
import { getHashParameters, parseQueryParameters } from '../../utils/url';

import type { AuthResult } from "../../jwt/model/auth-result.model";

export function getAuthResultFromUrl(): AuthResult | null {
  const authResultFromUrl = getHashParameters<Partial<AuthResult>>();

  if (!isAuthResult(authResultFromUrl)) {
    LogUtil.error("");
    return null;
  }
  return authResultFromUrl;
}

export function getAuthResultFromStoredHash(): AuthResult | null {
  const hashString = getStoredHashString();
  if (!hashString) {
    return null;
  }
  return parseQueryParameters<AuthResult>(hashString);
}

export function getStoredHashString(): string | null {
  return StorageUtil.read("hash_fragment");
}

export function deleteStoredHashString(): void {
  StorageUtil.remove("hash_fragment");
}
