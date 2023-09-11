import { InvalidFieldError } from "../error/InvalidFieldError.js";
import { Fields } from "../field/Fields.js";
import { EncodableSegment } from "./EncodableSegment.js";

export abstract class AbstractLazilyEncodableSegment<T extends Fields<any>> implements EncodableSegment {
  protected fields: T;

  private encodedString: string = null;

  private dirty: boolean = false;
  private decoded: boolean = true;

  public constructor() {
    this.fields = this.initializeFields();
  }

  protected abstract initializeFields(): T;

  protected abstract encodeSegment(fields: T): string;

  protected abstract decodeSegment(encodedString: string, Fields: T): void;

  public abstract getFieldNames(): string[];

  //Overriden
  public validate(): void {}

  public hasField(fieldName: string): boolean {
    return this.fields.containsKey(fieldName);
  }

  public getFieldValue(fieldName: string): any {
    if (!this.decoded) {
      this.decodeSegment(this.encodedString, this.fields);
      this.dirty = false;
      this.decoded = true;
    }

    if (this.fields.containsKey(fieldName)) {
      return this.fields.get(fieldName).getValue();
    } else {
      throw new InvalidFieldError("Invalid field: '" + fieldName + "'");
    }
  }

  public setFieldValue(fieldName: string, value: any): void {
    if (!this.decoded) {
      this.decodeSegment(this.encodedString, this.fields);
      this.dirty = false;
      this.decoded = true;
    }

    if (this.fields.containsKey(fieldName)) {
      this.fields.get(fieldName).setValue(value);
      this.dirty = true;
    } else {
      throw new InvalidFieldError(fieldName + " not found");
    }
  }

  //Overriden
  public toObj(): any {
    let obj = {};
    let fieldNames: string[] = this.getFieldNames();
    for (let i = 0; i < fieldNames.length; i++) {
      let fieldName = fieldNames[i];
      let value = this.getFieldValue(fieldName);
      obj[fieldName] = value;
    }
    return obj;
  }

  public encode(): string {
    if (this.encodedString == null || this.encodedString.length === 0 || this.dirty) {
      this.validate();
      this.encodedString = this.encodeSegment(this.fields);
      this.dirty = false;
      this.decoded = true;
    }

    return this.encodedString;
  }

  public decode(encodedString: string): void {
    this.encodedString = encodedString;
    this.dirty = false;
    this.decoded = false;
  }
}
