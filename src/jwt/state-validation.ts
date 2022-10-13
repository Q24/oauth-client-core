import { LogUtil } from "../utils/log-util";
import { getState } from "../utils/state";

/**
 * checks if the state is valid. If not throws.
 *
 * @param state the state from the authentication result
 * @throws `state_invalid` if state is not the same as the saved state.
 */
export function validateState(state: string): void {
  LogUtil.debug("Validating");
  const storedState = getState();

  // We received a token from SSO, so we need to validate the state
  if (!storedState || state !== storedState) {
    LogUtil.error("Authorisation Token not valid");
    LogUtil.debug("State NOT valid");
    throw Error("state_invalid");
  }

  LogUtil.debug(
    "State from URL validated against state in session storage state",
    storedState,
  );
}
