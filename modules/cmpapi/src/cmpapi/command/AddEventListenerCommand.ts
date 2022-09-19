import { Command } from "./Command.js";

export class AddEventListenerCommand extends Command {
  protected respond(): any {
    let eventListener = {
      callback: this.callback,
      param: this.param,
      next: this.next,
    };

    this.cmpApiContext.eventQueue.add(eventListener);
    return eventListener;
  }
}
