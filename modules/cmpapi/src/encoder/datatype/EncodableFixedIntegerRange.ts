import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { FixedIntegerRangeEncoder } from "./encoder/FixedIntegerRangeEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableFixedIntegerRange extends AbstractEncodableBitStringDataType<number[]> {
  constructor(value?: number[]) {
    super(value);
  }

  public encode(): string {
    return FixedIntegerRangeEncoder.encode(this.value);
  }

  public decode(bitString: string) {
    this.value = FixedIntegerRangeEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    //TODO: add some validation
    let count = FixedIntegerEncoder.decode(bitString.substring(fromIndex, fromIndex + 12));
    let index = fromIndex + 12;
    for (let i = 0; i < count; i++) {
      if (bitString.charAt(index) === "1") {
        index += 33;
      } else {
        index += 17;
      }
    }
    return bitString.substring(fromIndex, index);
  }
}
