import { config } from "../configuration/config.service";
import { StorageUtil } from "./storage";

/**
 * Generates a random 'nonce' string
 * @returns {string}
 */
export function generateNonce(): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 25; ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    i += 1;
  }
  return text;
}

const nonceStorageId = () => `${config.client_id}-nonce`;

/**
 * Get the saved nonce string from storage
 * @returns {string}
 */
export function getNonce(): string | null {
  return StorageUtil.read(nonceStorageId());
}

/**
 * Saves the discoveryState string to sessionStorage
 * @param nonce
 */
export function saveNonce(nonce: string): void {
  StorageUtil.store(nonceStorageId(), nonce);
}

/**
 * Deletes the nonce from sessionStorage
 */
export function deleteNonce(): void {
  StorageUtil.remove("-nonce");
}
