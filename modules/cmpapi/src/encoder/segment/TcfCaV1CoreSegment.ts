import { AbstractBase64UrlEncoder } from "../base64/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../base64/CompressedBase64UrlEncoder.js";
import { BitStringEncoder } from "../bitstring/BitStringEncoder.js";
import { EncodableBoolean } from "../datatype/EncodableBoolean.js";
import { EncodableDatetime } from "../datatype/EncodableDatetime.js";
import { EncodableFixedBitfield } from "../datatype/EncodableFixedBitfield.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedString } from "../datatype/EncodableFixedString.js";
import { EncodableOptimizedFixedRange } from "../datatype/EncodableOptimizedFixedRange.js";
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
    fields.put(TcfCaV1Field.TCF_POLICY_VERSION.toString(), new EncodableFixedInteger(6, 1));
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
    fields.put(TcfCaV1Field.VENDOR_EXPRESS_CONSENT.toString(), new EncodableOptimizedFixedRange([]));
    fields.put(TcfCaV1Field.VENDOR_IMPLIED_CONSENT.toString(), new EncodableOptimizedFixedRange([]));

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
    let bitString: string = this.base64UrlEncoder.decode(encodedString);
    this.bitStringEncoder.decode(bitString, this.getFieldNames(), fields);
  }
}