import { FixedIntegerListEncoder } from "./encoder/FixedIntegerListEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";

export class EncodableFixedIntegerList extends AbstractEncodableBitStringDataType<number[]> {
  private elementBitStringLength: number;
  private numElements: number;

  constructor(elementBitStringLength: number, numElements: number, value?: number[]) {
    super(value);
    this.elementBitStringLength = elementBitStringLength;
    this.numElements = numElements;
  }

  public encode(): string {
    return FixedIntegerListEncoder.encode(this.value, this.elementBitStringLength, this.numElements);
  }

  public decode(bitString: string) {
    this.value = FixedIntegerListEncoder.decode(bitString, this.elementBitStringLength, this.numElements);
  }

  public substring(bitString: string, fromIndex: number): string {
    //TODO: validate
    return bitString.substring(fromIndex, fromIndex + this.elementBitStringLength * this.numElements);
  }
}
