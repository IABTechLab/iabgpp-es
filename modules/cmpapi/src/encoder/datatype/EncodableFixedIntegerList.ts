import { FixedIntegerListEncoder } from "./encoder/FixedIntegerListEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { Predicate } from "./validate/Predicate.js";

export class EncodableFixedIntegerList extends AbstractEncodableBitStringDataType<number[]> {
  private elementBitStringLength: number;
  private numElements: number;

  constructor(elementBitStringLength: number, value: number[]) {
    super();
    this.elementBitStringLength = elementBitStringLength;
    this.numElements = value.length;
    this.setValue(value);
  }

  public encode(): string {
    return FixedIntegerListEncoder.encode(this.value, this.elementBitStringLength, this.numElements);
  }

  public decode(bitString: string) {
    this.value = FixedIntegerListEncoder.decode(bitString, this.elementBitStringLength, this.numElements);
  }

  public substring(bitString: string, fromIndex: number): string {
    return bitString.substring(fromIndex, fromIndex + this.elementBitStringLength * this.numElements);
  }

  // Overriden
  public getValue(): number[] {
    return [...super.getValue()];
  }

  // Overriden
  public setValue(value: number[]) {
    let v = [...value];
    for (let i = v.length; i < this.numElements; i++) {
      v.push(0);
    }
    if (v.length > this.numElements) {
      v = v.slice(0, this.numElements);
    }
    super.setValue(v);
  }
}
