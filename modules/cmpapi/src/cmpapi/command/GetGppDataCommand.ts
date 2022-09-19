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
    };

    this.invokeCallback(gppData);
    return gppData;
  }
}
