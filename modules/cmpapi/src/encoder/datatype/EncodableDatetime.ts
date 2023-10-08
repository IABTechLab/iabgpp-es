import { DatetimeEncoder } from "./encoder/DatetimeEncoder.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { Predicate } from "./validate/Predicate.js";

export class EncodableDatetime extends AbstractEncodableBitStringDataType<Date> {
  constructor(value: Date) {
    super();
    this.setValue(value);
  }

  public encode(): string {
    return DatetimeEncoder.encode(this.value);
  }

  public decode(bitString: string) {
    this.value = DatetimeEncoder.decode(bitString);
  }

  public substring(bitString: string, fromIndex: number): string {
    return bitString.substring(fromIndex, fromIndex + 36);
  }
}
