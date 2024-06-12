import { DataType } from "./DataType.js";

export class UnencodableInteger implements DataType<number> {
  private value: number = null;

  constructor(value: number) {
    this.setValue(value);
  }

  hasValue(): boolean {
    return this.value != null;
  }
  getValue(): number {
    return this.value;
  }
  setValue(value: number): void {
    this.value = value;
  }
}
