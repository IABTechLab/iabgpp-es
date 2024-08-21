import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";
import { UsNatField } from "../field/UsNatField.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsNatCoreSegment } from "../segment/UsNatCoreSegment.js";
import { UsNatGpcSegment } from "../segment/UsNatGpcSegment.js";

export class UsNat extends AbstractLazilyEncodableSection {
  public static readonly ID = 7;
  public static readonly VERSION = 1;
  public static readonly NAME = "usnat";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsNat.ID;
  }

  //Overriden
  public getName(): string {
    return UsNat.NAME;
  }

  //Override
  public getVersion(): number {
    return UsNat.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsNatCoreSegment());
    segments.push(new UsNatGpcSegment());
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
        segments[1].setFieldValue(UsNatField.GPC_SEGMENT_INCLUDED, true);
        segments[1].decode(encodedSegments[1]);
      } else {
        segments[1].setFieldValue(UsNatField.GPC_SEGMENT_INCLUDED, false);
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];

    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());
      if (segments.length >= 2 && segments[1].getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED) === true) {
        encodedSegments.push(segments[1].encode());
      }
    }

    return encodedSegments.join(".");
  }
}
