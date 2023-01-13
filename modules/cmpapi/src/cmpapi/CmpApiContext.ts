import { CmpStatus } from "./status/CmpStatus.js";
import { DisplayStatus } from "./status/DisplayStatus.js";
import { EventStatus } from "./status/EventStatus.js";
import { EventListenerQueue } from "./EventListenerQueue.js";
import { GppModel } from "../encoder/GppModel.js";
import { TcfCaV1 } from "../encoder/section/TcfCaV1.js";
import { TcfEuV2 } from "../encoder/section/TcfEuV2.js";
import { UspV1 } from "../encoder/section/UspV1.js";
import { UspNatV1 } from "../encoder/section/UspNatV1.js";
import { UspCaV1 } from "../encoder/section/UspCaV1.js";
import { UspVaV1 } from "../encoder/section/UspVaV1.js";
import { UspCoV1 } from "../encoder/section/UspCoV1.js";
import { UspUtV1 } from "../encoder/section/UspUtV1.js";
import { UspCtV1 } from "../encoder/section/UspCtV1.js";

/**
 * Class holds shareable data across cmp api and provides change event listener for GppModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiContext {
  public gppVersion = "1.0";
  public apiSupport = [
    TcfEuV2.NAME,
    TcfCaV1.NAME,
    UspV1.NAME,
    UspNatV1.NAME,
    UspCaV1.NAME,
    UspVaV1.NAME,
    UspCoV1.NAME,
    UspUtV1.NAME,
    UspCtV1.NAME,
  ];

  public readonly eventQueue = new EventListenerQueue(this);
  public cmpStatus: CmpStatus = CmpStatus.LOADING;
  public cmpDisplayStatus: DisplayStatus = DisplayStatus.HIDDEN;
  public applicableSections = [];
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
