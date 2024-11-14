import { UsNjField } from "../field/UsNjField.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsNjCoreSegment } from "../segment/UsNjCoreSegment.js";
import { UsNjGpcSegment } from "../segment/UsNjGpcSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsNj extends AbstractLazilyEncodableSection {
  public static readonly ID = 21;
  public static readonly VERSION = 1;
  public static readonly NAME = "usnj";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsNj.ID;
  }

  //Overriden
  public getName(): string {
    return UsNj.NAME;
  }

  //Override
  public getVersion(): number {
    return UsNj.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsNjCoreSegment());
    segments.push(new UsNjGpcSegment());
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
        segments[1].setFieldValue(UsNjField.GPC_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsNjField.GPC_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsNjField.GPC_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
