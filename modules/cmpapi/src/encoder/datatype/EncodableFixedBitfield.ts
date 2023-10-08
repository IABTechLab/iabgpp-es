import { FixedBitfieldEncoder } from "./encoder/FixedBitfieldEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodingError } from "../error/EncodingError.js";
import { DecodingError } from "../error/DecodingError.js";
import { SubstringError } from "./SubstringError.js";
import { StringUtil } from "../util/StringUtil.js";

export class EncodableFixedBitfield extends AbstractEncodableBitStringDataType<boolean[]> {
  private numElements: number;

  constructor(value: boolean[], hardFailIfMissing: boolean = true) {
    super(hardFailIfMissing);
    this.numElements = value.length;
    this.setValue(value);
  }

  public encode(): string {
    try {
      return FixedBitfieldEncoder.encode(this.value, this.numElements);
    } catch (e) {
      throw new EncodingError(e);
    }
  }

  public decode(bitString: string) {
    try {
      this.value = FixedBitfieldEncoder.decode(bitString);
    } catch (e) {
      throw new DecodingError(e);
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    try {
      return StringUtil.substring(bitString, fromIndex, fromIndex + this.numElements);
    } catch (e) {
      throw new SubstringError(e);
    }
  }

  // Overriden
  public getValue(): boolean[] {
    return [...super.getValue()];
  }

  // Overriden
  public setValue(value: boolean[]) {
    let v = [...value];
    for (let i = v.length; i < this.numElements; i++) {
      v.push(false);
    }
    if (v.length > this.numElements) {
      v = v.slice(0, this.numElements);
    }
    super.setValue(v);
  }
}
