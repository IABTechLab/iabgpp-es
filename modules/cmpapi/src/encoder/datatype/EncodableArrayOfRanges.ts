import { DecodingError } from "../error/DecodingError.js";
import { EncodingError } from "../error/EncodingError.js";
import { StringUtil } from "../util/StringUtil.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodableFixedIntegerRange } from "./EncodableFixedIntegerRange.js";
import { EncodableOptimizedFixedRange } from "./EncodableOptimizedFixedRange.js";
import { RangeEntry } from "./RangeEntry.js";
import { SubstringError } from "./SubstringError.js";
import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { OptimizedFixedRangeEncoder } from "./encoder/OptimizedFixedRangeEncoder.js";

export class EncodableArrayOfRanges extends AbstractEncodableBitStringDataType<RangeEntry[]> {
  private keyBitStringLength: number;
  private typeBitStringLength: number;

  constructor(
    keyBitStringLength: number,
    typeBitStringLength: number,
    value?: RangeEntry[],
    hardFailIfMissing: boolean = true
  ) {
    super(hardFailIfMissing);
    this.keyBitStringLength = keyBitStringLength;
    this.typeBitStringLength = typeBitStringLength;
    this.setValue(value);
  }

  public encode(): string {
    try {
      let entries: RangeEntry[] = this.value;
      let sb = "";
      sb += FixedIntegerEncoder.encode(entries.length, 12);
      for (let i = 0; i < entries.length; i++) {
        let entry: RangeEntry = entries[i];
        sb += FixedIntegerEncoder.encode(entry.getKey(), this.keyBitStringLength);
        sb += FixedIntegerEncoder.encode(entry.getType(), this.typeBitStringLength);
        sb += OptimizedFixedRangeEncoder.encode(entry.getIds());
      }
      return sb;
    } catch (e) {
      throw new EncodingError(e);
    }
  }

  public decode(bitString: string) {
    try {
      let entries: RangeEntry[] = [];
      let size = FixedIntegerEncoder.decode(StringUtil.substring(bitString, 0, 12));
      let index = 12;
      for (let i = 0; i < size; i++) {
        let key = FixedIntegerEncoder.decode(StringUtil.substring(bitString, index, index + this.keyBitStringLength));
        index += this.keyBitStringLength;

        let type = FixedIntegerEncoder.decode(StringUtil.substring(bitString, index, index + this.typeBitStringLength));
        index += this.typeBitStringLength;

        let substring = new EncodableOptimizedFixedRange([]).substring(bitString, index);
        let ids = OptimizedFixedRangeEncoder.decode(substring);
        index += substring.length;

        entries.push(new RangeEntry(key, type, ids));
      }
      this.value = entries;
    } catch (e) {
      throw new DecodingError(e);
    }
  }

  public substring(bitString: string, fromIndex: number): string {
    try {
      let sb = "";
      sb += StringUtil.substring(bitString, fromIndex, fromIndex + 12);

      let size = FixedIntegerEncoder.decode(sb.toString());

      let index = fromIndex + sb.length;
      for (let i = 0; i < size; i++) {
        sb += StringUtil.substring(bitString, index, index + 8);
        index += 8;

        let substring = null;
        let max = FixedIntegerEncoder.decode(StringUtil.substring(bitString, index, index + 16));
        if (bitString.charAt(index + 16) == "1") {
          substring =
            StringUtil.substring(bitString, index, index + 17) +
            new EncodableFixedIntegerRange([]).substring(bitString, index + 17);
        } else {
          substring = StringUtil.substring(bitString, index, index + 17 + max);
        }
        index += substring.length();

        sb += substring;
      }
      return sb;
    } catch (e) {
      throw new SubstringError(e);
    }
  }
}
