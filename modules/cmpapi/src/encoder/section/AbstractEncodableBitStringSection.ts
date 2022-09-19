import { Gvl } from "../../Gvl.js";
import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { EncodableSection } from "./EncodableSection.js";

export abstract class AbstractEncodableBitStringSection implements EncodableSection {
  protected fields: Map<string, AbstractEncodableBitStringDataType<any>>;
  protected fieldOrder: string[];

  constructor(fields: Map<string, AbstractEncodableBitStringDataType<any>>, fieldOrder: string[]) {
    this.fields = fields;
    this.fieldOrder = fieldOrder;
  }

  //Overriden
  public hasField(fieldName: string): boolean {
    return this.fields.has(fieldName);
  }

  //Overriden
  public getFieldValue(fieldName: string): any {
    if (this.fields.has(fieldName)) {
      return this.fields.get(fieldName).getValue();
    } else {
      return null;
    }
  }

  //Overriden
  public setFieldValue(fieldName: string, value: any): void {
    if (this.fields.has(fieldName)) {
      this.fields.get(fieldName).setValue(value);
    } else {
      throw new Error(fieldName + " not found");
    }
  }

  public getFieldOrder() {
    return this.fieldOrder;
  }

  public encodeToBitString(): string {
    let bitString = "";
    for (let i = 0; i < this.fieldOrder.length; i++) {
      let fieldName = this.fieldOrder[i];
      if (this.fields.has(fieldName)) {
        let field = this.fields.get(fieldName);
        bitString += field.encode();
      } else {
        throw new Error("Field not found: '" + fieldName + "'");
      }
    }

    return bitString;
  }

  public decodeFromBitString(bitString: string) {
    let index = 0;
    for (let i = 0; i < this.fieldOrder.length; i++) {
      let fieldName = this.fieldOrder[i];
      if (this.fields.has(fieldName)) {
        let field = this.fields.get(fieldName);
        let substring = field.substring(bitString, index);
        field.decode(substring);
        index += substring.length;
      } else {
        throw new Error("Field not found: '" + fieldName + "'");
      }
    }
  }

  //Overriden
  public toObj(): any {
    let obj = {};
    for (let i = 0; i < this.fieldOrder.length; i++) {
      let fieldName = this.fieldOrder[i];
      if (this.fields.has(fieldName)) {
        let field = this.fields.get(fieldName);
        let value = field.getValue();
        obj[fieldName] = value;
      }
    }
    return obj;
  }

  //Overriden
  public abstract encode(): string;

  //Overriden
  public abstract decode(encodedString: string): void;

  //Overriden
  public abstract getId(): number;

  //Overriden
  public abstract getName(): string;
}
