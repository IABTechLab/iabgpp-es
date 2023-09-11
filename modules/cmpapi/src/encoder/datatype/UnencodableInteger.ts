import { DataType } from "./DataType.js";
import { Predicate } from "./validate/Predicate.js";

export class UnencodableInteger implements DataType<number> {
  protected validator: Predicate<number>;
  private value: number = null;

  constructor(value: number, validator?: Predicate<number>) {
    if (validator) {
      this.validator = validator;
    } else {
      this.validator = new (class implements Predicate<number> {
        test(v: number): boolean {
          return true;
        }
      })();
    }
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
