/**
 * class for decoding errors
 *
 * @extends {Error}
 */
class InvalidFieldError extends Error {
  /**
   * constructor - constructs an DecodingError
   *
   * @param {string} msg - Decoding Error Message
   * @return {undefined}
   */
  public constructor(msg: string) {
    super(msg);
    this.name = "InvalidFieldError";
  }
}

export { InvalidFieldError };
