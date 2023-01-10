import { AbstractBase64UrlEncoder } from "../datatype/encoder/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../datatype/encoder/CompressedBase64UrlEncoder.js";
import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { EncodableFibonacciIntegerRange } from "../datatype/EncodableFibonacciIntegerRange.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { HeaderV1Field } from "../field/HeaderV1Field.js";
import { AbstractEncodableBitStringSection } from "./AbstractEncodableBitStringSection.js";

export class HeaderV1 extends AbstractEncodableBitStringSection {
  public static readonly ID = 3;
  public static readonly VERSION = 1;
  public static readonly NAME = "header";

  private base64UrlEncoder: AbstractBase64UrlEncoder = new CompressedBase64UrlEncoder();

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();
    fields.set(HeaderV1Field.ID.toString(), new EncodableFixedInteger(6, HeaderV1.ID));
    fields.set(HeaderV1Field.VERSION.toString(), new EncodableFixedInteger(6, HeaderV1.VERSION));
    fields.set(HeaderV1Field.SECTION_IDS.toString(), new EncodableFibonacciIntegerRange([]));

    let fieldOrder = [
      HeaderV1Field.ID.toString(),
      HeaderV1Field.VERSION.toString(),
      HeaderV1Field.SECTION_IDS.toString(),
    ];

    super(fields, fieldOrder);

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public encode(): string {
    let bitString = this.encodeToBitString();
    let encodedString = this.base64UrlEncoder.encode(bitString);
    return encodedString;
  }

  //Overriden
  public decode(encodedString: string): void {
    let bitString = this.base64UrlEncoder.decode(encodedString);
    this.decodeFromBitString(bitString);
  }

  //Overriden
  public getId(): number {
    return HeaderV1.ID;
  }

  //Overriden
  public getName(): string {
    return HeaderV1.NAME;
  }
}
