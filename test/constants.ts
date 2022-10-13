const client_id = "client_id";

// scopes: email, openid
const sampleAccessToken1 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWItMjIiLCJhenAiOiJjbGllbnRfaWQiLCJzY29wZSI6WyJlbWFpbCIsIm9wZW5pZCJdLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDozMDAxL3Nzby8iLCJleHAiOjE2MjA2NDA1NDAsImlhdCI6MTYyMDYzNjQ2OSwianRpIjoidW5pcXVlLWlkZW50aWZpZXIifQ.Y7OxB_swdCYoE46wITaNsAldA9wdtBTUUWsvRTD7t5s";
const sampleIdTokenHint1 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWItMjIiLCJraWQiOiJyc2ExIiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6MzAwMS9zc28vIiwibGFzdF9sb2dpbl9kYXRlIjoiMTYyMDY0MDMyNDAwMCIsIm5vbmNlIjoiR2RyQlU5d0FXMXQ5b25TZUVWVHRoOVBmSiIsImF1ZCI6ImNsaWVudF9pZCIsInVzZXJfaWQiOiJ1c2VyIiwiYXV0aF90aW1lIjoxNjIwNjMzMTI0LCJ1c2VyX3Nlc3Npb25faWQiOiJiZTVkMjI0NS02OWNhLTQ5YjctYjM4Zi03YTExNzFlY2I0MzkiLCJleHAiOjE2MjA2NDEwNzgsImlhdCI6MTYyMDYzNjQ2OSwianRpIjoiYjVkYzg4ZTktZmYzZC00NGZjLWIwZTktMTg4YzlkN2E5OWE5In0.zssxSQNJDQMgXvoXdB_xsqIvByoObmGSBT1J4eH_m70";
const sampleToken1 = {
  access_token: sampleAccessToken1,
  token_type: "Bearer",
  state: "811-153040-260226-069566-923228-005",
  expires_in: "599",
  id_token: sampleIdTokenHint1,
  expires: 3000000000,
};

const sampleToken2 = {
  access_token: sampleAccessToken1,
  token_type: "Bearer",
  state: "811-153040-260226-069566-923228-005",
  expires_in: "599",
  id_token: sampleIdTokenHint1,
  expires: 4000000000,
};

// scopes: custom, other-custom
const sampleAccessToken2 =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWItMjIiLCJhenAiOiJjbGllbnRfaWQiLCJzY29wZSI6WyJlbWFpbCIsIm9wZW5pZCJdLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDozMDAxL3Nzby8iLCJleHAiOjE2MjA2NDA1NDAsImlhdCI6MTYyMDYzNjQ2OSwianRpIjoidW5pcXVlLWlkZW50aWZpZXIifQ.Y7OxB_swdCYoE46wITaNsAldA9wdtBTUUWsvRTD7t5s";

const sampleToken3 = {
  access_token: sampleAccessToken2,
  token_type: "Bearer",
  state: "811-153040-260226-069566-923228-005",
  expires_in: "599",
  id_token: sampleIdTokenHint1,
  expires: 4000000000,
};

export const constants = {
  client_id,
  sampleToken1,
  sampleIdTokenHint1,
  sampleToken2,
  sampleToken3,
};
