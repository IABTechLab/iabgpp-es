import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { HeaderV1CoreSegment } from "../segment/HeaderV1CoreSegment.js";

export class HeaderV1 extends AbstractLazilyEncodableSection {
  public static readonly ID = 3;
  public static readonly VERSION = 1;
  public static readonly NAME = "header";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return HeaderV1.ID;
  }

  //Overriden
  public getName(): string {
    return HeaderV1.NAME;
  }

  //Override
  public getVersion(): number {
    return HeaderV1.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new HeaderV1CoreSegment());
    return segments;
  }

  //Overriden
  protected decodeSection(encodedString: string): EncodableSegment[] {
    let segments: EncodableSegment[] = this.initializeSegments();

    if (encodedString != null && encodedString.length !== 0) {
      let encodedSegments = encodedString.split(".");

      for (let i = 0; i < segments.length; i++) {
        if (encodedSegments.length > i) {
          segments[i].decode(encodedSegments[i]);
        }
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];
    for (let i = 0; i < segments.length; i++) {
      let segment: EncodableSegment = segments[i];
      encodedSegments.push(segment.encode());
    }
    return encodedSegments.join(".");
  }
}
