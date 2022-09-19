import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableFixedInteger extends AbstractEncodableBitStringDataType<number> {
  private bitStringLength: number;

  constructor(bitStringLength: number, value?: number) {
    super(value);
    this.bitStringLength = bitStringLength;
  }

  public encode(): string {
    return FixedIntegerEncoder.encode(this.value, this.bitStringLength);
  }

  public decode(bitString: string) {
    this.value = FixedIntegerEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    //TODO: validate
    return bitString.substring(fromIndex, fromIndex + this.bitStringLength);
  }
}
