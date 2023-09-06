import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";
import { UsCoV1Field } from "../field/UsCoV1Field.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsCoV1CoreSegment } from "../segment/UsCoV1CoreSegment.js";
import { UsCoV1GpcSegment } from "../segment/UsCoV1GpcSegment.js";

export class UsCoV1 extends AbstractLazilyEncodableSection {
  public static readonly ID = 10;
  public static readonly VERSION = 1;
  public static readonly NAME = "uscov1";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsCoV1.ID;
  }

  //Overriden
  public getName(): string {
    return UsCoV1.NAME;
  }

  //Override
  public getVersion(): number {
    return UsCoV1.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsCoV1CoreSegment());
    segments.push(new UsCoV1GpcSegment());
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
        segments[1].setFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
