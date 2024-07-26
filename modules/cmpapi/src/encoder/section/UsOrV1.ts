import { UsOrV1Field } from "../field/UsOrV1Field.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsOrV1CoreSegment } from "../segment/UsOrV1CoreSegment.js";
import { UsOrV1GpcSegment } from "../segment/UsOrV1GpcSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsOrV1 extends AbstractLazilyEncodableSection {
  public static readonly ID = 15;
  public static readonly VERSION = 1;
  public static readonly NAME = "usor";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsOrV1.ID;
  }

  //Overriden
  public getName(): string {
    return UsOrV1.NAME;
  }

  //Override
  public getVersion(): number {
    return UsOrV1.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsOrV1CoreSegment());
    segments.push(new UsOrV1GpcSegment());
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
        segments[1].setFieldValue(UsOrV1Field.GPC_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsOrV1Field.GPC_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsOrV1Field.GPC_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
