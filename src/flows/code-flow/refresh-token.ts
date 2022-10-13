import { config } from '../../configuration/config.service';
import { StorageUtil } from '../../utils/storage';

function createRefreshTokenStorageKey(): string {
  return `${config.client_id}-refresh-token`;
}

/**
 * gets the refresh token from session storage
 */
export function getStoredRefreshToken(): string | null {
  return StorageUtil.read(createRefreshTokenStorageKey());
}

/**
 * Saves the refresh to sessionStorage
 */
export function storeRefreshToken(idTokenHint: string): void {
  StorageUtil.store(createRefreshTokenStorageKey(), idTokenHint);
}

/**
 * Deletes the refresh token from sessionStorage for the current client
 */
export function deleteStoredRefreshToken(): void {
  StorageUtil.remove(createRefreshTokenStorageKey());
}

/**
 * Deletes the refresh tokens from sessionStorage for all clients
 */
export function deleteAllStoredRefreshTokens(): void {
  StorageUtil.remove("-refresh-token");
}
