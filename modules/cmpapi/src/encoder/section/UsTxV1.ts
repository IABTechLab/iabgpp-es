import { UsTxV1Field } from "../field/UsTxV1Field.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsTxV1CoreSegment } from "../segment/UsTxV1CoreSegment.js";
import { UsTxV1GpcSegment } from "../segment/UsTxV1GpcSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsTxV1 extends AbstractLazilyEncodableSection {
  public static readonly ID = 16;
  public static readonly VERSION = 1;
  public static readonly NAME = "ustx";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsTxV1.ID;
  }

  //Overriden
  public getName(): string {
    return UsTxV1.NAME;
  }

  //Override
  public getVersion(): number {
    return UsTxV1.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsTxV1CoreSegment());
    segments.push(new UsTxV1GpcSegment());
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
        segments[1].setFieldValue(UsTxV1Field.GPC_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsTxV1Field.GPC_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsTxV1Field.GPC_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
