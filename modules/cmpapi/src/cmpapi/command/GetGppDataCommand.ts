import { Command } from "./Command.js";

export class GetGppDataCommand extends Command {
  protected respond(): any {
    let header = this.cmpApiContext.gppModel.getHeader();
    let gppData = {
      sectionId: header.Id,
      gppVersion: this.cmpApiContext.gppVersion,
      sectionList: header.SectionIds,
      applicableSection: this.cmpApiContext.applicableSection,
      gppString: this.cmpApiContext.gppModel.encode(),
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

    this.invokeCallback(gppData);
    return gppData;
  }
}
