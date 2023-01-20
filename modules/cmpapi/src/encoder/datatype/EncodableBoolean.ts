import { BooleanEncoder } from "./encoder/BooleanEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableBoolean extends AbstractEncodableBitStringDataType<boolean> {
  constructor(value: boolean) {
    super();
    this.setValue(value);
  }

  public encode(): string {
    return BooleanEncoder.encode(this.value);
  }

  public decode(bitString: string) {
    this.value = BooleanEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    //TODO: validate
    return bitString.substring(fromIndex, fromIndex + 1);
  }
}
