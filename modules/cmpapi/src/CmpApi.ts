import { CmpApiContext } from "./cmpapi/CmpApiContext.js";
import { CustomCommands } from "./cmpapi/CustomCommands.js";
import { CmpStatus } from "./cmpapi/status/CmpStatus.js";
import { DisplayStatus } from "./cmpapi/status/DisplayStatus.js";
import { EventStatus } from "./cmpapi/status/EventStatus.js";
import { CallResponder } from "./cmpapi/CallResponder.js";
import { Gvl, GvlUrlConfig } from "./Gvl.js";
import { VendorList } from "./gvl/gvlmodel/VendorList.js";
import { Sections } from "./encoder/section/Sections.js";

export class CmpApi {
  private callResponder: CallResponder;
  private cmpApiContext: CmpApiContext;

  /**
   * @param {number} cmpId - IAB assigned CMP ID
   * @param {number} cmpVersion - integer version of the CMP
   * @param {CustomCommands} [customCommands] - custom commands from the cmp
   */
  public constructor(cmpId: number, cmpVersion: number, customCommands?: CustomCommands) {
    this.cmpApiContext = new CmpApiContext();
    this.cmpApiContext.cmpId = cmpId;
    this.cmpApiContext.cmpVersion = cmpVersion;

    this.callResponder = new CallResponder(this.cmpApiContext, customCommands);
  }

  public fireEvent(eventName: string, value: any) {
    this.cmpApiContext.eventQueue.exec(eventName, value);
  }

  public fireErrorEvent(value: string) {
    this.cmpApiContext.eventQueue.exec("error", value);
  }

  public fireSectionChange(value: string) {
    this.cmpApiContext.eventQueue.exec("sectionChange", value);
  }

  public getEventStatus(): EventStatus {
    return this.cmpApiContext.eventStatus;
  }

  public setEventStatus(eventStatus: EventStatus) {
    this.cmpApiContext.eventStatus = eventStatus;
  }

  public getCmpStatus(): CmpStatus {
    return this.cmpApiContext.cmpStatus;
  }

  public setCmpStatus(cmpStatus: CmpStatus) {
    this.cmpApiContext.cmpStatus = cmpStatus;
    this.cmpApiContext.eventQueue.exec("cmpStatus", cmpStatus);
  }

  public getCmpDisplayStatus(): DisplayStatus {
    return this.cmpApiContext.cmpDisplayStatus;
  }

  public setCmpDisplayStatus(cmpDisplayStatus: DisplayStatus) {
    this.cmpApiContext.cmpDisplayStatus = cmpDisplayStatus;
    this.cmpApiContext.eventQueue.exec("cmpDisplayStatus", cmpDisplayStatus);
  }

  public getApplicableSections(): number[] {
    return this.cmpApiContext.applicableSections;
  }

  public setApplicableSections(applicableSections: number[]): void {
    this.cmpApiContext.applicableSections = applicableSections;
  }

  public getCurrentAPI(): string {
    return this.cmpApiContext.currentAPI;
  }

  public setCurrentAPI(currentAPI: string): void {
    this.cmpApiContext.currentAPI = currentAPI;
  }

  public setGppString(encodedGppString: string): void {
    this.cmpApiContext.gppModel.decode(encodedGppString);
  }

  public getGppString(): string {
    return this.cmpApiContext.gppModel.encode();
  }

  public setSectionString(sectionName: string, encodedSectionString: string): void {
    this.cmpApiContext.gppModel.decodeSection(sectionName, encodedSectionString);
  }

  public setSectionStringById(sectionId: number, encodedSectionString: string): void {
    this.setSectionString(Sections.SECTION_ID_NAME_MAP.get(sectionId), encodedSectionString);
  }

  public getSectionString(sectionName: string): string {
    return this.cmpApiContext.gppModel.encodeSection(sectionName);
  }

  public getSectionStringById(sectionId: number): string {
    return this.getSectionString(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public setFieldValue(sectionName: string, fieldName: string, value: any): void {
    this.cmpApiContext.gppModel.setFieldValue(sectionName, fieldName, value);
  }

  public setFieldValueBySectionId(sectionId: number, fieldName: string, value: any) {
    this.setFieldValue(Sections.SECTION_ID_NAME_MAP.get(sectionId), fieldName, value);
  }

  public getFieldValue(sectionName: string, fieldName: string): any {
    return this.cmpApiContext.gppModel.getFieldValue(sectionName, fieldName);
  }

  public getFieldValueBySectionId(sectionId: number, fieldName: string) {
    return this.getFieldValue(Sections.SECTION_ID_NAME_MAP.get(sectionId), fieldName);
  }

  public getSection(sectionName: string): any {
    return this.cmpApiContext.gppModel.getSection(sectionName);
  }

  public getSectionById(sectionId: number): any {
    return this.getSection(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public hasSection(sectionName: string): any {
    return this.cmpApiContext.gppModel.hasSection(sectionName);
  }

  public hasSectionId(sectionId: number): any {
    return this.hasSection(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public deleteSection(sectionName: string) {
    this.cmpApiContext.gppModel.deleteSection(sectionName);
  }

  public deleteSectionById(sectionId: number) {
    this.deleteSection(Sections.SECTION_ID_NAME_MAP.get(sectionId));
  }

  public clear() {
    this.cmpApiContext.gppModel.clear();
  }

  public getObject() {
    return this.cmpApiContext.gppModel.toObject();
  }

  public getGvlFromVendorList(vendorList: VendorList): Gvl {
    return Gvl.fromVendorList(vendorList);
  }

  public async getGvlFromUrl(gvlUrlConfig: GvlUrlConfig): Promise<Gvl> {
    return Gvl.fromUrl(gvlUrlConfig);
  }
}
