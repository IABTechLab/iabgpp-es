import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { EncodableBoolean } from "../datatype/EncodableBoolean.js";
import { EncodableDatetime } from "../datatype/EncodableDatetime.js";
import { EncodableFlexibleBitfield } from "../datatype/EncodableFlexibleBitfield.js";
import { EncodableFixedBitfield } from "../datatype/EncodableFixedBitfield.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedString } from "../datatype/EncodableFixedString.js";
import { AbstractEncodableSegmentedBitStringSection } from "./AbstractEncodableSegmentedBitStringSection.js";
import { EncodableOptimizedFixedRange } from "../datatype/EncodableOptimizedFixedRange.js";
import { DecodingError } from "../error/DecodingError.js";
import { TcfCaV1Field } from "../field/TcfCaV1Field.js";
import { AbstractBase64UrlEncoder } from "../datatype/encoder/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../datatype/encoder/CompressedBase64UrlEncoder.js";
import { EncodableArrayOfFixedIntegerRanges } from "../datatype/EncodableArrayOfFixedIntegerRanges.js";

export class TcfCaV1 extends AbstractEncodableSegmentedBitStringSection {
  public static readonly ID = 5;
  public static readonly VERSION = 1;
  public static readonly NAME = "tcfcav1";

  private base64UrlEncoder: AbstractBase64UrlEncoder = new CompressedBase64UrlEncoder();

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();

    let date = new Date();

