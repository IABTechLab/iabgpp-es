import { DecodingError } from "../error/DecodingError.js";
import { TcfEuV2Field } from "../field/TcfEuV2Field.js";
import { EncodableSegment } from "../segment/EncodableSegment.js";
import { TcfEuV2CoreSegment } from "../segment/TcfEuV2CoreSegment.js";
import { TcfEuV2PublisherPurposesSegment } from "../segment/TcfEuV2PublisherPurposesSegment.js";
import { TcfEuV2VendorsAllowedSegment } from "../segment/TcfEuV2VendorsAllowedSegment.js";
import { TcfEuV2VendorsDisclosedSegment } from "../segment/TcfEuV2VendorsDisclosedSegment.js";
import { AbstractLazilyEncodableSection } from "./AbstractLazilyEncodableSection.js";

export class TcfEuV2 extends AbstractLazilyEncodableSection {
  public static readonly ID = 2;
  public static readonly VERSION = 2;
  public static readonly NAME = "tcfeuv2";

  constructor(encodedString?: string) {
    super();

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public getId(): number {
    return TcfEuV2.ID;
  }

  //Overriden
  public getName(): string {
    return TcfEuV2.NAME;
  }

  //Override
  public getVersion(): number {
    return TcfEuV2.VERSION;
  }

  //Overriden
  protected initializeSegments(): EncodableSegment[] {
    let segments: EncodableSegment[] = [];
    segments.push(new TcfEuV2CoreSegment());
    segments.push(new TcfEuV2PublisherPurposesSegment());
    segments.push(new TcfEuV2VendorsAllowedSegment());
    segments.push(new TcfEuV2VendorsDisclosedSegment());
    return segments;
  }

  //Overriden
  protected decodeSection(encodedString: string): EncodableSegment[] {
    let segments: EncodableSegment[] = this.initializeSegments();

    if (encodedString != null && encodedString.length !== 0) {
      let encodedSegments = encodedString.split(".");
      for (let i = 0; i < encodedSegments.length; i++) {
        /**
         * The first 3 bits contain the segment id. Rather than decode the entire string, just check the first character.
         *
         * A-H     = '000' = 0
         * I-P     = '001' = 1
         * Q-X     = '010' = 2
         * Y-Z,a-f = '011' = 3
         *
         * Note that there is no segment id field for the core segment. Instead the first 6 bits are reserved
         * for the encoding version which only coincidentally works here because the version value is less than 8.
         */

        let encodedSegment: string = encodedSegments[i];
        if (encodedSegment.length !== 0) {
          let firstChar: string = encodedSegment.charAt(0);

          // unfortunately, the segment ordering doesn't match the segment ids
          if (firstChar >= "A" && firstChar <= "H") {
            segments[0].decode(encodedSegments[i]);
          } else if (firstChar >= "I" && firstChar <= "P") {
            segments[3].decode(encodedSegments[i]);
          } else if (firstChar >= "Q" && firstChar <= "X") {
            segments[2].decode(encodedSegments[i]);
          } else if ((firstChar >= "Y" && firstChar <= "Z") || (firstChar >= "a" && firstChar <= "f")) {
            segments[1].decode(encodedSegments[i]);
          } else {
            throw new DecodingError("Unable to decode TcfEuV2 segment '" + encodedSegment + "'");
          }
        }
      }
    }

    return segments;
  }

  // Overriden
  protected encodeSection(segments: EncodableSegment[]): string {
    let encodedSegments: string[] = [];
    if (segments.length >= 1) {
      encodedSegments.push(segments[0].encode());

      let isServiceSpecific: boolean = this.getFieldValue(TcfEuV2Field.IS_SERVICE_SPECIFIC);
      if (isServiceSpecific) {
        if (segments.length >= 2) {
          encodedSegments.push(segments[1].encode());
        }
        if (segments.length >= 3) {
          encodedSegments.push(segments[3].encode());
        }
      } else {
        if (segments.length >= 2) {
          encodedSegments.push(segments[2].encode());

          if (segments.length >= 3) {
            encodedSegments.push(segments[3].encode());
          }
        }
      }
    }
    return encodedSegments.join(".");
  }

  //Overriden
  public setFieldValue(fieldName: string, value: any): void {
    //
    // special handling for exceptions based on TCF policy and specification
    //
    // purpose 1, 3 - 6 legitimate interest is always false
    if (fieldName === TcfEuV2Field.PURPOSE_LEGITIMATE_INTERESTS) {
      value[0] = false;
      value[2] = value[3] = value[4] = value[5] = false;
    }

    // create and last update will need to stay in sync
    if (fieldName === TcfEuV2Field.CREATED || fieldName  === TcfEuV2Field.LAST_UPDATED) {
      if (fieldName === TcfEuV2Field.CREATED) {
          super.setFieldValue(TcfEuV2Field.LAST_UPDATED, value);
      } else {
          super.setFieldValue(TcfEuV2Field.CREATED, value);
        }
    } else 
      // always update the date stamp with a change occurs
      this.updateDateStamp();

    // update the actual given fields
    super.setFieldValue(fieldName, value);
  }

  // update last_update and create time stamps when a change occurs
  private updateDateStamp(): void {
    const date = new Date();
    const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
    super.setFieldValue(TcfEuV2Field.CREATED, utcDate);
    super.setFieldValue(TcfEuV2Field.LAST_UPDATED, utcDate);
  }
}
