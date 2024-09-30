import { CmpStatus } from "./status/CmpStatus.js";
import { CmpDisplayStatus } from "./status/CmpDisplayStatus.js";
import { EventStatus } from "./status/EventStatus.js";
import { EventListenerQueue } from "./EventListenerQueue.js";
import { GppModel } from "../encoder/GppModel.js";
import { TcfCaV1 } from "../encoder/section/TcfCaV1.js";
import { TcfEuV2 } from "../encoder/section/TcfEuV2.js";
import { UspV1 } from "../encoder/section/UspV1.js";
import { UsNat } from "../encoder/section/UsNat.js";
import { UsCa } from "../encoder/section/UsCa.js";
import { UsVa } from "../encoder/section/UsVa.js";
import { UsCo } from "../encoder/section/UsCo.js";
import { UsUt } from "../encoder/section/UsUt.js";
import { UsCt } from "../encoder/section/UsCt.js";
import { SignalStatus } from "./status/SignalStatus.js";

/**
 * Class holds shareable data across cmp api and provides change event listener for GppModel.
 * Within the context of the CmpApi, this class acts much like a global state or database,
 * where CmpApi sets data and Commands read the data.
 */
export class CmpApiContext {
  public gppVersion = "1.1";
  public supportedAPIs = [];

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
    this.supportedAPIs = [];
    this.gppModel = new GppModel();
    delete this.cmpId;
    delete this.cmpVersion;
    delete this.eventStatus;
  }
}
