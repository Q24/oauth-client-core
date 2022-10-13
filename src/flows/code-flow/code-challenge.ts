import { KJUR, hextob64u } from "jsrsasign-reduced";

export function createCodeChallenge(code_verifier: string): string {
  const hash = KJUR.crypto.Util.hashString(code_verifier, 'sha256');
  const code_challenge = hextob64u(hash);

  return code_challenge;
}