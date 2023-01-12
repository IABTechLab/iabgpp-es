import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { AbstractEncodableSegmentedBitStringSection } from "./AbstractEncodableSegmentedBitStringSection.js";
import { EncodableBoolean } from "../datatype/EncodableBoolean.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedIntegerList } from "../datatype/EncodableFixedIntegerList.js";
import { DecodingError } from "../error/DecodingError.js";
import { UspCoV1Field } from "../field/UspCoV1Field.js";
import { AbstractBase64UrlEncoder } from "../datatype/encoder/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../datatype/encoder/CompressedBase64UrlEncoder.js";

export class UspCoV1 extends AbstractEncodableSegmentedBitStringSection {
  public static readonly ID = 10;
  public static readonly VERSION = 1;
  public static readonly NAME = "uspcov1";

  private base64UrlEncoder: AbstractBase64UrlEncoder = new CompressedBase64UrlEncoder();

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();

    // core section
    fields.set(UspCoV1Field.VERSION.toString(), new EncodableFixedInteger(6, UspCoV1.VERSION));
    fields.set(UspCoV1Field.SHARING_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspCoV1Field.SALE_OPT_OUT_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspCoV1Field.SALE_OPT_OUT.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT.toString(), new EncodableFixedInteger(2, 0));
    fields.set(
      UspCoV1Field.SENSITIVE_DATA_PROCESSING.toString(),
      new EncodableFixedIntegerList(2, 7, [0, 0, 0, 0, 0, 0, 0])
    );
    fields.set(UspCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspCoV1Field.MSPA_COVERED_TRANSACTION.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspCoV1Field.MSPA_OPT_OUT_OPTION_MODE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspCoV1Field.MSPA_SERVICE_PROVIDER_MODE.toString(), new EncodableFixedInteger(2, 0));

    // gpc segment
    fields.set(UspCoV1Field.GPC_SEGMENT_TYPE.toString(), new EncodableFixedInteger(2, 1));
    fields.set(UspCoV1Field.GPC_SEGMENT_INCLUDED.toString(), new EncodableBoolean(true));
    fields.set(UspCoV1Field.GPC.toString(), new EncodableBoolean(false));

    let coreSegment = [
      UspCoV1Field.VERSION.toString(),
      UspCoV1Field.SHARING_NOTICE.toString(),
      UspCoV1Field.SALE_OPT_OUT_NOTICE.toString(),
      UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(),
      UspCoV1Field.SALE_OPT_OUT.toString(),
      UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT.toString(),
      UspCoV1Field.SENSITIVE_DATA_PROCESSING.toString(),
      UspCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(),
      UspCoV1Field.MSPA_COVERED_TRANSACTION.toString(),
      UspCoV1Field.MSPA_OPT_OUT_OPTION_MODE.toString(),
      UspCoV1Field.MSPA_SERVICE_PROVIDER_MODE.toString(),
    ];

    let gpcSegment = [UspCoV1Field.GPC_SEGMENT_TYPE.toString(), UspCoV1Field.GPC.toString()];

    let segments = [coreSegment, gpcSegment];

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
      let gpcSegmentIncluded = this.fields.get(UspCoV1Field.GPC_SEGMENT_INCLUDED).getValue();
      if (gpcSegmentIncluded === true) {
        encodedSegments.push(this.base64UrlEncoder.encode(segmentBitStrings[1]));
      }
    }

    return encodedSegments.join(".");
  }

  //Overriden
  public decode(encodedSection: string): void {
    let encodedSegments = encodedSection.split(".");
    let segmentBitStrings = [];
    let gpcSegmentIncluded = false;
    for (let i = 0; i < encodedSegments.length; i++) {
      /**
       * first char will contain 6 bits, we only need the first 2.
       * There is no segment type for the CORE string. Instead the first 6 bits are reserved for the
       * encoding version, but because we're only on a maximum of encoding version 2 the first 2 bits in
       * the core segment will evaluate to 0.
       */
      let segmentBitString = this.base64UrlEncoder.decode(encodedSegments[i]);
      switch (segmentBitString.substring(0, 2)) {
        // unfortuCoely, the segment ordering doesn't match the segment ids
        case "00": {
          segmentBitStrings[0] = segmentBitString;
          break;
        }
        case "01": {
          gpcSegmentIncluded = true;
          segmentBitStrings[1] = segmentBitString;
          break;
        }
        default: {
          throw new DecodingError("Unable to decode segment '" + encodedSegments[i] + "'");
        }
      }
    }
    this.decodeSegmentsFromBitStrings(segmentBitStrings);
    this.fields.get(UspCoV1Field.GPC_SEGMENT_INCLUDED).setValue(gpcSegmentIncluded);
  }

  //Overriden
  public getId(): number {
    return UspCoV1.ID;
  }

  //Overriden
  public getName(): string {
    return UspCoV1.NAME;
  }
}
