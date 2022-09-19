import { Command } from "./Command.js";

// Deprcated
export class GetTcDataCommand extends Command {
  protected respond(): any {
    let section = null;
    if (this.cmpApiContext.gppModel.hasSection("tcfeuvs")) {
      section = this.cmpApiContext.gppModel.getSection("tcfeuv2");
    }
    this.invokeCallback(section);
    return section;
  }
}
