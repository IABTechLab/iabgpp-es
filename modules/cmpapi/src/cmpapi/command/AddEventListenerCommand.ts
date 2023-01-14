import { Command } from "./Command.js";

export class AddEventListenerCommand extends Command {
  protected respond(): any {
    let listenerId = this.cmpApiContext.eventQueue.add({
      callback: this.callback,
      parameter: this.parameter,
    });

    return {
      eventName: "listenerRegistered",
      listenerId: listenerId,
      data: true,
      pingData: {
        gppVersion: this.cmpApiContext.gppVersion,
        cmpStatus: this.cmpApiContext.cmpStatus,
        cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
        apiSupport: this.cmpApiContext.apiSupport,
        currentAPI: this.cmpApiContext.currentAPI,
        cmpId: this.cmpApiContext.cmpId,
        cmpVersion: this.cmpApiContext.cmpVersion,
      },
    };
  }
}
