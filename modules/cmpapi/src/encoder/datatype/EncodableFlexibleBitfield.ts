import { FixedBitfieldEncoder } from "./encoder/FixedBitfieldEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodingError } from "../error/EncodingError.js";
import { DecodingError } from "../error/DecodingError.js";
import { SubstringError } from "./SubstringError.js";
import { StringUtil } from "../util/StringUtil.js";

export class EncodableFlexibleBitfield extends AbstractEncodableBitStringDataType<boolean[]> {
  private getLength: Function;

  constructor(getLength: () => number, value?: boolean[], hardFailIfMissing: boolean = true) {
    super(hardFailIfMissing);
    this.getLength = getLength;
    this.setValue(value);
  }

  public encode(): string {
    try {
      return FixedBitfieldEncoder.encode(this.value, this.getLength());
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
      return StringUtil.substring(bitString, fromIndex, fromIndex + this.getLength());
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
    let numElements = this.getLength();
    let v = [...value];
    for (let i = v.length; i < numElements; i++) {
      v.push(false);
    }
    if (v.length > numElements) {
      v = v.slice(0, numElements);
    }
    super.setValue([...v]);
  }
}
