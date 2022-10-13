import type { UserInfo } from "./user-info.model";

const userInfoState: {
  userInfo: UserInfo | null;
} = {
  userInfo: null,
};

export const readUserInfoCache = (): UserInfo | null => {
  return userInfoState.userInfo;
};
export const setUserInfoCache = (userInfo: UserInfo): void => {
  userInfoState.userInfo = userInfo;
};

export const clearUserInfoCache = (): void => {
  userInfoState.userInfo = null;
};
