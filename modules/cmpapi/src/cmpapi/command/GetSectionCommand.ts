import { Command } from "./Command.js";

export class GetSectionCommand extends Command {
  protected respond(): any {
    if (!this.param || this.param.length === 0) {
      throw new Error("<section> parameter required");
    }

    let section = null;
    if (this.cmpApiContext.gppModel.hasSection(this.param)) {
      section = this.cmpApiContext.gppModel.getSection(this.param);
    }
    this.invokeCallback(section);
    return section;
  }
}
