import { Command } from "./Command.js";

export class RemoveEventListenerCommand extends Command {
  protected respond(): any {
    let listenerId = this.parameter;

    if (this.cmpApiContext.eventQueue.remove(listenerId)) {
      return {
        eventName: "listenerRemoved",
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
    } else {
      return {
        eventName: "listenerRemoved",
        listenerId: listenerId,
        data: false,
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
}
