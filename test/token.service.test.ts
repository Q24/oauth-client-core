import { constants } from "./constants";
import { OidcService } from "../src/index";
import { initConfig } from "./test-utils";

// Initialise the OIDC config
initConfig();

beforeEach(() => {
  // Most tests make use of session storage. Need to clean it to avoid collisions between tests.
  sessionStorage.clear();
});

describe("deleteStoredTokens", () => {
  it("deletes all tokens", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(
      `${constants.client_id}-token`,
      JSON.stringify([constants.sampleToken1, constants.sampleToken1]),
    );

    // Verify that there are tokens in the storage.
    expect(
      window.sessionStorage.getItem(`${constants.client_id}-token`),
    ).not.toBeNull();

    // Call the delete stored tokens method.
    OidcService.deleteStoredTokens();

    // Verify that there are no tokens left in the storage.
    expect(
      window.sessionStorage.getItem(`${constants.client_id}-token`),
    ).toBeNull();
  });

  it("deletes specific tokens", () => {
    // Create a sample token in the storage
    window.sessionStorage.setItem(
      `${constants.client_id}-token`,
      JSON.stringify([
        constants.sampleToken1,
        constants.sampleToken1,
        constants.sampleToken2,
      ]),
    );

    // Verify that there are tokens in the storage.
    expect(
      window.sessionStorage.getItem(`${constants.client_id}-token`),
    ).not.toBeNull();

    // Only delete tokens which expire earlier than...
    // token 2 has an expiration of 400..., so it should be in the store
    // after this partial deletions.
    OidcService.deleteStoredTokens((token) => token.expires > 3500000000);

    // Verify that there are no tokens left in the storage.
    const parsedTokens = JSON.parse(
      window.sessionStorage.getItem(`${constants.client_id}-token`),
    );
    expect(parsedTokens.length).toBeGreaterThan(0);
  });
});

describe("getIdTokenHint", () => {
  it("gets a token without regex", () => {
    // Create a sample token in the storage
    window.sessionStorage.setItem(
      `${constants.client_id}-id-token-hint`,
      constants.sampleIdTokenHint1,
    );

    // is able to get the id token hint from storage.
    expect(OidcService.getIdTokenHint()).not.toBeNull();
  });

  it("gets a id token with regex", () => {
    // Create a sample token in the storage for a non-standard client.
    window.sessionStorage.setItem(
      `other_client-id-token-hint`,
      constants.sampleIdTokenHint1,
    );

    // is able to get the id token hint from storage.
    expect(OidcService.getIdTokenHint({ regex: true })).not.toBeNull();
  });
});

describe("getStoredToken", () => {
  it("gets a token for the global scopes", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(
      `${constants.client_id}-token`,
      JSON.stringify([constants.sampleToken1]),
    );

    // Verify that there are tokens in the storage.
    expect(OidcService.getStoredToken()).not.toBeNull;
  });

  it("gets a token for specific scopes", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(
      `${constants.client_id}-token`,
      JSON.stringify([constants.sampleToken3]),
    );

    // Verify that the normal method does not return the right scopes.
    expect(OidcService.getStoredToken()).toBeNull;

    // Verify that there are tokens in the storage.
    expect(
      OidcService.getStoredToken({
        scopes: ["custom", "other-custom"],
      }),
    ).not.toBeNull;
  });
});

describe("getStoredCsrfToken", () => {
  it("stores and retrieves csrf token", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(`_csrf`, "csrf");

    // Verify that there are tokens in the storage.
    expect(OidcService.getStoredCsrfToken()).not.toBeNull;
  });
});
