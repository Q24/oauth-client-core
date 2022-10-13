describe("Response Type & Response Mode", () => {
  it("Can make request with `id_token` response_type", () => {});

  it("Can make request with `id_token token` response_type", () => {});
});

describe("ID Token", () => {
  it("Rejects ID Token with invalid `iss` claim", () => {});

  it("Rejects ID Token without `sub` claim", () => {});

  it("Rejects ID Token with invalid `aud` claim", () => {});

  it("Rejects ID Token without `iat` claim", () => {});

  it("Accepts ID Token without `kid` claim in JOSE header if only one JWK supplied in `jwks_uri`", () => {});

  it("Rejects ID Token without `kid` claim in JOSE header if multiple JWKs supplied in `jwks_uri` (Rejection allowed)", () => {});

  it("Rejects ID Token with incorrect `at_hash` claim when `response_type=id_token token`", () => {});

  it("Accepts ID Token with valid asymmetric `RS256` signature", () => {});

  it("Rejects ID Token with invalid asymmetric `RS256` signature", () => {});
});

describe("UserInfo Endpoint", () => {
  it("Can send Access Token in the HTTP Authorization request header", () => {});

  it("Can send Access Token as form-encoded body parameter (alternative to header)", () => {});

  it("Does not send Access Token as URI query parameter", () => {});

  it("Rejects UserInfo Response with invalid `sub` claim", () => {});
});

describe("nonce Request Parameter", () => {
  it("Sends 'nonce' unless using code flow", () => {});
  it("Rejects ID Token with invalid `nonce` when valid `nonce` sent", () => {});
});

describe("scope Request Parameter", () => {
  it("`openid` scope value should be present in the Authentication Request", () => {});
  it("Can request and use claims using scope values", () => {});
});

describe('Client Authentication', () => {
  it('Can make Access Token Request with `client_secret_basic` authentication', () => {
    
  })
})

describe('Dynamic Client Registration', () => {
  it('Uses HTTPS for all endpoints', () => {

  })
})