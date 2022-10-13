import { config } from "../configuration/config.service";
import { LogUtil } from "../utils/log-util";
import { getSessionId } from "./session-id";

/**
 * Checks if a session is alive. This may be on another platform.
 * This is normally used in conjunction with a silent logout. It
 * doesn't extend the lifetime of the current session. If a
 * session is found, a logout should NOT be triggered.
 *
 * @returns The status code of the HTTP response
 */
export function isSessionAlive(): Promise<{ status: number }> {
  LogUtil.debug("Get Session Alive info from SSO");

  return new Promise<{ status: number }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(
      "GET",
      `${config.is_session_alive_endpoint}/${getSessionId()}`,
      true,
    );

    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 204) {
          resolve({ status: xhr.status });
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.send();
  });
}
