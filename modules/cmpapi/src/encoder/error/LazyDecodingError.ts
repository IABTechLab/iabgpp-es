import { DecodingError } from "./DecodingError";

/**
 * class for decoding errors
 *
 * @extends {DecodingError}
 */
class LazyDecodingError extends DecodingError {
  /**
   * constructor - constructs an DecodingError
   *
   * @param {string} msg - Decoding Error Message
   * @return {undefined}
   */
  public constructor(msg: string) {
    super(msg);
    this.name = "LazyDecodingError";
  }
}

export { LazyDecodingError };
