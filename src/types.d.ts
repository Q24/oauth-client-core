declare module "jsrsasign-reduced" {
  export const KEYUTIL = {
    getKey(param: Object, passcode?: string | null, hextype?: string): string;,
  };
  export function hextob64u(s: string): string;
  export const KJUR = {
    crypto: {
      Util: {
        hashString(s: string, alg: string): string;,
      },
    },
    jws: {
      JWS: {
        verify(
          sJWS: string,
          key: string,
          acceptAlgs?:
            | string[]
            | { b64: string }
            | { hex: string }
            | { utf8: string },
        ): boolean;,
      },
    },
  };
}
