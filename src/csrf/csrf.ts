import { config } from "../configuration/config.service";
import { LogUtil } from "../utils/log-util";
import { StorageUtil } from "../utils/storage";

import type { CsrfResult } from "./csrf.model";

/**
 * Deletes the stored CSRF Token from storage
 */
export function deleteStoredCsrfToken(): void {
  LogUtil.debug(`Removed CSRF Token from session storage`);
  StorageUtil.remove("_csrf");
}

/**
 * Gets the stored CSRF Token from storage
 */
export function getStoredCsrfToken(): string | null {
  LogUtil.debug(`Get CSRF Token from session storage`);
  return StorageUtil.read("_csrf");
}

/**
 * Stores the CSRF token in session storage
 */
export function storeCsrfToken(token: string): void {
  LogUtil.debug(`Storing the CSRF Token in the session storage`);
  StorageUtil.store("_csrf", token);
}

/**
 * Get a CSRF Token from the authorization server
 */
export function getCsrfResult(): Promise<CsrfResult> {
  LogUtil.debug("Get CSRF token from Authorisation");

  return new Promise<CsrfResult>((resolve, reject) => {
    if (!config.csrf_token_endpoint) {
      reject("csrf token endpoint not defined");
      return;
    }
    const xhr = new XMLHttpRequest();

    xhr.open("POST", config.csrf_token_endpoint, true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const csrfResult = JSON.parse(xhr.responseText) as CsrfResult;
          resolve(csrfResult);
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.send();
  });
}
