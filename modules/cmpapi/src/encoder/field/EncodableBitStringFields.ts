import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { Fields } from "./Fields.js";

export class EncodableBitStringFields implements Fields<AbstractEncodableBitStringDataType<any>> {
  private fields = new Map<string, AbstractEncodableBitStringDataType<any>>();

  containsKey(key: string): boolean {
    return this.fields.has(key);
  }
  put(key: string, value: AbstractEncodableBitStringDataType<any>): void {
    this.fields.set(key, value);
  }
  get(key: string): AbstractEncodableBitStringDataType<any> {
    return this.fields.get(key);
  }
  getAll(): Map<string, AbstractEncodableBitStringDataType<any>> {
    return new Map<string, AbstractEncodableBitStringDataType<any>>(this.fields);
  }
  reset(fields: Fields<AbstractEncodableBitStringDataType<any>>): void {
    this.fields.clear();
    fields.getAll().forEach((value: AbstractEncodableBitStringDataType<any>, key: string) => {
      this.fields.set(key, value);
    });
  }
}
