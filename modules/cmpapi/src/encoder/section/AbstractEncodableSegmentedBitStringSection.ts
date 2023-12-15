import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { DecodingError } from "../error/DecodingError.js";
import { EncodableSection } from "./EncodableSection.js";

export abstract class AbstractEncodableSegmentedBitStringSection implements EncodableSection {
  protected fields: Map<string, AbstractEncodableBitStringDataType<any>>;
  protected segments: string[][];

  constructor(fields: Map<string, AbstractEncodableBitStringDataType<any>>, segments: string[][]) {
    this.fields = fields;
    this.segments = segments;
  }

  //Overriden
  public hasField(fieldName: string): boolean {
    return this.fields.has(fieldName);
  }

  //Overriden
  public getFieldValue(fieldName: string): any {
    if (this.fields.has(fieldName)) {
      return this.fields.get(fieldName).getValue();
    } else {
      return null;
    }
  }

  //Overriden
  public setFieldValue(fieldName: string, value: any): void {
    if (this.fields.has(fieldName)) {
      this.fields.get(fieldName).setValue(value);
    } else {
      throw new Error(fieldName + " not found");
    }
  }

  public getSegments() {
    return this.segments;
  }

  public encodeSegmentsToBitStrings(): string[] {
    let segmentBitStrings = [];
    for (let i = 0; i < this.segments.length; i++) {
      let segmentBitString = "";
      for (let j = 0; j < this.segments[i].length; j++) {
        let fieldName = this.segments[i][j];
        if (this.fields.has(fieldName)) {
          try {
            let field = this.fields.get(fieldName);
            segmentBitString += field.encode();
          } catch (e) {
            throw new Error("Unable to encode " + fieldName);
          }
        } else {
          throw new Error("Field not found: '" + fieldName + "'");
        }
      }
      segmentBitStrings.push(segmentBitString);
    }

    return segmentBitStrings;
  }

  public decodeSegmentsFromBitStrings(segmentBitStrings: string[]) {
    for (let i = 0; i < this.segments.length && i < segmentBitStrings.length; i++) {
      this.decodeSegmentFromBitString(this.segments[i], segmentBitStrings[i]);
    }
  }

  private decodeSegmentFromBitString(segment: string[], segmentBitString: string) {
    if (segmentBitString && segmentBitString.length > 0) {
      let index = 0;
      for (let j = 0; j < segment.length; j++) {
        let fieldName = segment[j];
        if (this.fields.has(fieldName)) {
          let field = this.fields.get(fieldName);
          try {
            let substring = field.substring(segmentBitString, index);
            field.decode(substring);
            index += substring.length;
          } catch (e) {
            if (e.name === "SubstringError" && !field.getHardFailIfMissing()) {
              return;
            } else {
              throw new DecodingError("Unable to decode field '" + fieldName + "'");
            }
          }
        } else {
          throw new DecodingError("Field not found: '" + fieldName + "'");
        }
      }
    }
  }

  //Overriden
  public toObj(): any {
    let obj = {};
    for (let i = 0; i < this.segments.length; i++) {
      for (let j = 0; j < this.segments[i].length; j++) {
        let fieldName = this.segments[i][j];
        if (this.fields.has(fieldName)) {
          let field = this.fields.get(fieldName);
          let value = field.getValue();
          obj[fieldName] = value;
        }
      }
    }
    return obj;
  }

  //Overriden
  public abstract encode(): string;

  //Overriden
  public abstract decode(encodedString: string): void;

  //Overriden
  public abstract getId(): number;

  //Overriden
  public abstract getName(): string;
}
