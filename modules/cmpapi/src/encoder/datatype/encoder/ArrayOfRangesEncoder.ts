import { DecodingError } from "../../error/DecodingError.js";
import { EncodingError } from "../../error/EncodingError.js";

export class ArrayOfRangesEncoder {
  public static encode(value: boolean): string {
    if (value === true) {
      return "1";
    } else if (value === false) {
      return "0";
    } else {
      throw new EncodingError("Unencodable Boolean '" + value + "'");
    }
  }

  public static decode(bitString: string): boolean {
    if (bitString === "1") {
      return true;
    } else if (bitString === "0") {
      return false;
    } else {
      throw new DecodingError("Undecodable Boolean '" + bitString + "'");
    }
  }
}
