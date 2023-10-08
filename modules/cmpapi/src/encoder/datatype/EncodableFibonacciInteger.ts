import { FibonacciIntegerEncoder } from "./encoder/FibonacciIntegerEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodingError } from "../error/EncodingError.js";
import { DecodingError } from "../error/DecodingError.js";
import { SubstringError } from "./SubstringError.js";
import { StringUtil } from "../util/index.js";

export class EncodableFibonacciInteger extends AbstractEncodableBitStringDataType<number> {
  constructor(value: number, hardFailIfMissing: boolean = true) {
    super(hardFailIfMissing);
    this.setValue(value);
  }

  public encode(): string {
    try {
      return FibonacciIntegerEncoder.encode(this.value);
    } catch (e) {
      throw new EncodingError(e);
    }
  }

  public decode(bitString: string) {
    try {
      this.value = FibonacciIntegerEncoder.decode(bitString);
    } catch (e) {
      throw new DecodingError(e);
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    try {
      let index = bitString.indexOf("11", fromIndex);
      if (index > 0) {
        return StringUtil.substring(bitString, fromIndex, index + 2);
      } else {
        return bitString;
      }
    } catch (e) {
      throw new SubstringError(e);
    }
  }
}
