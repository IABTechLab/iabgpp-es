import { DecodingError } from "../../error/DecodingError.js";
import { FixedIntegerEncoder } from "./FixedIntegerEncoder.js";

export class DatetimeEncoder {
  public static encode(value: Date): string {
    return FixedIntegerEncoder.encode(Math.round(value.getTime() / 100), 36);
  }

  public static decode(bitString: string): Date {
    if (!/^[0-1]*$/.test(bitString) || bitString.length !== 36) {
      throw new DecodingError("Undecodable Datetime '" + bitString + "'");
    }

    return new Date(FixedIntegerEncoder.decode(bitString) * 100);
  }
}
