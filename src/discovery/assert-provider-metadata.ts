import type { OpenIDProviderMetadata } from "./model/openid-provider-metadata.model";

export function assertProviderMetadata(
  providerMetadata?: OpenIDProviderMetadata,
): asserts providerMetadata {
  if (!providerMetadata) {
    throw Error("Provider metadata must be defined");
  }
}
