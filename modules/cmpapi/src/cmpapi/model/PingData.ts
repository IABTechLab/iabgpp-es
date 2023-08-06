import { CmpApiContext } from "../CmpApiContext";
import { CmpStatus, CmpDisplayStatus } from "../status";
import { SignalStatus } from "../status/SignalStatus";

export class PingData {
  public gppVersion: string;
  public cmpStatus: CmpStatus;
  public cmpDisplayStatus: CmpDisplayStatus;
  public signalStatus: SignalStatus;
  public supportedAPIs: string[];
  public cmpId: number;
  public sectionList: number[];
  public applicableSections: number[];
  public gppString: string;
  public parsedSections;

  constructor(cmpApiContext: CmpApiContext) {
    this.gppVersion = cmpApiContext.gppVersion;
    this.cmpStatus = cmpApiContext.cmpStatus;
    this.cmpDisplayStatus = cmpApiContext.cmpDisplayStatus;
    this.signalStatus = cmpApiContext.signalStatus;
    this.supportedAPIs = cmpApiContext.supportedAPIs;
    this.cmpId = cmpApiContext.cmpId;
    this.sectionList = cmpApiContext.gppModel.getSectionIds();
    this.applicableSections = cmpApiContext.applicableSections;
    this.gppString = cmpApiContext.gppModel.encode();
    this.parsedSections = cmpApiContext.gppModel.toObject();
  }
}
