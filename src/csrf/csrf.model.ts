/**
 * Session bound token. This token remain the same during your HTTP session (exception: changes once after successful login).
 */
 export interface CsrfResult {
  /**
   * CSRF Token Header name
   */
  header_name: string;
  /**
   * CRSF Token key to be used
   */
  parameter_key: string;
  /**
   * The CSRF Token itself
   */
  csrf_token: string;
}
