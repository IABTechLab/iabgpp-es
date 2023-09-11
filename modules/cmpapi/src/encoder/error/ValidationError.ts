/**
 * class for decoding errors
 *
 * @extends {Error}
 */
class ValidationError extends Error {
  /**
   * constructor - constructs an DecodingError
   *
   * @param {string} msg - Decoding Error Message
   * @return {undefined}
   */
  public constructor(msg: string) {
    super(msg);
    this.name = "ValidationError";
  }
}

export { ValidationError };
