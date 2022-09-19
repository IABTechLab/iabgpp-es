import { CmpApiContext } from "../CmpApiContext.js";
import { CommandCallback } from "./CommandCallback.js";

export abstract class Command {
  protected listenerId: number;
  protected callback: CommandCallback;
  protected next: CommandCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected param: any;
  protected success = true;
  protected cmpApiContext: CmpApiContext;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(
    cmpApiContext: CmpApiContext,
    callback?: CommandCallback,
    param?: any,
    listenerId?: number,
    next?: CommandCallback
  ) {
    this.cmpApiContext = cmpApiContext;

    Object.assign(this, {
      callback,
      listenerId,
      param,
      next,
    });
  }

  public execute(): any {
    try {
      return this.respond();
    } catch (error) {
      this.invokeCallback(null);
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected invokeCallback(response: any): void {
    const success = response !== null;

    if (this.callback) {
      if (typeof this.next === "function") {
        this.callback(this.next, response, success);
      } else {
        this.callback(response, success);
      }
    }
  }
  protected abstract respond(): any;
}
