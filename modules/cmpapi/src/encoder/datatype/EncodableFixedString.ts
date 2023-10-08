import { FixedStringEncoder } from "./encoder/FixedStringEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodingError } from "../error/EncodingError.js";
import { DecodingError } from "../error/DecodingError.js";
import { SubstringError } from "./SubstringError.js";
import { StringUtil } from "../util/StringUtil.js";

export class EncodableFixedString extends AbstractEncodableBitStringDataType<string> {
  private stringLength: number;

  constructor(stringLength: number, value: string, hardFailIfMissing: boolean = true) {
    super(hardFailIfMissing);
    this.stringLength = stringLength;
    this.setValue(value);
  }

  public encode(): string {
    try {
      return FixedStringEncoder.encode(this.value, this.stringLength);
    } catch (e) {
      throw new EncodingError(e);
    }
  }

  public decode(bitString: string) {
    try {
      this.value = FixedStringEncoder.decode(bitString);
    } catch (e) {
      throw new DecodingError(e);
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    try {
      return StringUtil.substring(bitString, fromIndex, fromIndex + this.stringLength * 6);
    } catch (e) {
      throw new SubstringError(e);
    }
  }
}
