import { FixedBitfieldEncoder } from "./encoder/FixedBitfieldEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableFlexibleBitfield extends AbstractEncodableBitStringDataType<boolean[]> {
  private getLength: Function;

  constructor(getLength: () => number, value?: boolean[]) {
    super(value);
    this.getLength = getLength;
  }

  public encode(): string {
    return FixedBitfieldEncoder.encode(this.value, this.getLength());
  }

  public decode(bitString: string) {
    this.value = FixedBitfieldEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    //TODO: validate
    return bitString.substring(fromIndex, fromIndex + this.getLength());
  }
}
