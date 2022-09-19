import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { EncodableBoolean } from "../datatype/EncodableBoolean.js";
import { EncodableDatetime } from "../datatype/EncodableDatetime.js";
import { EncodableFlexibleBitfield } from "../datatype/EncodableFlexibleBitfield.js";
import { EncodableFixedBitfield } from "../datatype/EncodableFixedBitfield.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedString } from "../datatype/EncodableFixedString.js";
import { AbstractEncodableSegmentedBitStringSection } from "./AbstractEncodableSegmentedBitStringSection.js";
import { EncodableFixedIntegerRange } from "../datatype/EncodableFixedIntegerRange.js";
import { EncodableOptimizedFixedRange } from "../datatype/EncodableOptimizedFixedRange.js";
import { DecodingError } from "../error/DecodingError.js";
import { Base64UrlEncoder } from "../datatype/encoder/Base64UrlEncoder.js";
import { TcfEuV2Field } from "../field/TcfEuV2Field.js";

export class TcfEuV2 extends AbstractEncodableSegmentedBitStringSection {
  public static readonly ID = 5;
  public static readonly VERSION = 2;
  public static readonly NAME = "tcfeuv2";

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();

    // core section
    fields.set(TcfEuV2Field.VERSION.toString(), new EncodableFixedInteger(6, TcfEuV2.VERSION));
    fields.set(TcfEuV2Field.CREATED.toString(), new EncodableDatetime());
    fields.set(TcfEuV2Field.LAST_UPDATED.toString(), new EncodableDatetime());
    fields.set(TcfEuV2Field.CMP_ID.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfEuV2Field.CMP_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfEuV2Field.CONSENT_SCREEN.toString(), new EncodableFixedInteger(6, 0));
    fields.set(TcfEuV2Field.CONSENT_LANGUAGE.toString(), new EncodableFixedString(2, "EN"));
    fields.set(TcfEuV2Field.VENDOR_LIST_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfEuV2Field.POLICY_VERSION.toString(), new EncodableFixedInteger(6, 2));
    fields.set(TcfEuV2Field.IS_SERVICE_SPECIFIC.toString(), new EncodableBoolean(false));
    fields.set(TcfEuV2Field.USE_NON_STANDARD_STACKS.toString(), new EncodableBoolean(false));
    fields.set(TcfEuV2Field.SPECIAL_FEATURE_OPTINS.toString(), new EncodableFixedBitfield(12, []));
    fields.set(TcfEuV2Field.PURPOSE_CONSENTS.toString(), new EncodableFixedBitfield(24, []));
    fields.set(TcfEuV2Field.PURPOSE_LEGITIMATE_INTERESTS.toString(), new EncodableFixedBitfield(24, []));
    fields.set(TcfEuV2Field.PURPOSE_ONE_TREATMENT.toString(), new EncodableBoolean(false));
    fields.set(TcfEuV2Field.PUBLISHER_COUNTRY_CODE.toString(), new EncodableFixedString(2, "AA"));
    fields.set(TcfEuV2Field.VENDOR_CONSENTS.toString(), new EncodableFixedIntegerRange([]));
    fields.set(TcfEuV2Field.VENDOR_LEGITIMATE_INTERESTS.toString(), new EncodableFixedIntegerRange([]));

    fields.set(TcfEuV2Field.PUBLISHER_RESTRICTIONS.toString(), new EncodableFixedIntegerRange([]));

    // publisher purposes segment
    fields.set(TcfEuV2Field.PUBLISHER_PURPOSES_SEGMENT_TYPE.toString(), new EncodableFixedInteger(3, 3));
    fields.set(TcfEuV2Field.PUBLISHER_CONSENTS.toString(), new EncodableFixedBitfield(24, []));
    fields.set(TcfEuV2Field.PUBLISHER_LEGITIMATE_INTERESTS.toString(), new EncodableFixedBitfield(24, []));

    let numCustomPurposes = new EncodableFixedInteger(6, 0);
    fields.set(TcfEuV2Field.NUM_CUSTOM_PURPOSES.toString(), numCustomPurposes);

    fields.set(
      TcfEuV2Field.PUBLISHER_CUSTOM_CONSENTS.toString(),
      new EncodableFlexibleBitfield(() => {
        return numCustomPurposes.getValue();
      }, [])
    );

    fields.set(
      TcfEuV2Field.PUBLISHER_CUSTOM_LEGITIMATE_INTERESTS.toString(),
      new EncodableFlexibleBitfield(() => {
        return numCustomPurposes.getValue();
      }, [])
    );

    fields.set(TcfEuV2Field.VENDORS_ALLOWED_SEGMENT_TYPE.toString(), new EncodableFixedInteger(3, 2));
    fields.set(TcfEuV2Field.VENDORS_ALLOWED.toString(), new EncodableOptimizedFixedRange([]));

