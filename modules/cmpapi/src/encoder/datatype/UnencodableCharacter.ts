import { DataType } from "./DataType.js";

export class UnencodableCharacter implements DataType<string> {
  private value: string = null;

  constructor(value: string) {
    this.setValue(value);
  }

  hasValue(): boolean {
    return this.value != null;
  }
  getValue(): string {
    return this.value;
  }
  setValue(value: string): void {
    if (value) {
      this.value = value.charAt(0);
    } else {
      value = null;
    }
  }
}
