import { CmpApiContext } from "./CmpApiContext.js";
import { CommandCallback } from "./command/CommandCallback.js";

interface EventItem {
  callback: CommandCallback;
  parameter?: any;
}

export class EventListenerQueue {
  private eventQueue = new Map<number, EventItem>();
  private queueNumber = 1000;
  private cmpApiContext: CmpApiContext;

  constructor(cmpApiContext: CmpApiContext) {
    this.cmpApiContext = cmpApiContext;

    try {
      // get queued commands
      let events = window["__gpp"]("events") || [];
      for (var i = 0; i < events.length; i++) {
        let eventItem = events[i];
        this.eventQueue.set(eventItem.id, {
          callback: eventItem.callback,
          parameter: eventItem.parameter,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  public add(eventItem: EventItem): number {
    this.eventQueue.set(this.queueNumber, eventItem);
    return this.queueNumber++;
  }

  public get(listenerId: number): EventItem {
    return this.eventQueue.get(listenerId);
  }

  public remove(listenerId: number): boolean {
    return this.eventQueue.delete(listenerId);
  }

  public exec(eventName: string, data: any): void {
    this.eventQueue.forEach((eventItem: EventItem, listenerId: number): void => {
      eventItem.callback({
        eventName: eventName,
        listenerId: listenerId,
        data: data,
        pingData: {
          gppVersion: this.cmpApiContext.gppVersion,
          cmpStatus: this.cmpApiContext.cmpStatus,
          cmpDisplayStatus: this.cmpApiContext.cmpDisplayStatus,
          apiSupport: this.cmpApiContext.apiSupport,
          currentAPI: this.cmpApiContext.currentAPI,
          cmpId: this.cmpApiContext.cmpId,
          cmpVersion: this.cmpApiContext.cmpVersion,
        },
      });
    });
  }

  public clear(): void {
    this.queueNumber = 1000;
    this.eventQueue.clear();
  }

  public get size(): number {
    return this.eventQueue.size;
  }
}