    fields.set(TcfEuV2Field.VENDORS_DISCLOSED_SEGMENT_TYPE.toString(), new EncodableFixedInteger(3, 1));
    fields.set(TcfEuV2Field.VENDORS_DISCLOSED.toString(), new EncodableOptimizedFixedRange([]));

    let coreSegment = [
      TcfEuV2Field.VERSION.toString(),
      TcfEuV2Field.CREATED.toString(),
      TcfEuV2Field.LAST_UPDATED.toString(),
      TcfEuV2Field.CMP_ID.toString(),
      TcfEuV2Field.CMP_VERSION.toString(),
      TcfEuV2Field.CONSENT_SCREEN.toString(),
      TcfEuV2Field.CONSENT_LANGUAGE.toString(),
      TcfEuV2Field.VENDOR_LIST_VERSION.toString(),
      TcfEuV2Field.POLICY_VERSION.toString(),
      TcfEuV2Field.IS_SERVICE_SPECIFIC.toString(),
      TcfEuV2Field.USE_NON_STANDARD_STACKS.toString(),
      TcfEuV2Field.SPECIAL_FEATURE_OPTINS.toString(),
      TcfEuV2Field.PURPOSE_CONSENTS.toString(),
      TcfEuV2Field.PURPOSE_LEGITIMATE_INTERESTS.toString(),
      TcfEuV2Field.PURPOSE_ONE_TREATMENT.toString(),
      TcfEuV2Field.PUBLISHER_COUNTRY_CODE.toString(),
      TcfEuV2Field.VENDOR_CONSENTS.toString(),
      TcfEuV2Field.VENDOR_LEGITIMATE_INTERESTS.toString(),
      TcfEuV2Field.PUBLISHER_RESTRICTIONS.toString(),
    ];

    let publisherPurposesSegment = [
      TcfEuV2Field.PUBLISHER_PURPOSES_SEGMENT_TYPE.toString(),
      TcfEuV2Field.PUBLISHER_CONSENTS.toString(),
      TcfEuV2Field.PUBLISHER_LEGITIMATE_INTERESTS.toString(),
      TcfEuV2Field.NUM_CUSTOM_PURPOSES.toString(),
      TcfEuV2Field.PUBLISHER_CUSTOM_CONSENTS.toString(),
      TcfEuV2Field.PUBLISHER_CUSTOM_LEGITIMATE_INTERESTS.toString(),
    ];

    let vendorsAllowedSegment = [
      TcfEuV2Field.VENDORS_ALLOWED_SEGMENT_TYPE.toString(),
      TcfEuV2Field.VENDORS_ALLOWED.toString(),
    ];

    let vendorsDisclosedSegment = [
      TcfEuV2Field.VENDORS_DISCLOSED_SEGMENT_TYPE.toString(),
      TcfEuV2Field.VENDORS_DISCLOSED.toString(),
    ];

    let segments = [coreSegment, publisherPurposesSegment, vendorsAllowedSegment, vendorsDisclosedSegment];

    super(fields, segments);

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public encode(): string {
    let segmentBitStrings = this.encodeSegmentsToBitStrings();
    let encodedSegments = [];
    encodedSegments.push(Base64UrlEncoder.encode(segmentBitStrings[0]));
    if (this.getFieldValue(TcfEuV2Field.IS_SERVICE_SPECIFIC.toString())) {
      if (segmentBitStrings[1] && segmentBitStrings[1].length > 0) {
        encodedSegments.push(Base64UrlEncoder.encode(segmentBitStrings[1]));
      }
    } else {
      if (segmentBitStrings[2] && segmentBitStrings[2].length > 0) {
        encodedSegments.push(Base64UrlEncoder.encode(segmentBitStrings[2]));
      }

      if (segmentBitStrings[3] && segmentBitStrings[3].length > 0) {
        encodedSegments.push(Base64UrlEncoder.encode(segmentBitStrings[3]));
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
      let segmentBitString = Base64UrlEncoder.decode(encodedSegments[i]);
      switch (segmentBitString.substring(0, 3)) {
        // unfortunately, the segment ordering doesn't match the segment ids
        case "000": {
          segmentBitStrings[0] = segmentBitString;
          break;
        }
        case "001": {
          segmentBitStrings[3] = segmentBitString;
          break;
        }
        case "010": {
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
    if (fieldName !== TcfEuV2Field.CREATED.toString() && fieldName !== TcfEuV2Field.LAST_UPDATED.toString()) {
      const date = new Date();
      const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

      this.setFieldValue(TcfEuV2Field.CREATED.toString(), utcDate);
      this.setFieldValue(TcfEuV2Field.LAST_UPDATED.toString(), utcDate);
    }
  }

  //Overriden
  public getId(): number {
    return TcfEuV2.ID;
  }

  //Overriden
  public getName(): string {
    return TcfEuV2.NAME;
  }
}
