import { BooleanEncoder } from "./encoder/BooleanEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodingError } from "../error/EncodingError.js";
import { DecodingError } from "../error/DecodingError.js";
import { SubstringError } from "./SubstringError.js";
import { StringUtil } from "../util/StringUtil.js";

export class EncodableBoolean extends AbstractEncodableBitStringDataType<boolean> {
  constructor(value: boolean, hardFailIfMissing: boolean = true) {
    super(hardFailIfMissing);
    this.setValue(value);
  }

  public encode(): string {
    try {
      return BooleanEncoder.encode(this.value);
    } catch (e) {
      throw new EncodingError(e);
    }
  }

  public decode(bitString: string) {
    try {
      this.value = BooleanEncoder.decode(bitString);
    } catch (e) {
      throw new DecodingError(e);
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    try {
      return StringUtil.substring(bitString, fromIndex, fromIndex + 1);
    } catch (e) {
      throw new SubstringError(e);
    }
  }
}
