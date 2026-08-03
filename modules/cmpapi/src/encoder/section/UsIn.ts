import { UsInField } from "../field/UsInField.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsInCoreSegment } from "../segment/UsInCoreSegment.js";
import { UsInSensitiveDataConsentSegment } from "../segment/UsInSensitiveDataConsentSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsIn extends AbstractLazilyEncodableSection {
  public static readonly ID = 25;
  public static readonly VERSION = 1;
  public static readonly NAME = "usin";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsIn.ID;
  }

  //Overriden
  public getName(): string {
    return UsIn.NAME;
  }

  //Override
  public getVersion(): number {
    return UsIn.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsInCoreSegment());
    segments.push(new UsInSensitiveDataConsentSegment());
    return segments;
  }

  //Overriden
  protected decodeSection(encodedString: string): EncodableSegment[] {
    let segments: EncodableSegment[] = this.initializeSegments();

    if (encodedString != null && encodedString.length !== 0) {
      let encodedSegments = encodedString.split(".");

      if (encodedSegments.length > 0) {
        segments[0].decode(encodedSegments[0]);
      }

      if (encodedSegments.length > 1) {
        segments[1].setFieldValue(UsInField.SENSITIVE_DATA_CONSENT_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsInField.SENSITIVE_DATA_CONSENT_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsInField.SENSITIVE_DATA_CONSENT_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
