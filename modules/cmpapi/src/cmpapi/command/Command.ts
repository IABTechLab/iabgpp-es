import { CmpApiContext } from "../CmpApiContext.js";
import { CommandCallback } from "./CommandCallback.js";

export abstract class Command {
  protected callback: CommandCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected parameter: any;
  protected success = true;
  protected cmpApiContext: CmpApiContext;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public constructor(cmpApiContext: CmpApiContext, callback?: CommandCallback, parameter?: any) {
    this.cmpApiContext = cmpApiContext;

    Object.assign(this, {
      callback,
      parameter,
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
      this.callback(response, success);
    }
  }
  protected abstract respond(): any;
}
