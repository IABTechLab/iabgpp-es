import { FibonacciIntegerRangeEncoder } from "./encoder/FibonacciIntegerRangeEncoder.js";
import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { Predicate } from "./validate/Predicate.js";

export class EncodableFibonacciIntegerRange extends AbstractEncodableBitStringDataType<number[]> {
  constructor(value: number[], validator?: Predicate<number[]>) {
    super(validator);
    this.setValue(value);
  }

  public encode(): string {
    return FibonacciIntegerRangeEncoder.encode(this.value);
  }

  public decode(bitString: string) {
    this.value = FibonacciIntegerRangeEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    let count = FixedIntegerEncoder.decode(bitString.substring(fromIndex, fromIndex + 12));
    let index = fromIndex + 12;
    for (let i = 0; i < count; i++) {
      if (bitString.charAt(index) === "1") {
        index = bitString.indexOf("11", bitString.indexOf("11", index + 1) + 2) + 2;
      } else {
        index = bitString.indexOf("11", index + 1) + 2;
      }
    }
    return bitString.substring(fromIndex, index);
  }

  // Overriden
  public getValue(): number[] {
    return [...super.getValue()];
  }

  // Overriden
  public setValue(value: number[]) {
    super.setValue(Array.from(new Set(value)).sort((n1, n2) => n1 - n2));
  }
}
