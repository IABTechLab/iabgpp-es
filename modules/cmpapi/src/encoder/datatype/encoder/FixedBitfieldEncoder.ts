import { DecodingError } from "../../error/DecodingError.js";
import { FixedIntegerEncoder } from "./FixedIntegerEncoder.js";

export class FixedBitfieldEncoder {
  public static encode(value: number[], bitStringLength: number): string {
    let bitString = "";
    for (let i = 0; i < value.length; i++) {
      bitString += FixedIntegerEncoder.encode(value[i], 1);
    }

    while (bitString.length < bitStringLength) {
      bitString += "0";
    }

    return bitString;
  }

  public static decode(bitString: string): number[] {
    if (!/^[0-1]*$/.test(bitString)) {
      throw new DecodingError("Undecodable FixedBitfield '" + bitString + "'");
    }

    let value: number[] = [];
    for (let i = 0; i < bitString.length; i++) {
      value.push(FixedIntegerEncoder.decode(bitString.substring(i, i + 1)));
    }
    return value;
  }
}
