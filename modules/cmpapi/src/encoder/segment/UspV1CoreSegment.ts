import { UnencodableCharacter } from "../datatype/UnencodableCharacter.js";
import { UnencodableInteger } from "../datatype/UnencodableInteger.js";
import { Predicate } from "../datatype/validate/Predicate.js";
import { DecodingError } from "../error/DecodingError.js";
import { GenericFields } from "../field/GenericFields.js";
import { USPV1_CORE_SEGMENT_FIELD_NAMES } from "../field/UspV1Field.js";
import { UspV1Field } from "../field/UspV1Field.js";
import { UspV1 } from "../section/UspV1.js";
import { AbstractLazilyEncodableSegment } from "./AbstractLazilyEncodableSegment.js";

export class UspV1CoreSegment extends AbstractLazilyEncodableSegment<GenericFields> {
  constructor(encodedString?: string) {
    super();
    if (encodedString) {
      this.decode(encodedString);
    }
  }

  // overriden
  public getFieldNames(): string[] {
    return USPV1_CORE_SEGMENT_FIELD_NAMES;
  }

  // overriden
  protected initializeFields(): GenericFields {
    const validator = new (class implements Predicate<string> {
      test(s: string): boolean {
        return s === "-" || s === "Y" || s === "N";
      }
    })();

    let fields: GenericFields = new GenericFields();
    fields.put(UspV1Field.VERSION, new UnencodableInteger(UspV1.VERSION));
    fields.put(UspV1Field.NOTICE, new UnencodableCharacter("-", validator));
    fields.put(UspV1Field.OPT_OUT_SALE, new UnencodableCharacter("-", validator));
    fields.put(UspV1Field.LSPA_COVERED, new UnencodableCharacter("-", validator));
    return fields;
  }

  // overriden
  protected encodeSegment(fields: GenericFields): string {
    let str = "";
    str += fields.get(UspV1Field.VERSION).getValue();
    str += fields.get(UspV1Field.NOTICE).getValue();
    str += fields.get(UspV1Field.OPT_OUT_SALE).getValue();
    str += fields.get(UspV1Field.LSPA_COVERED).getValue();
    return str;
  }

  // overriden
  protected decodeSegment(encodedString: string, fields: GenericFields): void {
    if (encodedString == null || encodedString.length != 4) {
      throw new DecodingError("Unable to decode UspV1CoreSegment '" + encodedString + "'");
    }

    try {
      fields.get(UspV1Field.VERSION).setValue(parseInt(encodedString.substring(0, 1)));
      fields.get(UspV1Field.NOTICE).setValue(encodedString.charAt(1));
      fields.get(UspV1Field.OPT_OUT_SALE).setValue(encodedString.charAt(2));
      fields.get(UspV1Field.LSPA_COVERED).setValue(encodedString.charAt(3));
    } catch (e) {
      throw new DecodingError("Unable to decode UspV1CoreSegment '" + encodedString + "'");
    }
  }
}
