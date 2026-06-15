import { UsKyField } from "../field/UsKyField.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsKyCoreSegment } from "../segment/UsKyCoreSegment.js";
import { UsKySensitiveDataConsentSegment } from "../segment/UsKySensitiveDataConsentSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsKy extends AbstractLazilyEncodableSection {
  public static readonly ID = 26;
  public static readonly VERSION = 1;
  public static readonly NAME = "usky";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsKy.ID;
  }

  //Overriden
  public getName(): string {
    return UsKy.NAME;
  }

  //Override
  public getVersion(): number {
    return UsKy.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsKyCoreSegment());
    segments.push(new UsKySensitiveDataConsentSegment());
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
        segments[1].setFieldValue(UsKyField.SENSITIVE_DATA_CONSENT_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsKyField.SENSITIVE_DATA_CONSENT_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsKyField.SENSITIVE_DATA_CONSENT_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
