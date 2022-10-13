import type { OAuthClientConfig } from "./model/config.model";

export let config: OAuthClientConfig = {} as OAuthClientConfig;

export function configure(
  configuration:
    | ((configuration: OAuthClientConfig) => OAuthClientConfig)
    | OAuthClientConfig,
): void {
  if (typeof configuration === "function") {
    config = configuration(config);
  } else {
    config = configuration;
  }
}
