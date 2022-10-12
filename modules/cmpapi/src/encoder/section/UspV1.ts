import { Base64UrlEncoder } from "../datatype/encoder/Base64UrlEncoder.js";
import { Gvl } from "../../Gvl.js";
import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { UspV1Field } from "../field/UspV1Field.js";
import { AbstractEncodableBitStringSection } from "./AbstractEncodableBitStringSection.js";

export class UspV1 extends AbstractEncodableBitStringSection {
  public static readonly ID = 6;
  public static readonly VERSION = 1;
  public static readonly NAME = "uspv1";

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();
    fields.set(UspV1Field.VERSION.toString(), new EncodableFixedInteger(6, UspV1.VERSION));
    fields.set(UspV1Field.NOTICE.toString(), new EncodableFixedInteger(2));
    fields.set(UspV1Field.OPT_OUT_SALE.toString(), new EncodableFixedInteger(2));
    fields.set(UspV1Field.LSPA_COVERED.toString(), new EncodableFixedInteger(2));

    let fieldOrder = [
      UspV1Field.VERSION.toString(),
      UspV1Field.NOTICE.toString(),
      UspV1Field.OPT_OUT_SALE.toString(),
      UspV1Field.LSPA_COVERED.toString(),
    ];

    super(fields, fieldOrder);

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public encode(): string {
    let bitString = this.encodeToBitString();
    let encodedString = Base64UrlEncoder.encode(bitString);
    return encodedString;
  }

  //Overriden
  public decode(encodedString: string): void {
    let bitString = Base64UrlEncoder.decode(encodedString);
    this.decodeFromBitString(bitString);
  }

  //Overriden
  public getId(): number {
    return UspV1.ID;
  }

  //Overriden
  public getName(): string {
    return UspV1.NAME;
  }
}
