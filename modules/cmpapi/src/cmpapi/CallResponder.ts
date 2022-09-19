import { CommandCallback } from "./command/CommandCallback.js";
import { GppCommand } from "./command/GppCommand.js";
import { CommandMap } from "./command/CommandMap.js";
import { CmpApiContext } from "./CmpApiContext.js";
import { CustomCommands } from "./CustomCommands.js";
import { CmpStatus } from "./status/CmpStatus.js";

export const API_KEY = "__gpp";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type APIArgs = [string, CommandCallback?, any?, number?];

type GetQueueFunction = () => APIArgs[];
// eslint-disable-next-line no-unused-vars
type PageCallHandler = (...APIArgs) => void;

export class CallResponder {
  private callQueue: APIArgs[];
  private readonly customCommands: CustomCommands;
  private cmpApiContext: CmpApiContext;

  public constructor(cmpApiContext: CmpApiContext, customCommands?: CustomCommands) {
    this.cmpApiContext = cmpApiContext;

    if (customCommands) {
      /**
       * The addEventListener command and removeEventListener are the only ones
       * that shouldn't be overwritten. The addEventListener command utilizes
       * getTCData command, so overridding the TCData response should happen
       * there.
       */

      let command = GppCommand.ADD_EVENT_LISTENER;

      if (customCommands?.[command]) {
        throw new Error(`Built-In Custom Commmand for ${command} not allowed`);
      }

      command = GppCommand.REMOVE_EVENT_LISTENER;

      if (customCommands?.[command]) {
        throw new Error(`Built-In Custom Commmand for ${command} not allowed`);
      }

      this.customCommands = customCommands;
    }

    /**
     * Attempt to grab the queue – we could call ping and see if it is the stub,
     * but instead we'll just a feature-detection method of just trying to get
     * a queue by calling the function with no parameters and see if we get a
     * queue back. If there is no stub or the stub doesn't return the queue by
     * calling with no arguments, then we'll just move on and create our
     * function.
     */

    try {
      // get queued commands
      this.callQueue = (window[API_KEY] as GetQueueFunction)() || [];
    } catch (err) {
      this.callQueue = [];
    } finally {
      window[API_KEY] = this.apiCall.bind(this);
      this.purgeQueuedCalls();
    }
  }

  /**
   * Handler for all page call commands
   * @param {string} command
   * @param {CommandCallback} callback
   * @param {any} param
   * @param {number} version
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public apiCall(command: string, callback?: CommandCallback, param?: any, version?: number): any {
    if (typeof command !== "string") {
      return callback(null, false);
    } else if (callback && typeof callback !== "function") {
      throw new Error("invalid callback function");
    } else if (!this.isCustomCommand(command) && !this.isBuiltInCommand(command)) {
      /**
       * This check is here just because the call shouldn't be queued if it's
       * something we know isn't going to work.  It's kind of like breaking off a bad
       * relationshipthe instant you know things are not going to work out
       * instead of letting it linger.
       */

      if (callback) {
        return callback(null, false);
      }
    } else if (this.isCustomCommand(command) && !this.isBuiltInCommand(command)) {
      return this.customCommands[command](callback, param);
    } else if (command === GppCommand.PING) {
      //respond right away

      if (this.isCustomCommand(command)) {
        return new CommandMap[command](
          this.cmpApiContext,
          this.customCommands[command],
          callback,
          null,
          param
        ).execute();
      } else {
        return new CommandMap[command](this.cmpApiContext, callback, param).execute();
      }

      /**
       * gppModel will be either:
       * 1. undefined - update has not been called
       * 2. null - gdpr does not apply
       * 3. Valid GppModel - gdpr applies and update was called
       */
    } else if (this.cmpApiContext.gppModel === undefined) {
      /**
       * If we are still waiting for the TC data to be set we can push this
       * onto the queue that we have and once the model is set it'll be called
       */
      this.callQueue.push([command, callback, param, version]);
    } else if (this.isCustomCommand(command) && this.isBuiltInCommand(command)) {
      return new CommandMap[command](this.customCommands[command], callback, param, null);
    } else {
      /**
       * at this point we know the command exists and we are free to call it
       */

      return new CommandMap[command](this.cmpApiContext, callback, param).execute();
    }
  }

  /**
   * purgeQueuedCalls - if there have been calls that are queued up this method
   * will go through and call them in a FIFO order
   *
   * @return {void}
   */
  public purgeQueuedCalls(): void {
    const queueCopy: APIArgs[] = this.callQueue;

    this.callQueue = [];
    queueCopy.forEach((args: APIArgs): void => {
      window[API_KEY](...args);
    });
  }

  /**
   * Checks to see if the command exists in the set of custom commands
   *
   * @param {string} command - command to check
   * @return {boolean} - whether or not this command is a custom command
   */
  private isCustomCommand(command: string): boolean {
    return this.customCommands && typeof this.customCommands[command] === "function";
  }

  /**
   * Checks to see if the command exists in the set of TCF Commands
   *
   * @param {string} command - command to check
   * @return {boolean} - whether or not this command is a built-in command
   */
  private isBuiltInCommand(command: string): boolean {
    return CommandMap[command] !== undefined;
  }
}
