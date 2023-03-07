import { LogUtil } from "./log-util";
import { isCodeFlow } from "./is-code-flow";

/**
 * Flush state param
 */
export interface URLParams {
  /**
   * Flush state param
   */
  flush_state?: boolean;
}

export function getURLParameters<T>(): T {
  return {
    ...getHashParameters<T>(),
    ...getSearchParameters<T>(),
  };
}

export function getHashParameters<T>(): T {
  return parseQueryParameters(window.location.hash);
}

export function getSearchParameters<T>(): T {
  const urlFromSessionStorage = sessionStorage.getItem('codeFlowUrl');
  let url: string = window.location.search;
  
  if (urlFromSessionStorage) {
    url = urlFromSessionStorage;
    sessionStorage.removeItem('codeFlowUrl');
  }

  return parseQueryParameters(url);
}

export function parseQueryParameters<T>(queryParametersString: string): T {
  let queryParametersArray;
  const firstSubstring = queryParametersString.substring(0, 1);
  if (firstSubstring === "#" || firstSubstring === "?") {
    queryParametersArray = queryParametersString.substring(1).split("&");
  } else {
    queryParametersArray = queryParametersString.split("&");
  }

  const argsParsed = {} as T;
  queryParametersArray.forEach((queryParameterString: string) => {
    if (-1 === queryParameterString.indexOf("=")) {
      argsParsed[decodeURIComponent(queryParameterString).trim()] = true;
    } else {
      const [key, value] = queryParameterString
        .split("=")
        .map((keyOrValue) => decodeURIComponent(keyOrValue).trim());

      argsParsed[key] = value;
    }
  });

  return argsParsed;
}

/**
 * Convert Object to URL Query string
 * @param urlParameters
 * @returns the url parameters
 */
export function toUrlParameterString<
  T extends {
    [key in keyof T]: any;
  },
>(urlParameters: T): string {
  if (urlParameters["redirect_uri"]) {
    urlParameters["redirect_uri"] = cleanHashFragment(
      urlParameters["redirect_uri"],
    );
  }
  const params = [];
  for (const urlVar of Object.keys(urlParameters)) {
    params.push(`${urlVar}=${urlParameters[urlVar]}`);
  }
  return params.join("&");
}

/**
 * Based on a URL containing a hash fragment, gets a new URL without this fragment.
 *
 * Useful if the URL contains a hash fragment which should be stripped. URL could contain
 * an *access_token* when a user uses the *BACK* button in the browser.
 *
 * @param url the URL containing the hash fragment
 * @returns the URL without the hash fragment
 */
export function cleanHashFragment(url: string): string {
  return url.split("#")[0];
}

export function cleanCode(url: string): string {
  const cleanedUrl = new URL(url);
  cleanedUrl.searchParams.delete("code");
  cleanedUrl.searchParams.delete("state");
  LogUtil.debug("Cleaning Code parameter from URL", url, cleanedUrl);
  return cleanedUrl.href;
}

export function cleanUrl(): void {
  let cleanedUrl = window.location.href;
  if (isCodeFlow()) {
    cleanedUrl = cleanCode(cleanedUrl);
  } else {
    cleanedUrl = cleanHashFragment(cleanedUrl);
  }
  LogUtil.debug("ReplaceState history with", cleanedUrl);
  window.history.replaceState({}, document.title, cleanedUrl);
}
