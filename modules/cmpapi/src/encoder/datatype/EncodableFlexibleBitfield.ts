import { FixedBitfieldEncoder } from "./encoder/FixedBitfieldEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableFlexibleBitfield extends AbstractEncodableBitStringDataType<boolean[]> {
  private getLength: Function;

  constructor(getLength: () => number, value?: boolean[]) {
    super();
    this.getLength = getLength;
    this.setValue(value);
  }

  public encode(): string {
    return FixedBitfieldEncoder.encode(this.value, this.getLength());
  }

  public decode(bitString: string) {
    this.value = FixedBitfieldEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    return bitString.substring(fromIndex, fromIndex + this.getLength());
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
