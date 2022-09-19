import { CmpApiContext } from "./CmpApiContext.js";
import { CommandCallback } from "./command/CommandCallback.js";
import { GetSectionCommand } from "./command/GetSectionCommand.js";

interface EventItem {
  callback?: CommandCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  param?: any;
  next?: CommandCallback;
}

export class EventListenerQueue {
  private eventQueue = new Map<number, EventItem>();
  private queueNumber = 0;
  private cmpApiContext: CmpApiContext;

  constructor(cmpApiContext: CmpApiContext) {
    this.cmpApiContext = cmpApiContext;
  }

  public add(eventItems: EventItem): number {
    this.eventQueue.set(this.queueNumber, eventItems);
    return this.queueNumber++;
  }

  public get(listenerId: number): EventItem {
    return this.eventQueue.get(listenerId);
  }

  public remove(listenerId: number): boolean {
    return this.eventQueue.delete(listenerId);
  }

  public exec(section: string): void {
    this.eventQueue.forEach((eventItem: EventItem, listenerId: number): void => {
      if (
        this.cmpApiContext.gppModel.hasSection(section) &&
        (!eventItem.param || eventItem.param.length === 0 || section === eventItem.param)
      ) {
        new GetSectionCommand(this.cmpApiContext, eventItem.callback, section, listenerId, eventItem.next).execute();
      }
    });
  }

  public clear(): void {
    this.queueNumber = 0;
    this.eventQueue.clear();
  }

  public get size(): number {
    return this.eventQueue.size;
  }
}
