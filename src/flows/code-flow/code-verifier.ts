const codeVerifierStorageKey = "code_verifier";

export function storeCodeVerifier(code_verifier: string): void {
  window.sessionStorage.setItem(codeVerifierStorageKey, code_verifier);
}

export function getStoredCodeVerifier(): string | null {
  return window.sessionStorage.getItem(codeVerifierStorageKey);
}

export function generateCodeVerifier(): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

  for (let i = 0; i < 128; ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    i += 1;
  }
  return text;
}

/**
 * Generates a code verifier and stores it in session storage.
 *
 * @returns the code verifier
 */
export function storeAndGetNewCodeVerifier(): string {
  const code_verifier = generateCodeVerifier();
  storeCodeVerifier(code_verifier);

  return code_verifier;
}
