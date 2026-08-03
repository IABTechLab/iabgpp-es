import { AbstractBase64UrlEncoder } from "../base64/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../base64/CompressedBase64UrlEncoder.js";
import { BitStringEncoder } from "../bitstring/BitStringEncoder.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableOptimizedFibonacciRange } from "../datatype/EncodableOptimizedFibonacciRange.js";
import { EncodableOptimizedFixedRange } from "../datatype/EncodableOptimizedFixedRange.js";
import { DecodingError } from "../error/DecodingError.js";
import { EncodableBitStringFields } from "../field/EncodableBitStringFields.js";
import { TCFCAV1_DISCLOSED_VENDORS_SEGMENT_FIELD_NAMES } from "../field/TcfCaV1Field.js";
import { TcfCaV1Field } from "../field/TcfCaV1Field.js";
import { AbstractLazilyEncodableSegment } from "./AbstractLazilyEncodableSegment.js";

export class TcfCaV1DisclosedVendorsSegment extends AbstractLazilyEncodableSegment<EncodableBitStringFields> {
  private base64UrlEncoder: AbstractBase64UrlEncoder = CompressedBase64UrlEncoder.getInstance();
  private bitStringEncoder: BitStringEncoder = BitStringEncoder.getInstance();

  constructor(encodedString?: string) {
    super();
    if (encodedString) {
      this.decode(encodedString);
    }
  }

  // overriden
  public getFieldNames(): string[] {
    return TCFCAV1_DISCLOSED_VENDORS_SEGMENT_FIELD_NAMES;
  }

  // overriden
  protected initializeFields(): EncodableBitStringFields {
    return this.buildFields(false);
  }

  /**
   * Builds the disclosed-vendors field set. When legacy is true the OptimizedRange field uses the
   * pre-fix fixed-integer encoder; otherwise it uses the spec-compliant Fibonacci encoder. The
   * legacy field set is only used to decode strings produced by the older encoder (see
   * decodeSegment).
   */
  private buildFields(legacy: boolean): EncodableBitStringFields {
    let fields: EncodableBitStringFields = new EncodableBitStringFields();
    fields.put(TcfCaV1Field.DISCLOSED_VENDORS_SEGMENT_TYPE.toString(), new EncodableFixedInteger(3, 1));
    if (legacy) {
      fields.put(TcfCaV1Field.DISCLOSED_VENDORS.toString(), new EncodableOptimizedFixedRange([]));
    } else {
      fields.put(TcfCaV1Field.DISCLOSED_VENDORS.toString(), new EncodableOptimizedFibonacciRange([]));
    }
    return fields;
  }

  // overriden
  protected encodeSegment(fields: EncodableBitStringFields): string {
    let bitString: string = this.bitStringEncoder.encode(fields, this.getFieldNames());
    let encodedString: string = this.base64UrlEncoder.encode(bitString);
    return encodedString;
  }

  // overriden
  protected decodeSegment(encodedString: string, fields: EncodableBitStringFields): void {
    if (encodedString == null || encodedString.length === 0) {
      this.fields.reset(fields);
    }
    try {
      let bitString: string = this.base64UrlEncoder.decode(encodedString);

      // Prefer the spec-compliant (Fibonacci OptimizedRange) interpretation, falling back to the
      // legacy (fixed-range) interpretation used by the pre-fix encoder. Re-encoding always
      // migrates to the spec-compliant format because the values decode into the Fibonacci datatype.
      if (this.tryDecode(bitString, fields, false)) {
        return;
      }
      if (this.tryDecode(bitString, fields, true)) {
        return;
      }

      this.bitStringEncoder.decode(bitString, this.getFieldNames(), fields);
    } catch (e) {
      throw new DecodingError("Unable to decode TcfCaV1DisclosedVendorsSegment '" + encodedString + "'");
    }
  }

  /**
   * Attempts to decode bitString using either the current or legacy field set and verifies the
   * result by re-encoding it: if the re-encoded bits are a prefix of the decoded bits (the tail
   * being base64 padding), the interpretation produced the string. On success the decoded values
   * are copied into targetFields (which always use the current encoders) so that any subsequent
   * re-encode emits the spec-compliant format.
   */
  private tryDecode(bitString: string, targetFields: EncodableBitStringFields, legacy: boolean): boolean {
    try {
      let candidate = this.buildFields(legacy);
      this.bitStringEncoder.decode(bitString, this.getFieldNames(), candidate);
      let reEncoded = this.bitStringEncoder.encode(candidate, this.getFieldNames());
      if (bitString.startsWith(reEncoded)) {
        for (let fieldName of this.getFieldNames()) {
          targetFields.get(fieldName).setValue(candidate.get(fieldName).getValue());
        }
        return true;
      }
    } catch (e) {
      // This interpretation does not apply; the caller will try the next one.
    }
    return false;
  }
}
