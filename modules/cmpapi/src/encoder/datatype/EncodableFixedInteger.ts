import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodingError } from "../error/EncodingError.js";
import { DecodingError } from "../error/DecodingError.js";
import { SubstringError } from "./SubstringError.js";
import { StringUtil } from "../util/StringUtil.js";

export class EncodableFixedInteger extends AbstractEncodableBitStringDataType<number> {
  private bitStringLength: number;

  constructor(bitStringLength: number, value: number, hardFailIfMissing: boolean = true) {
    super(hardFailIfMissing);
    this.bitStringLength = bitStringLength;
    this.setValue(value);
  }

  public encode(): string {
    try {
      return FixedIntegerEncoder.encode(this.value, this.bitStringLength);
    } catch (e) {
      throw new EncodingError(e);
    }
  }

  public decode(bitString: string) {
    try {
      this.value = FixedIntegerEncoder.decode(bitString);
    } catch (e) {
      throw new DecodingError(e);
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    try {
      return StringUtil.substring(bitString, fromIndex, fromIndex + this.bitStringLength);
    } catch (e) {
      throw new SubstringError(e);
    }
  }
}
