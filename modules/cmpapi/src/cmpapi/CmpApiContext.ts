import { CmpStatus } from "./status/CmpStatus.js";
import { CmpDisplayStatus } from "./status/CmpDisplayStatus.js";
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
import { SignalStatus } from "./status/SignalStatus.js";

/**
 * Class holds shareable data across cmp api and provides change event listener for GppModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiContext {
  public gppVersion = "1.1";
  public supportedAPIs = [
    TcfEuV2.ID + ":" + TcfEuV2.NAME,
    TcfCaV1.ID + ":" + TcfCaV1.NAME,
    UspV1.ID + ":" + UspV1.NAME,
    UspNatV1.ID + ":" + UspNatV1.NAME,
    UspCaV1.ID + ":" + UspCaV1.NAME,
    UspVaV1.ID + ":" + UspVaV1.NAME,
    UspCoV1.ID + ":" + UspCoV1.NAME,
    UspUtV1.ID + ":" + UspUtV1.NAME,
    UspCtV1.ID + ":" + UspCtV1.NAME,
  ];

  public readonly eventQueue = new EventListenerQueue(this);
  public cmpStatus: CmpStatus = CmpStatus.LOADING;
  public cmpDisplayStatus: CmpDisplayStatus = CmpDisplayStatus.HIDDEN;
  public signalStatus: SignalStatus = SignalStatus.NOT_READY;
  public applicableSections: number[] = [];
  public gppModel: GppModel = new GppModel();
  public cmpId: number;
  public cmpVersion: number;
  public eventStatus: EventStatus;

  public reset(): void {
    this.eventQueue.clear();
    this.cmpStatus = CmpStatus.LOADING;
    this.cmpDisplayStatus = CmpDisplayStatus.HIDDEN;
    this.signalStatus = SignalStatus.NOT_READY;
    this.applicableSections = [];
    this.gppModel = new GppModel();
    delete this.cmpId;
    delete this.cmpVersion;
    delete this.eventStatus;
  }
}
