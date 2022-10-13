import { config } from "../configuration/config.service";

export function usesOpenId(): boolean {
  return config.scope.includes("openid");
}
