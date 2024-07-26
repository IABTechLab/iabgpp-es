import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsFlV1CoreSegment } from "../segment/UsFlV1CoreSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsFlV1 extends AbstractLazilyEncodableSection {
  public static readonly ID = 13;
  public static readonly VERSION = 1;
  public static readonly NAME = "usfl";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsFlV1.ID;
  }

  //Overriden
  public getName(): string {
    return UsFlV1.NAME;
  }

  //Override
  public getVersion(): number {
    return UsFlV1.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsFlV1CoreSegment());
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