    // core section
    fields.set(TcfCaV1Field.VERSION.toString(), new EncodableFixedInteger(6, TcfCaV1.VERSION));
    fields.set(TcfCaV1Field.CREATED.toString(), new EncodableDatetime(date));
    fields.set(TcfCaV1Field.LAST_UPDATED.toString(), new EncodableDatetime(date));
    fields.set(TcfCaV1Field.CMP_ID.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfCaV1Field.CMP_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfCaV1Field.CONSENT_SCREEN.toString(), new EncodableFixedInteger(6, 0));
    fields.set(TcfCaV1Field.CONSENT_LANGUAGE.toString(), new EncodableFixedString(2, "EN"));
    fields.set(TcfCaV1Field.VENDOR_LIST_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfCaV1Field.TCF_POLICY_VERSION.toString(), new EncodableFixedInteger(6, 2));
    fields.set(TcfCaV1Field.USE_NON_STANDARD_STACKS.toString(), new EncodableBoolean(false));
    fields.set(
      TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT.toString(),
      new EncodableFixedBitfield([false, false, false, false, false, false, false, false, false, false, false, false])
    );
    fields.set(
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
    fields.set(
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
    fields.set(TcfCaV1Field.VENDOR_EXPRESS_CONSENT.toString(), new EncodableOptimizedFixedRange([]));
    fields.set(TcfCaV1Field.VENDOR_IMPLIED_CONSENT.toString(), new EncodableOptimizedFixedRange([]));
    fields.set(TcfCaV1Field.PUB_RESTRICTIONS, new EncodableArrayOfFixedIntegerRanges(6, 2, [], false));

    // publisher purposes segment
    fields.set(TcfCaV1Field.SEGMENT_TYPE.toString(), new EncodableFixedInteger(3, 3));
    fields.set(
      TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT.toString(),
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
    fields.set(
      TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT.toString(),
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

    let numCustomPurposes = new EncodableFixedInteger(6, 0);
    fields.set(TcfCaV1Field.NUM_CUSTOM_PURPOSES.toString(), numCustomPurposes);

    fields.set(
      TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT.toString(),
      new EncodableFlexibleBitfield(() => {
        return numCustomPurposes.getValue();
      }, [])
    );

    fields.set(
      TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT.toString(),
      new EncodableFlexibleBitfield(() => {
        return numCustomPurposes.getValue();
      }, [])
    );

    // disclosed vendors segment
    fields.set(TcfCaV1Field.DISCLOSED_VENDORS_SEGMENT_TYPE, new EncodableFixedInteger(3, 1));
    fields.set(TcfCaV1Field.DISCLOSED_VENDORS, new EncodableOptimizedFixedRange([]));

    let coreSegment = [
      TcfCaV1Field.VERSION.toString(),
      TcfCaV1Field.CREATED.toString(),
      TcfCaV1Field.LAST_UPDATED.toString(),
      TcfCaV1Field.CMP_ID.toString(),
      TcfCaV1Field.CMP_VERSION.toString(),
      TcfCaV1Field.CONSENT_SCREEN.toString(),
      TcfCaV1Field.CONSENT_LANGUAGE.toString(),
      TcfCaV1Field.VENDOR_LIST_VERSION.toString(),
      TcfCaV1Field.TCF_POLICY_VERSION.toString(),
      TcfCaV1Field.USE_NON_STANDARD_STACKS.toString(),
      TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT.toString(),
      TcfCaV1Field.PURPOSES_EXPRESS_CONSENT.toString(),
      TcfCaV1Field.PURPOSES_IMPLIED_CONSENT.toString(),
      TcfCaV1Field.VENDOR_EXPRESS_CONSENT.toString(),
      TcfCaV1Field.VENDOR_IMPLIED_CONSENT.toString(),
      TcfCaV1Field.PUB_RESTRICTIONS.toString(),
    ];

    let publisherPurposesSegment = [
      TcfCaV1Field.SEGMENT_TYPE.toString(),
      TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT.toString(),
      TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT.toString(),
      TcfCaV1Field.NUM_CUSTOM_PURPOSES.toString(),
      TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT.toString(),
      TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT.toString(),
    ];

    let disclosedVendorsSegment = [TcfCaV1Field.DISCLOSED_VENDORS_SEGMENT_TYPE, TcfCaV1Field.DISCLOSED_VENDORS];

    let segments = [coreSegment, publisherPurposesSegment, disclosedVendorsSegment];

    super(fields, segments);

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public encode(): string {
    let segmentBitStrings = this.encodeSegmentsToBitStrings();
    let encodedSegments = [];
    encodedSegments.push(this.base64UrlEncoder.encode(segmentBitStrings[0]));
    if (segmentBitStrings[1] && segmentBitStrings[1].length > 0) {
      encodedSegments.push(this.base64UrlEncoder.encode(segmentBitStrings[1]));
      if (
        segmentBitStrings[2] &&
        segmentBitStrings[2].length > 0 &&
        this.getFieldValue(TcfCaV1Field.DISCLOSED_VENDORS).length > 0
      ) {
        encodedSegments.push(this.base64UrlEncoder.encode(segmentBitStrings[2]));
      }
    }

    return encodedSegments.join(".");
  }

  //Overriden
  public decode(encodedSection: string): void {
    let encodedSegments = encodedSection.split(".");
    let segmentBitStrings = [];
    for (let i = 0; i < encodedSegments.length; i++) {
      /**
       * first char will contain 6 bits, we only need the first 3. In version 1
       * and 2 of the TC string there is no segment type for the CORE string.
       * Instead the first 6 bits are reserved for the encoding version, but
       * because we're only on a maximum of encoding version 2 the first 3 bits
       * in the core segment will evaluate to 0.
       */
      let segmentBitString = this.base64UrlEncoder.decode(encodedSegments[i]);
      switch (segmentBitString.substring(0, 3)) {
        // unfortunately, the segment ordering doesn't match the segment ids
        case "000": {
          segmentBitStrings[0] = segmentBitString;
          break;
        }
        case "001": {
          segmentBitStrings[2] = segmentBitString;
          break;
        }
        case "011": {
          segmentBitStrings[1] = segmentBitString;
          break;
        }
        default: {
          throw new DecodingError("Unable to decode segment '" + encodedSegments[i] + "'");
        }
      }
    }
    this.decodeSegmentsFromBitStrings(segmentBitStrings);
  }

  //Overriden
  public setFieldValue(fieldName: string, value: any): void {
    super.setFieldValue(fieldName, value);
    if (fieldName !== TcfCaV1Field.CREATED.toString() && fieldName !== TcfCaV1Field.LAST_UPDATED.toString()) {
      const date = new Date();
      const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

      this.setFieldValue(TcfCaV1Field.CREATED.toString(), utcDate);
      this.setFieldValue(TcfCaV1Field.LAST_UPDATED.toString(), utcDate);
    }
  }

  //Overriden
  public getId(): number {
    return TcfCaV1.ID;
  }

  //Overriden
  public getName(): string {
    return TcfCaV1.NAME;
  }
}
