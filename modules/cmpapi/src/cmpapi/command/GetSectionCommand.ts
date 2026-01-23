import { Command } from "./Command.js";

export class GetSectionCommand extends Command {
  protected respond(): void {
    if (!this.parameter || this.parameter.length === 0) {
      throw new Error("<section> parameter required");
    }

    let section = null;
    // Since TCF 2.2 no fields are allowed to be called directly. Data always needs to be retrieved using the 
    // AddEventListener callback
    if (this.parameter != "tcfeuv2") {
      if (this.cmpApiContext.gppModel.hasSection(this.parameter)) {
        section = this.cmpApiContext.gppModel.getSection(this.parameter);
      }
    }
    this.invokeCallback(section);
  }
}
