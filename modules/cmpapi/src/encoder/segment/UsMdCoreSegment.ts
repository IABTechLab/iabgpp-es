import { AbstractBase64UrlEncoder } from "../base64/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../base64/CompressedBase64UrlEncoder.js";
import { BitStringEncoder } from "../bitstring/BitStringEncoder.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { Predicate } from "../datatype/validate/Predicate.js";
import { DecodingError } from "../error/DecodingError.js";
import { EncodableBitStringFields } from "../field/EncodableBitStringFields.js";
import { UsMd_CORE_SEGMENT_FIELD_NAMES } from "../field/UsMdField.js";
import { UsMdField } from "../field/UsMdField.js";
import { UsMd } from "../section/UsMd.js";
import { AbstractLazilyEncodableSegment } from "./AbstractLazilyEncodableSegment.js";

export class UsMdCoreSegment extends AbstractLazilyEncodableSegment<EncodableBitStringFields> {
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
    return UsMd_CORE_SEGMENT_FIELD_NAMES;
  }

  // overriden
  protected initializeFields(): EncodableBitStringFields {
    const nullableBooleanAsTwoBitIntegerValidator = new (class implements Predicate<number> {
      test(n: number): boolean {
        return n >= 0 && n <= 2;
      }
    })();

    const nonNullableBooleanAsTwoBitIntegerValidator = new (class implements Predicate<number> {
      test(n: number): boolean {
        return n >= 1 && n <= 2;
      }
    })();

    let fields: EncodableBitStringFields = new EncodableBitStringFields();
    fields.put(UsMdField.MSPA_VERSION.toString(), new EncodableFixedInteger(6, UsMd.VERSION));
    fields.put(
      UsMdField.MSPA_COVERED_TRANSACTION.toString(),
      new EncodableFixedInteger(2, 1).withValidator(nonNullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsMdField.MSPA_MODE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsMdField.PROCESSING_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsMdField.SALE_OPT_OUT_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsMdField.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsMdField.SALE_OPT_OUT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsMdField.TARGETED_ADVERTISING_OPT_OUT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsMdField.ADDITIONAL_DATA_PROCESSING_CONSENT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
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
      this.bitStringEncoder.decode(bitString, this.getFieldNames(), fields);
    } catch (e) {
      throw new DecodingError("Unable to decode UsMdCoreSegment '" + encodedString + "'");
    }
  }
}
