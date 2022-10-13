import type {AuthResult} from "../../jwt/model/auth-result.model";

export interface AuthResultFilter {
  (authResult: Readonly<AuthResult>): boolean;
}
