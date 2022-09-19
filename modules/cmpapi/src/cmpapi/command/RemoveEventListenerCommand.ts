import { Command } from "./Command.js";

export class RemoveEventListenerCommand extends Command {
  protected respond(): any {
    let response = this.cmpApiContext.eventQueue.get(this.param);
    this.cmpApiContext.eventQueue.remove(this.param);
    return response;
  }
}
