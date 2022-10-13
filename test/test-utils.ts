import { OidcService } from "../src/index";
import { constants } from "./constants";

export function initConfig() {
  OidcService.OidcConfigService.config = {
    client_id: constants.client_id,
    response_type: "id_token token",
    redirect_uri: "localhost",
    post_logout_redirect_uri: "post_logout_redirect_uri",
    scope: "email openid",
    csrf_token_endpoint: "csrf_token_endpoint",
    validate_token_endpoint: "validate_token_endpoint",
    is_session_alive_endpoint: "is_session_alive_endpoint",
    issuer: "",
  };
}
