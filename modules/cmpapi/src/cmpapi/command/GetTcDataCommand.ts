import { Command } from "./Command.js";

// Deprecated for TCF EU
// Implemenation example for TCF Canada
export class GetTcDataCommand extends Command {
  protected respond(): any {
    let section = null;
    if (this.cmpApiContext.gppModel.hasSection("tcfcav1")) {
      section = this.cmpApiContext.gppModel.getSection("tcfcav1");
    }
    this.invokeCallback(section);
    return section;
  }
}
