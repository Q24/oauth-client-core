import { LogUtil } from "../utils/log-util";

export function validateJwtString(token: string): void {
  LogUtil.info('validating JWT string');

  if (typeof token !== 'string') {
    LogUtil.error('token is not a string', token);
    throw Error('jwt_string_invalid');
  }

  const parts = token.split('.');

  if (parts.length !== 3) {
    LogUtil.error('token doesn\'t have 3 parts', token);
    throw Error('jwt_string_invalid');
  }
}
