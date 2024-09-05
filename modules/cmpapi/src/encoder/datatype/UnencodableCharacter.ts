import { DataType } from "./DataType.js";
import { Predicate } from "./validate/Predicate.js";

export class UnencodableCharacter implements DataType<string> {
  protected validator: Predicate<string>;
  private value: string = null;

  constructor(value: string, validator?: Predicate<string>) {
    if (validator) {
      this.validator = validator;
    } else {
      this.validator = new (class implements Predicate<string> {
        test(v: string): boolean {
          return true;
        }
      })();
    }
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
