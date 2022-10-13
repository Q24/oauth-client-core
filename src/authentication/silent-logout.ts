import { config } from "../configuration/config.service";
import { getCsrfResult } from "../csrf/csrf";
import { LogUtil } from "../utils/log-util";
import { getIdTokenHint } from "../open-id/id-token-hint";
import { destroyIframe } from "../utils/iframe";

interface SilentLogoutConfig {
  logout_url: string;
  post_logout_redirect_uri: string;
}

const silentLogoutStore: {
  [iFrameId: string]: Promise<void>;
} = {};

/**
 * Allows you to initiate a logout of the session in the background via an
 * iframe.
 *
 * This logout will not redirect the top-level window to the logged-out page.
 * It is important that the result of the returning Promise is used to take
 * an action (e.g. do a redirect to the logout page).
 *
 * The logout was successful if the iframe ended up on the configured
 * `post_logout_redirect_uri`.
 *
 * @param url A URL pointing to a *page*.
 * This *page* should make a POST request to the logout endpoint of the SSO server
 * in an automated fashion, which will cause the user to be logged out.
 * The `id_token_hint` and `csrf_token` will be supplied to the *page* via this
 * function. Defaults to `silent_logout_uri` from the config.
 * @returns The promise resolves if the logout was successful, otherwise it will reject.
 */
export function silentLogout(
  silentLogoutConfig?: SilentLogoutConfig,
): Promise<void> {
  const logout_url = silentLogoutConfig?.logout_url || config.silent_logout_uri;
  const post_logout_redirect_uri =
    silentLogoutConfig?.post_logout_redirect_uri ||
    config.post_logout_redirect_uri;

  if (!logout_url || !post_logout_redirect_uri) {
    LogUtil.error(
      "the logout URL or post logout redirect URL must be defined",
      "logout_url",
      logout_url,
      "post_logout_redirect_uri",
      post_logout_redirect_uri,
    );
    throw Error("logout_url or post_logout_redirect_uri undefined");
  }

  LogUtil.debug("Silent logout by URL started");
  const iframeId = `silentLogoutIframe`;

  // Checks if there is a concurrent silent logout call going on.
  if (silentLogoutStore[iframeId]) {
    return silentLogoutStore[iframeId];
  }

  const silentLogoutPromise = new Promise<void>((resolve, reject) => {
    // Create an iFrame
    const iFrame = getLogoutIFrame();

    // Store CSRF token of the new session to storage. We'll need it for logout and authenticate
    (async () => {
      let iframeUrl = `${logout_url}?id_token_hint=${getIdTokenHint()}`;
      if (config.csrf_token_endpoint) {
        try {
          const csrfResult = await getCsrfResult();
          iframeUrl += `&csrf_token=${csrfResult.csrf_token}`;
        } catch (error) {
          LogUtil.debug("no CsrfToken");
          reject("no_csrf_token");
        }
      }

      LogUtil.debug(`Do silent logout with URL`, iframeUrl);
      iFrame.src = iframeUrl;
    })();

    // Handle the result of the Authorize Redirect in the iFrame
    iFrame.onload = () => {
      LogUtil.debug("silent logout iFrame onload triggered", iFrame);

      let timeout = 5000;
      const interval = 50;

      const intervalTimer = setInterval(() => {
        timeout = timeout - interval;

        if (timeout <= 0) {
          LogUtil.debug(
            "Silent logout failed after 5000",
            iFrame.contentWindow?.location.href,
            post_logout_redirect_uri,
          );

          clearInterval(intervalTimer);
          destroyIframe(iFrame);
          reject("timeout");
          return;
        }

        const currentIframeURL = iFrame.contentWindow!.location.href;
        if (currentIframeURL.indexOf(post_logout_redirect_uri) === 0) {
          LogUtil.debug(
            "Silent logout successful",
            iFrame.contentWindow!.location.href,
            post_logout_redirect_uri,
          );

          clearInterval(intervalTimer);
          destroyIframe(iFrame);
          resolve();
        }
      }, interval);
    };
  }).finally(() => {
    if (silentLogoutStore[iframeId]) {
      delete silentLogoutStore[iframeId];
    }
  });
  // Sets the silent logout promise so concurrent calls to this function will
  // use the same promise.
  silentLogoutStore[iframeId] = silentLogoutPromise;

  return silentLogoutPromise;
}

/**
 * Create a logout frame and append it to the DOM
 * @returns {HTMLIFrameElement}
 */
function getLogoutIFrame(): HTMLIFrameElement {
  /**
   * IFrame element
   * @type {HTMLIFrameElement}
   */
  const iFrame: HTMLIFrameElement = document.createElement("iframe");
  /**
   * Set the iFrame  Id
   * @type {string}
   */
  iFrame.id = "silentLogoutIframe";
  /**
   * Hide the iFrame
   * @type {string}
   */
  iFrame.style.display = "none";

  /**
   * Append the iFrame, get a CsrfToken and set the source if the iFrame to the logout URL,
   * and add the id token hint as a query param, because we don't want to create a full new session tab,
   * to reduce unneeded load on SSO
   * For older FireFox and IE versions first append the iFrame and then set its source attribute.
   */
  window.document.body.appendChild(iFrame);

  return iFrame;
}
