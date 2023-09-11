import { FixedStringEncoder } from "./encoder/FixedStringEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { Predicate } from "./validate/Predicate.js";

export class EncodableFixedString extends AbstractEncodableBitStringDataType<string> {
  private stringLength: number;

  constructor(stringLength: number, value: string, validator?: Predicate<string>) {
    super(validator);
    this.stringLength = stringLength;
    this.setValue(value);
  }

  public encode(): string {
    return FixedStringEncoder.encode(this.value, this.stringLength);
  }

  public decode(bitString: string) {
    this.value = FixedStringEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    return bitString.substring(fromIndex, fromIndex + this.stringLength * 6);
  }
}
