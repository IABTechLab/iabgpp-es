import { ValidationError } from "../error/ValidationError.js";
import { EncodableDataType } from "./EncodableDataType.js";
import { Predicate } from "./validate/Predicate.js";

export abstract class AbstractEncodableBitStringDataType<T> implements EncodableDataType<T> {
  protected validator: Predicate<T>;
  protected value: T;

  public withValidator(validator: Predicate<T>): AbstractEncodableBitStringDataType<T> {
    this.validator = validator;
    return this;
  }

  public hasValue(): boolean {
    return this.value !== undefined && this.value !== null;
  }

  public getValue(): T {
    return this.value;
  }

  public setValue(value: T) {
    if (!this.validator || this.validator.test(value)) {
      this.value = value;
    } else {
      throw new ValidationError("Invalid value '" + value + "'");
    }
  }

  abstract encode(): string;
  abstract decode(bitString: string): void;
  abstract substring(bitString: string, fromIndex: number): string;
}
