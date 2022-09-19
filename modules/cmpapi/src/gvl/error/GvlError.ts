/**
 * class for General Gvl Errors
 *
 * @extends {Error}
 */
class GvlError extends Error {
  /**
   * constructor - constructs a GvlError
   *
   * @param {string} msg - Error message to display
   * @return {undefined}
   */
  public constructor(msg: string) {
    super(msg);
    this.name = "GvlError";
  }
}

export { GvlError };
