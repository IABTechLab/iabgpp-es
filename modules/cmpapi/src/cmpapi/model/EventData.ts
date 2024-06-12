import { PingData } from "./PingData.js";

export class EventData {
  public eventName: string;
  public listenerId: number;
  public data: any;
  public pingData: PingData;

  constructor(eventName: string, listenerId: number, data: any, pingData: PingData) {
    this.eventName = eventName;
    this.listenerId = listenerId;
    this.data = data;
    this.pingData = pingData;
  }
}
