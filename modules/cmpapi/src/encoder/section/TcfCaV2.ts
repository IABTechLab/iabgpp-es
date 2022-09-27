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
import { TcfCaV2Field } from "../field/TcfCaV2Field.js";

export class TcfCaV2 extends AbstractEncodableSegmentedBitStringSection {
  public static readonly ID = 5;
  public static readonly VERSION = 2;
  public static readonly NAME = "tcfcav2";

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();

    // core section
    fields.set(TcfCaV2Field.VERSION.toString(), new EncodableFixedInteger(6, TcfCaV2.VERSION));
    fields.set(TcfCaV2Field.CREATED.toString(), new EncodableDatetime());
    fields.set(TcfCaV2Field.LAST_UPDATED.toString(), new EncodableDatetime());
    fields.set(TcfCaV2Field.CMP_ID.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfCaV2Field.CMP_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfCaV2Field.CONSENT_SCREEN.toString(), new EncodableFixedInteger(6, 0));
    fields.set(TcfCaV2Field.CONSENT_LANGUAGE.toString(), new EncodableFixedString(2, "EN"));
    fields.set(TcfCaV2Field.VENDOR_LIST_VERSION.toString(), new EncodableFixedInteger(12, 0));
    fields.set(TcfCaV2Field.TCF_POLICY_VERSION.toString(), new EncodableFixedInteger(6, 2));
    fields.set(TcfCaV2Field.USE_NON_STANDARD_STACKS.toString(), new EncodableBoolean(false));
    fields.set(TcfCaV2Field.SPECIAL_FEATURE_EXPRESS_CONSENT.toString(), new EncodableFixedBitfield(12, []));
    fields.set(TcfCaV2Field.PURPOSES_EXPRESS_CONSENT.toString(), new EncodableFixedBitfield(24, []));
    fields.set(TcfCaV2Field.PURPOSES_IMPLIED_CONSENT.toString(), new EncodableFixedBitfield(24, []));
    fields.set(TcfCaV2Field.VENDOR_EXPRESS_CONSENT.toString(), new EncodableFixedIntegerRange([]));
    fields.set(TcfCaV2Field.VENDOR_IMPLIED_CONSENT.toString(), new EncodableFixedIntegerRange([]));

    // publisher purposes segment
    fields.set(TcfCaV2Field.SEGMENT_TYPE.toString(), new EncodableFixedInteger(3, 3));
    fields.set(TcfCaV2Field.PUB_PURPOSES_EXPRESS_CONSENT.toString(), new EncodableFixedBitfield(24, []));
    fields.set(TcfCaV2Field.PUB_PURPOSES_IMPLIED_CONSENT.toString(), new EncodableFixedBitfield(24, []));

    let numCustomPurposes = new EncodableFixedInteger(6, 0);
    fields.set(TcfCaV2Field.NUM_CUSTOM_PURPOSES.toString(), numCustomPurposes);

    fields.set(
      TcfCaV2Field.CUSTOM_PURPOSES_EXPRESS_CONSENT.toString(),
      new EncodableFlexibleBitfield(() => {
        return numCustomPurposes.getValue();
      }, [])
    );

    fields.set(
      TcfCaV2Field.CUSTOM_PURPOSES_IMPLIED_CONSENT.toString(),
      new EncodableFlexibleBitfield(() => {
        return numCustomPurposes.getValue();
      }, [])
    );

    let coreSegment = [
      TcfCaV2Field.VERSION.toString(),
      TcfCaV2Field.CREATED.toString(),
      TcfCaV2Field.LAST_UPDATED.toString(),
      TcfCaV2Field.CMP_ID.toString(),
      TcfCaV2Field.CMP_VERSION.toString(),
      TcfCaV2Field.CONSENT_SCREEN.toString(),
      TcfCaV2Field.CONSENT_LANGUAGE.toString(),
      TcfCaV2Field.VENDOR_LIST_VERSION.toString(),
      TcfCaV2Field.TCF_POLICY_VERSION.toString(),
      TcfCaV2Field.USE_NON_STANDARD_STACKS.toString(),
      TcfCaV2Field.SPECIAL_FEATURE_EXPRESS_CONSENT.toString(),
      TcfCaV2Field.PURPOSES_EXPRESS_CONSENT.toString(),
      TcfCaV2Field.PURPOSES_IMPLIED_CONSENT.toString(),
      TcfCaV2Field.VENDOR_EXPRESS_CONSENT.toString(),
      TcfCaV2Field.VENDOR_IMPLIED_CONSENT.toString(),
    ];

    let publisherPurposesSegment = [
      TcfCaV2Field.SEGMENT_TYPE.toString(),
      TcfCaV2Field.PUB_PURPOSES_EXPRESS_CONSENT.toString(),
      TcfCaV2Field.PUB_PURPOSES_IMPLIED_CONSENT.toString(),
      TcfCaV2Field.NUM_CUSTOM_PURPOSES.toString(),
      TcfCaV2Field.CUSTOM_PURPOSES_EXPRESS_CONSENT.toString(),
      TcfCaV2Field.CUSTOM_PURPOSES_IMPLIED_CONSENT.toString(),
    ];

    let segments = [coreSegment, publisherPurposesSegment];

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
    if (segmentBitStrings[1] && segmentBitStrings[1].length > 0) {
      encodedSegments.push(Base64UrlEncoder.encode(segmentBitStrings[1]));
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
    if (fieldName !== TcfCaV2Field.CREATED.toString() && fieldName !== TcfCaV2Field.LAST_UPDATED.toString()) {
      const date = new Date();
      const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

      this.setFieldValue(TcfCaV2Field.CREATED.toString(), utcDate);
      this.setFieldValue(TcfCaV2Field.LAST_UPDATED.toString(), utcDate);
    }
  }

  //Overriden
  public getId(): number {
    return TcfCaV2.ID;
  }

  //Overriden
  public getName(): string {
    return TcfCaV2.NAME;
  }
}
