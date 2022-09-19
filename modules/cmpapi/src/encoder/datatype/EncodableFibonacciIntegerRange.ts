import { FibonacciIntegerRangeEncoder } from "./encoder/FibonacciIntegerRangeEncoder.js";
import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableFibonacciIntegerRange extends AbstractEncodableBitStringDataType<number[]> {
  constructor(value?: number[]) {
    super(value);
  }

  public encode(): string {
    return FibonacciIntegerRangeEncoder.encode(this.value);
  }

  public decode(bitString: string) {
    this.value = FibonacciIntegerRangeEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    //TODO: add some validation
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
}
