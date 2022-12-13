import { AbstractEncodableBitStringDataType } from "../datatype/AbstractEncodableBitStringDataType.js";
import { AbstractEncodableBitStringSection } from "./AbstractEncodableBitStringSection.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedIntegerList } from "../datatype/EncodableFixedIntegerList.js";
import { DecodingError } from "../error/DecodingError.js";
import { Base64UrlEncoder } from "../datatype/encoder/Base64UrlEncoder.js";
import { UspVaV1Field } from "../field/UspVaV1Field.js";

export class UspVaV1 extends AbstractEncodableBitStringSection {
  public static readonly ID = 9;
  public static readonly VERSION = 1;
  public static readonly NAME = "uspvav1";

  constructor(encodedString?: string) {
    let fields = new Map<string, AbstractEncodableBitStringDataType<any>>();

    // core section
    fields.set(UspVaV1Field.VERSION.toString(), new EncodableFixedInteger(6, UspVaV1.VERSION));
    fields.set(UspVaV1Field.SHARING_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspVaV1Field.SALE_OPT_OUT_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspVaV1Field.SALE_OPT_OUT.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT.toString(), new EncodableFixedInteger(2, 0));
    fields.set(
      UspVaV1Field.SENSITIVE_DATA_PROCESSING.toString(),
      new EncodableFixedIntegerList(2, 8, [0, 0, 0, 0, 0, 0, 0, 0])
    );
    fields.set(UspVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspVaV1Field.MSPA_COVERED_TRANSACTION.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspVaV1Field.MSPA_OPT_OUT_OPTION_MODE.toString(), new EncodableFixedInteger(2, 0));
    fields.set(UspVaV1Field.MSPA_SERVICE_PROVIDER_MODE.toString(), new EncodableFixedInteger(2, 0));

    let fieldOrder = [
      UspVaV1Field.VERSION.toString(),
      UspVaV1Field.SHARING_NOTICE.toString(),
      UspVaV1Field.SALE_OPT_OUT_NOTICE.toString(),
      UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE.toString(),
      UspVaV1Field.SALE_OPT_OUT.toString(),
      UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT.toString(),
      UspVaV1Field.SENSITIVE_DATA_PROCESSING.toString(),
      UspVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(),
      UspVaV1Field.MSPA_COVERED_TRANSACTION.toString(),
      UspVaV1Field.MSPA_OPT_OUT_OPTION_MODE.toString(),
      UspVaV1Field.MSPA_SERVICE_PROVIDER_MODE.toString(),
    ];

    super(fields, fieldOrder);

    if (encodedString && encodedString.length > 0) {
      this.decode(encodedString);
    }
  }

  //Overriden
  public encode(): string {
    return Base64UrlEncoder.encode(this.encodeToBitString());
  }

  //Overriden
  public decode(bitString: string): void {
    this.decodeFromBitString(Base64UrlEncoder.decode(bitString));
  }

  //Overriden
  public getId(): number {
    return UspVaV1.ID;
  }

  //Overriden
  public getName(): string {
    return UspVaV1.NAME;
  }
}
