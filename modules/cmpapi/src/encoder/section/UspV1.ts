import { InvalidFieldError } from "../error/InvalidFieldError.js";
import { UspV1Field } from "../field/UspV1Field.js";
import { EncodableSection } from "./EncodableSection.js";

// Deprecated
export class UspV1 implements EncodableSection {
  public static readonly ID = 6;
  public static readonly VERSION = 1;
  public static readonly NAME = "uspv1";

  protected fields: Map<String, any>;

  constructor(encodedString?: string) {
    this.fields = new Map<String, any>();
    this.fields.set(UspV1Field.VERSION.toString(), UspV1.VERSION);
    this.fields.set(UspV1Field.NOTICE.toString(), "-");
    this.fields.set(UspV1Field.OPT_OUT_SALE.toString(), "-");
    this.fields.set(UspV1Field.LSPA_COVERED.toString(), "-");

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public hasField(fieldName: string): boolean {
    return this.fields.has(fieldName);
  }

  //Overriden
  public getFieldValue(fieldName: string): any {
    if (this.fields.has(fieldName)) {
      return this.fields.get(fieldName);
    } else {
      return null;
    }
  }

  //Overriden
  public setFieldValue(fieldName: string, value: any): void {
    if (this.fields.has(fieldName)) {
      this.fields.set(fieldName, value);
    } else {
      throw new InvalidFieldError(fieldName + " not found");
    }
  }

  //Overriden
  public toObj(): any {
    let obj = {};
    for (const fieldName of this.fields.keys()) {
      let value = this.fields.get(fieldName);
      obj[fieldName.toString()] = value;
    }

    return obj;
  }

  //Overriden
  public encode() {
    let str = "";
    str += this.getFieldValue(UspV1Field.VERSION.toString());
    str += this.getFieldValue(UspV1Field.NOTICE.toString());
    str += this.getFieldValue(UspV1Field.OPT_OUT_SALE.toString());
    str += this.getFieldValue(UspV1Field.LSPA_COVERED.toString());
    return str;
  }

  //Overriden
  public decode(encodedString: string) {
    //TODO: validate
    this.setFieldValue(UspV1Field.VERSION.toString(), parseInt(encodedString.charAt(0)));
    this.setFieldValue(UspV1Field.NOTICE.toString(), encodedString.charAt(1));
    this.setFieldValue(UspV1Field.OPT_OUT_SALE.toString(), encodedString.charAt(2));
    this.setFieldValue(UspV1Field.LSPA_COVERED.toString(), encodedString.charAt(3));
  }

  //Overriden
  public getId(): number {
    return UspV1.ID;
  }

  //Overriden
  public getName(): string {
    return UspV1.NAME;
  }
}
