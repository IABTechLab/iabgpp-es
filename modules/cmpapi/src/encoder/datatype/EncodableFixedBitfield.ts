import { FixedBitfieldEncoder } from "./encoder/FixedBitfieldEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableFixedBitfield extends AbstractEncodableBitStringDataType<boolean[]> {
  private numElements: number;

  constructor(value: boolean[]) {
    super();
    this.numElements = value.length;
    this.setValue(value);
  }

  public encode(): string {
    return FixedBitfieldEncoder.encode(this.value, this.numElements);
  }

  public decode(bitString: string) {
    this.value = FixedBitfieldEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    //TODO: validate
    return bitString.substring(fromIndex, fromIndex + this.numElements);
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
