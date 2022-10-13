import { config } from "../configuration/config.service";

export function isCodeFlow(): boolean {
  return config.response_type.includes("code");
}
