import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UspV1CoreSegment } from "../segment/UspV1CoreSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

// Deprecated
export class UspV1 extends AbstractLazilyEncodableSection {
  public static readonly ID = 6;
  public static readonly VERSION = 1;
  public static readonly NAME = "uspv1";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UspV1.ID;
  }

  //Overriden
  public getName(): string {
    return UspV1.NAME;
  }

  //Override
  public getVersion(): number {
    return UspV1.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UspV1CoreSegment());
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
