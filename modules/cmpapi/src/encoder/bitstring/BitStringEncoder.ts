import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { DecodingError } from "../error/DecodingError.js";
import { EncodableBitStringFields } from "../field/EncodableBitStringFields.js";

export class BitStringEncoder {
  private static instance: BitStringEncoder = new BitStringEncoder();

  private constructor() {}

  public static getInstance(): BitStringEncoder {
    return this.instance;
  }

  public encode(fields: EncodableBitStringFields, fieldNames: string[]): string {
    let bitString = "";
    for (let i = 0; i < fieldNames.length; i++) {
      let fieldName = fieldNames[i];
      if (fields.containsKey(fieldName)) {
        let field: AbstractEncodableBitStringDataType<any> = fields.get(fieldName);
        bitString += field.encode();
      } else {
        throw new Error("Field not found: '" + fieldName + "'");
      }
    }

    return bitString;
  }

  public decode(bitString: string, fieldNames: string[], fields: EncodableBitStringFields) {
    let index = 0;
    for (let i = 0; i < fieldNames.length; i++) {
      let fieldName = fieldNames[i];
      if (fields.containsKey(fieldName)) {
        let field: AbstractEncodableBitStringDataType<any> = fields.get(fieldName);
        try {
          let substring = field.substring(bitString, index);
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
        throw new Error("Field not found: '" + fieldName + "'");
      }
    }
  }
}
