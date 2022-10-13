import { config } from '../configuration/config.service';
import { StorageUtil } from '../utils/storage';

function createIdTokenHintKey(): string {
  return `${config.client_id}-id-token-hint`;
}

/**
 * Get the saved id_token_hint string for the current instance from storage
 * Used when you need to check the if your logged in or not without using access-tokens as a reference
 *
 * Pass the `{regex: true}` option, to search for any ID Token Hint by regex
 * During logout, the regex option should be enabled if we are not sure that the *client_id* will remain stable.
 */
export function getIdTokenHint(options = { regex: false }): string | null {
  if (options.regex) {
    const regex = new RegExp(/-id-token-hint/);
    const storageArray = Object.keys(StorageUtil.storage).filter((key) =>
      regex.test(key),
    );
    return storageArray.length > 0 ? StorageUtil.read(storageArray[0]) : null;
  }
  return StorageUtil.read(createIdTokenHintKey());
}

/**
 * Saves the ID token hint to sessionStorage
 */
export function storeIdToken(idTokenHint: string): void {
  StorageUtil.store(createIdTokenHintKey(), idTokenHint);
}

/**
 * Deletes the ID token hint from sessionStorage
 */
export function deleteIdTokenHint(): void {
  StorageUtil.remove("-id-token-hint");
}
