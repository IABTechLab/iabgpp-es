import { UsNeField } from "../field/UsNeField.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsNeCoreSegment } from "../segment/UsNeCoreSegment.js";
import { UsNeGpcSegment } from "../segment/UsNeGpcSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsNe extends AbstractLazilyEncodableSection {
  public static readonly ID = 19;
  public static readonly VERSION = 1;
  public static readonly NAME = "usne";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsNe.ID;
  }

  //Overriden
  public getName(): string {
    return UsNe.NAME;
  }

  //Override
  public getVersion(): number {
    return UsNe.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsNeCoreSegment());
    segments.push(new UsNeGpcSegment());
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
        segments[1].setFieldValue(UsNeField.GPC_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsNeField.GPC_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsNeField.GPC_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
