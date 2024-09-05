import { DecodingError } from "../error/DecodingError.js";
import { EncodingError } from "../error/EncodingError.js";
import { StringUtil } from "../util/StringUtil.js";
import { AbstractEncodableBitStringDataType } from "./AbstractEncodableBitStringDataType.js";
import { EncodableFixedIntegerRange } from "./EncodableFixedIntegerRange.js";
import { RangeEntry } from "./RangeEntry.js";
import { SubstringError } from "./SubstringError.js";
import { FixedIntegerEncoder } from "./encoder/FixedIntegerEncoder.js";
import { FixedIntegerRangeEncoder } from "./encoder/FixedIntegerRangeEncoder.js";

export class EncodableArrayOfFixedIntegerRanges extends AbstractEncodableBitStringDataType<RangeEntry[]> {
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
        sb += FixedIntegerRangeEncoder.encode(entry.getIds());
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

        let substring = new EncodableFixedIntegerRange([]).substring(bitString, index);
        let ids = FixedIntegerRangeEncoder.decode(substring);
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
        let keySubstring = StringUtil.substring(bitString, index, index + this.keyBitStringLength);
        index += keySubstring.length;
        sb += keySubstring;

        let typeSubstring = StringUtil.substring(bitString, index, index + this.typeBitStringLength);
        index += typeSubstring.length;
        sb += typeSubstring;

        let rangeSubstring = new EncodableFixedIntegerRange([]).substring(bitString, index);
        index += rangeSubstring.length;
        sb += rangeSubstring;
      }
      return sb;
    } catch (e) {
      throw new SubstringError(e);
    }
  }
}
