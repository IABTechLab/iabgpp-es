import { CmpStatus } from "./status/CmpStatus.js";
import { DisplayStatus } from "./status/DisplayStatus.js";
import { EventStatus } from "./status/EventStatus.js";
import { EventListenerQueue } from "./EventListenerQueue.js";
import { GppModel } from "../encoder/GppModel.js";
import { TcfEuV2 } from "../encoder/section/TcfEuV2.js";
import { UspV1 } from "../encoder/section/UspV1.js";

/**
 * Class holds shareable data across cmp api and provides change event listener for GppModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiContext {
  public gppVersion = "1.0";
  public apiSupport = [TcfEuV2.NAME, UspV1.NAME];

  public readonly eventQueue = new EventListenerQueue(this);
  public cmpStatus: CmpStatus = CmpStatus.LOADING;
  public cmpDisplayStatus: DisplayStatus = DisplayStatus.HIDDEN;
  public applicableSection = [];
  public gppModel: GppModel = new GppModel();

  public cmpId: number;
  public cmpVersion: number;
  public currentAPI: string;
  public eventStatus: EventStatus;

  public reset(): void {
    delete this.cmpId;
    delete this.cmpVersion;
    delete this.currentAPI;
    delete this.eventStatus;

    this.gppModel = new GppModel();
    this.cmpStatus = CmpStatus.LOADING;
    this.cmpDisplayStatus = DisplayStatus.HIDDEN;
    this.eventQueue.clear();
  }
}
