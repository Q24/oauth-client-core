import { parseJwt } from "./parseJwt";

const sampleJwt1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
describe("parse JWT", () => {
  it("gets the correct header for an ID token", () => {
    const { header } = parseJwt(sampleJwt1);

    expect(header).toEqual({
      alg: "HS256",
      typ: "JWT",
    });
  });

  it("gets the correct payload for an ID token", () => {
    const { payload } = parseJwt(sampleJwt1);

    expect(payload).toEqual({
      sub: "1234567890",
      name: "John Doe",
      iat: 1516239022,
    });
  });
});
