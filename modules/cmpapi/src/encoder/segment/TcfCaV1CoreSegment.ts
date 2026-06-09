import { AbstractBase64UrlEncoder } from "../base64/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../base64/CompressedBase64UrlEncoder.js";
import { BitStringEncoder } from "../bitstring/BitStringEncoder.js";
import { EncodableArrayOfFixedIntegerRanges } from "../datatype/EncodableArrayOfFixedIntegerRanges.js";
import { EncodableArrayOfOptimizedFibonacciRanges } from "../datatype/EncodableArrayOfOptimizedFibonacciRanges.js";
import { EncodableBoolean } from "../datatype/EncodableBoolean.js";
import { EncodableDatetime } from "../datatype/EncodableDatetime.js";
import { EncodableFixedBitfield } from "../datatype/EncodableFixedBitfield.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedString } from "../datatype/EncodableFixedString.js";
import { EncodableOptimizedFibonacciRange } from "../datatype/EncodableOptimizedFibonacciRange.js";
import { EncodableOptimizedFixedRange } from "../datatype/EncodableOptimizedFixedRange.js";
import { DecodingError } from "../error/DecodingError.js";
import { EncodableBitStringFields } from "../field/EncodableBitStringFields.js";
import { TCFCAV1_CORE_SEGMENT_FIELD_NAMES } from "../field/TcfCaV1Field.js";
import { TcfCaV1Field } from "../field/TcfCaV1Field.js";
import { TcfCaV1 } from "../section/TcfCaV1.js";
import { AbstractLazilyEncodableSegment } from "./AbstractLazilyEncodableSegment.js";

export class TcfCaV1CoreSegment extends AbstractLazilyEncodableSegment<EncodableBitStringFields> {
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
    return TCFCAV1_CORE_SEGMENT_FIELD_NAMES;
  }

  // overriden
  protected initializeFields(): EncodableBitStringFields {
    return this.buildFields(false);
  }

  /**
   * Builds the core field set. When legacy is true the OptimizedRange / N-ArrayOfRanges fields use
   * the pre-fix fixed-integer encoders; otherwise they use the spec-compliant Fibonacci encoders.
   * The legacy field set is only used to decode strings produced by the older encoder (see
   * decodeSegment).
   */
  private buildFields(legacy: boolean): EncodableBitStringFields {
    let date = new Date();

    let fields: EncodableBitStringFields = new EncodableBitStringFields();
    fields.put(TcfCaV1Field.VERSION.toString(), new EncodableFixedInteger(6, TcfCaV1.VERSION));
    fields.put(TcfCaV1Field.CREATED.toString(), new EncodableDatetime(date));
    fields.put(TcfCaV1Field.LAST_UPDATED.toString(), new EncodableDatetime(date));
    fields.put(TcfCaV1Field.CMP_ID.toString(), new EncodableFixedInteger(12, 0));
    fields.put(TcfCaV1Field.CMP_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.put(TcfCaV1Field.CONSENT_SCREEN.toString(), new EncodableFixedInteger(6, 0));
    fields.put(TcfCaV1Field.CONSENT_LANGUAGE.toString(), new EncodableFixedString(2, "EN"));
    fields.put(TcfCaV1Field.VENDOR_LIST_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.put(TcfCaV1Field.TCF_POLICY_VERSION.toString(), new EncodableFixedInteger(6, 2));
    fields.put(TcfCaV1Field.USE_NON_STANDARD_STACKS.toString(), new EncodableBoolean(false));
    fields.put(
      TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT.toString(),
      new EncodableFixedBitfield([false, false, false, false, false, false, false, false, false, false, false, false])
    );
    fields.put(
      TcfCaV1Field.PURPOSES_EXPRESS_CONSENT.toString(),
      new EncodableFixedBitfield([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ])
    );
    fields.put(
      TcfCaV1Field.PURPOSES_IMPLIED_CONSENT.toString(),
      new EncodableFixedBitfield([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ])
    );
    if (legacy) {
      fields.put(TcfCaV1Field.VENDOR_EXPRESS_CONSENT.toString(), new EncodableOptimizedFixedRange([]));
      fields.put(TcfCaV1Field.VENDOR_IMPLIED_CONSENT.toString(), new EncodableOptimizedFixedRange([]));
      fields.put(TcfCaV1Field.PUB_RESTRICTIONS.toString(), new EncodableArrayOfFixedIntegerRanges(6, 2, [], false));
    } else {
      fields.put(TcfCaV1Field.VENDOR_EXPRESS_CONSENT.toString(), new EncodableOptimizedFibonacciRange([]));
      fields.put(TcfCaV1Field.VENDOR_IMPLIED_CONSENT.toString(), new EncodableOptimizedFibonacciRange([]));
      fields.put(
        TcfCaV1Field.PUB_RESTRICTIONS.toString(),
        new EncodableArrayOfOptimizedFibonacciRanges(6, 2, [], false)
      );
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

      // Prefer the spec-compliant (Fibonacci OptimizedRange) interpretation. If that doesn't
      // round-trip back to the input, fall back to the legacy (fixed-range) interpretation used by
      // the pre-fix encoder. This keeps older strings decodable; re-encoding always migrates them
      // to the spec-compliant format because the fields decode into the Fibonacci datatypes.
      if (this.tryDecode(bitString, fields, false)) {
        return;
      }
      if (this.tryDecode(bitString, fields, true)) {
        return;
      }

      // Neither interpretation round-trips cleanly; decode with the current interpretation as a
      // best effort and surface any decoding error.
      this.bitStringEncoder.decode(bitString, this.getFieldNames(), fields);
    } catch (e) {
      throw new DecodingError("Unable to decode TcfCaV1CoreSegment '" + encodedString + "'");
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
