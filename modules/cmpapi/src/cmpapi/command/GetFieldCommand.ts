import { Command } from "./Command.js";

export class GetFieldCommand extends Command {
  protected respond(): any {
    if (!this.parameter || this.parameter.length === 0) {
      throw new Error("<section>.<field> parameter required");
    }

    let parts = this.parameter.split(".");
    if (parts.length != 2) {
      throw new Error("Field name must be in the format <section>.<fieldName>");
    }
    let sectionName = parts[0];
    let fieldName = parts[1];

    let fieldValue = null;
    if (this.parameter != "tcfeuv2") {
      fieldValue = this.cmpApiContext.gppModel.getFieldValue(sectionName, fieldName);
    }
    this.invokeCallback(fieldValue);
    return fieldValue;
  }
}
