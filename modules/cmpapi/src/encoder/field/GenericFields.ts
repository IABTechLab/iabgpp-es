import { DataType } from "../datatype/DataType.js";
import { Fields } from "./Fields.js";

export class GenericFields implements Fields<DataType<any>> {
  private fields = new Map<string, DataType<any>>();

  containsKey(key: string): boolean {
    return this.fields.has(key);
  }
  put(key: string, value: DataType<any>): void {
    this.fields.set(key, value);
  }
  get(key: string): DataType<any> {
    return this.fields.get(key);
  }
  getAll(): Map<string, DataType<any>> {
    return new Map<string, DataType<any>>(this.fields);
  }
  reset(fields: Fields<DataType<any>>): void {
    this.fields.clear();
    fields.getAll().forEach((value: DataType<any>, key: string) => {
      this.fields.set(key, value);
    });
  }
}
