import { EncodableSegment } from "../segment/EncodableSegment.js";
import { UsVaCoreSegment } from "../segment/UsVaCoreSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class UsVa extends AbstractLazilyEncodableSection {
  public static readonly ID = 9;
  public static readonly VERSION = 1;
  public static readonly NAME = "usva";

  constructor(encodedString?: string) {
    super();
    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return UsVa.ID;
  }

  //Overriden
  public getName(): string {
    return UsVa.NAME;
  }

  //Override
  public getVersion(): number {
    return UsVa.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new UsVaCoreSegment());
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
