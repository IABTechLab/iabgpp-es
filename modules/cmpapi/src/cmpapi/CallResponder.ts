import { CommandCallback } from "./command/CommandCallback.js";
import { GppCommand } from "./command/GppCommand.js";
import { CommandMap } from "./command/CommandMap.js";
import { CmpApiContext } from "./CmpApiContext.js";
import { CustomCommands } from "./CustomCommands.js";

export type APIArgs = [string, CommandCallback?, any?, number?];

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

    try {
      // get queued commands
      this.callQueue = window["__gpp"]() || [];
    } catch (err) {
      this.callQueue = [];
    } finally {
      window["__gpp"] = this.apiCall.bind(this);
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
  public apiCall(command: string, callback?: CommandCallback, parameter?: any, version?: number): void {
    if (typeof command !== "string") {
      return callback(null, false);
    } else if (callback && typeof callback !== "function") {
      throw new Error("invalid callback function");
    } else if (this.isCustomCommand(command)) {
      return this.customCommands[command](callback, parameter);
    } else if (this.isBuiltInCommand(command)) {
      return new CommandMap[command](this.cmpApiContext, callback, parameter).execute();
    } else {
      if (callback) {
        return callback(null, false);
      }
    }
  }

  public purgeQueuedCalls(): void {
    const queueCopy: APIArgs[] = this.callQueue;

    this.callQueue = [];
    queueCopy.forEach((args: APIArgs): void => {
      window["__gpp"](...args);
    });
  }

  private isCustomCommand(command: string): boolean {
    return this.customCommands && typeof this.customCommands[command] === "function";
  }

  private isBuiltInCommand(command: string): boolean {
    return CommandMap[command] !== undefined;
  }
}
