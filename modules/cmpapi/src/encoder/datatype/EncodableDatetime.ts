import { DatetimeEncoder } from "./encoder/DatetimeEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodingError } from "../error/EncodingError.js";
import { DecodingError } from "../error/DecodingError.js";
import { SubstringError } from "./SubstringError.js";
import { StringUtil } from "../util/index.js";

export class EncodableDatetime extends AbstractEncodableBitStringDataType<Date> {
  constructor(value: Date, hardFailIfMissing: boolean = true) {
    super(hardFailIfMissing);
    this.setValue(value);
  }

  public encode(): string {
    try {
      return DatetimeEncoder.encode(this.value);
    } catch (e) {
      throw new EncodingError(e);
    }
  }

  public decode(bitString: string) {
    try {
      this.value = DatetimeEncoder.decode(bitString);
    } catch (e) {
      throw new DecodingError(e);
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    try {
      return StringUtil.substring(bitString, fromIndex, fromIndex + 36);
    } catch (e) {
      throw new SubstringError(e);
    }
  }
}
