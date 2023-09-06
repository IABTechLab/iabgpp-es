import { InvalidFieldError } from "../error/InvalidFieldError.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { EncodableSection } from "./EncodableSection.js";

export abstract class AbstractLazilyEncodableSection implements EncodableSection {
  //Overriden
  public abstract getId(): number;

  //Overriden
  public abstract getName(): string;

  private segments: EncodableSegment[];

  private encodedString: string = null;

  private dirty: boolean = false;
  private decoded: boolean = true;

  constructor() {
    this.segments = this.initializeSegments();
  }

  protected abstract initializeSegments(): EncodableSegment[];

  protected abstract encodeSection(segments: EncodableSegment[]): string;

  protected abstract decodeSection(encodedString: string): EncodableSegment[];

  public hasField(fieldName: string): boolean {
    if (!this.decoded) {
      this.segments = this.decodeSection(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    for (let i = 0; i < this.segments.length; i++) {
      let segment: EncodableSegment = this.segments[i];
      if (segment.getFieldNames().includes(fieldName)) {
        return segment.hasField(fieldName);
      }
    }

    return false;
  }

  public getFieldValue(fieldName: string): any {
    if (!this.decoded) {
      this.segments = this.decodeSection(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    for (let i = 0; i < this.segments.length; i++) {
      let segment: EncodableSegment = this.segments[i];
      if (segment.hasField(fieldName)) {
        return segment.getFieldValue(fieldName);
      }
    }

    throw new InvalidFieldError("Invalid field: '" + fieldName + "'");
  }

  public setFieldValue(fieldName: string, value: any): void {
    if (!this.decoded) {
      this.segments = this.decodeSection(this.encodedString);
      this.dirty = false;
      this.decoded = true;
    }

    for (let i = 0; i < this.segments.length; i++) {
      let segment: EncodableSegment = this.segments[i];
      if (segment.hasField(fieldName)) {
        segment.setFieldValue(fieldName, value);
        return;
      }
    }

    throw new InvalidFieldError("Invalid field: '" + fieldName + "'");
  }

  //Overriden
  public toObj(): any {
    let obj = {};
    for (let i = 0; i < this.segments.length; i++) {
      let segmentObject = this.segments[i].toObj();
      for (const [fieldName, value] of Object.entries(segmentObject)) {
        obj[fieldName] = value;
      }
    }
    return obj;
  }

  public encode(): string {
    if (this.encodedString == null || this.encodedString.length === 0 || this.dirty) {
      this.encodedString = this.encodeSection(this.segments);
      this.dirty = false;
      this.decoded = true;
    }

    return this.encodedString;
  }

  public decode(encodedString: string): void {
    this.encodedString = encodedString;
    this.dirty = false;
    this.decoded = false;
  }
}
