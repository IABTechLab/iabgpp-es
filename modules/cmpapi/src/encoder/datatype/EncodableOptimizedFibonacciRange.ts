import { FibonacciIntegerRangeEncoder } from "./encoder/FibonacciIntegerRangeEncoder.js";
import { FixedBitfieldEncoder } from "./encoder/FixedBitfieldEncoder.js";
import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodableFibonacciIntegerRange } from "./EncodableFibonacciIntegerRange.js";
import { Predicate } from "./validate/Predicate.js";

export class EncodableOptimizedFibonacciRange extends AbstractEncodableBitStringDataType<number[]> {
  constructor(value: number[], validator?: Predicate<number[]>) {
    super(validator);
    this.setValue(value);
  }

  public encode(): string {
    //TODO: encoding the range before choosing the shortest is inefficient. There is probably a way
    //to identify in advance which will be shorter based on the array length and values
    let max = this.value.length > 0 ? this.value[this.value.length - 1] : 0;
    let rangeBitString = FibonacciIntegerRangeEncoder.encode(this.value);
    let rangeLength = rangeBitString.length;
    let bitFieldLength = max;

    if (rangeLength <= bitFieldLength) {
      return FixedIntegerEncoder.encode(max, 16) + "1" + rangeBitString;
    } else {
      let bits: boolean[] = [];
      let index = 0;
      for (let i = 0; i < max; i++) {
        if (i == this.value[index] - 1) {
          bits[i] = true;
          index++;
        } else {
          bits[i] = false;
        }
      }
      return FixedIntegerEncoder.encode(max, 16) + "0" + FixedBitfieldEncoder.encode(bits, bitFieldLength);
    }
  }

  public decode(bitString: string) {
    if (bitString.charAt(16) === "1") {
      this.value = FibonacciIntegerRangeEncoder.decode(bitString.substring(17));
    } else {
      let value: number[] = [];
      let bits = FixedBitfieldEncoder.decode(bitString.substring(17));
      for (let i = 0; i < bits.length; i++) {
        if (bits[i] === true) {
          value.push(i + 1);
        }
      }
      this.value = value;
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    let max = FixedIntegerEncoder.decode(bitString.substring(fromIndex, fromIndex + 16));
    if (bitString.charAt(fromIndex + 16) === "1") {
      return (
        bitString.substring(fromIndex, fromIndex + 17) +
        new EncodableFibonacciIntegerRange([]).substring(bitString, fromIndex + 17)
      );
    } else {
      return bitString.substring(fromIndex, fromIndex + 17 + max);
    }
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
