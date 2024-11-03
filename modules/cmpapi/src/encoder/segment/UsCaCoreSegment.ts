import { AbstractBase64UrlEncoder } from "../base64/AbstractBase64UrlEncoder.js";
import { CompressedBase64UrlEncoder } from "../base64/CompressedBase64UrlEncoder.js";
import { BitStringEncoder } from "../bitstring/BitStringEncoder.js";
import { EncodableFixedInteger } from "../datatype/EncodableFixedInteger.js";
import { EncodableFixedIntegerList } from "../datatype/EncodableFixedIntegerList.js";
import { Predicate } from "../datatype/validate/Predicate.js";
import { DecodingError } from "../error/DecodingError.js";
import { ValidationError } from "../error/ValidationError.js";
import { EncodableBitStringFields } from "../field/EncodableBitStringFields.js";
import { USCA_CORE_SEGMENT_FIELD_NAMES } from "../field/UsCaField.js";
import { UsCaField } from "../field/UsCaField.js";
import { UsCa } from "../section/UsCa.js";
import { AbstractLazilyEncodableSegment } from "./AbstractLazilyEncodableSegment.js";

export class UsCaCoreSegment extends AbstractLazilyEncodableSegment<EncodableBitStringFields> {
  private base64UrlEncoder: AbstractBase64UrlEncoder = CompressedBase64UrlEncoder.getInstance();
  private bitStringEncoder: BitStringEncoder = BitStringEncoder.getInstance();

  constructor(encodedString?: string) {
    super();
    if (encodedString) {
      this.decode(encodedString);
    }
  }

  // overriden
  public getFieldNames(): string[] {
    return USCA_CORE_SEGMENT_FIELD_NAMES;
  }

  // overriden
  protected initializeFields(): EncodableBitStringFields {
    const nullableBooleanAsTwoBitIntegerValidator = new (class implements Predicate<number> {
      test(n: number): boolean {
        return n >= 0 && n <= 2;
      }
    })();

    const nonNullableBooleanAsTwoBitIntegerValidator = new (class implements Predicate<number> {
      test(n: number): boolean {
        return n >= 1 && n <= 2;
      }
    })();
    const nullableBooleanAsTwoBitIntegerListValidator = new (class implements Predicate<number[]> {
      test(l: number[]): boolean {
        for (let i = 0; i < l.length; i++) {
          let n = l[i];
          if (n < 0 || n > 2) {
            return false;
          }
        }
        return true;
      }
    })();

    let fields: EncodableBitStringFields = new EncodableBitStringFields();
    fields.put(UsCaField.VERSION.toString(), new EncodableFixedInteger(6, UsCa.VERSION));
    fields.put(
      UsCaField.SALE_OPT_OUT_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.SHARING_OPT_OUT_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.SENSITIVE_DATA_LIMIT_USE_NOTICE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.SALE_OPT_OUT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.SHARING_OPT_OUT.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.SENSITIVE_DATA_PROCESSING.toString(),
      new EncodableFixedIntegerList(2, [0, 0, 0, 0, 0, 0, 0, 0, 0]).withValidator(
        nullableBooleanAsTwoBitIntegerListValidator
      )
    );
    fields.put(
      UsCaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS.toString(),
      new EncodableFixedIntegerList(2, [0, 0]).withValidator(nullableBooleanAsTwoBitIntegerListValidator)
    );
    fields.put(
      UsCaField.PERSONAL_DATA_CONSENTS.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.MSPA_COVERED_TRANSACTION.toString(),
      new EncodableFixedInteger(2, 1).withValidator(nonNullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.MSPA_OPT_OUT_OPTION_MODE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );
    fields.put(
      UsCaField.MSPA_SERVICE_PROVIDER_MODE.toString(),
      new EncodableFixedInteger(2, 0).withValidator(nullableBooleanAsTwoBitIntegerValidator)
    );

    return fields;
  }

  // overriden
  protected encodeSegment(fields: EncodableBitStringFields): string {
    let bitString: string = this.bitStringEncoder.encode(fields, this.getFieldNames());
    let encodedString: string = this.base64UrlEncoder.encode(bitString);
    return encodedString;
  }

  // overriden
  protected decodeSegment(encodedString: string, fields: EncodableBitStringFields): void {
    if (encodedString == null || encodedString.length === 0) {
      this.fields.reset(fields);
    }
    try {
      let bitString: string = this.base64UrlEncoder.decode(encodedString);
      this.bitStringEncoder.decode(bitString, this.getFieldNames(), fields);
    } catch (e) {
      throw new DecodingError("Unable to decode UsCaCoreSegment '" + encodedString + "'");
    }
  }

  // overriden
  public validate(): void {
    let sharingOptOutNotice: number = this.fields.get(UsCaField.SHARING_OPT_OUT_NOTICE).getValue();
    let sharingOptOut: number = this.fields.get(UsCaField.SHARING_OPT_OUT).getValue();
    let saleOptOutNotice: number = this.fields.get(UsCaField.SALE_OPT_OUT_NOTICE).getValue();
    let saleOptOut: number = this.fields.get(UsCaField.SALE_OPT_OUT).getValue();
    let mspaServiceProviderMode: number = this.fields.get(UsCaField.MSPA_SERVICE_PROVIDER_MODE).getValue();
    let mspaOptOutOptionMode: number = this.fields.get(UsCaField.MSPA_OPT_OUT_OPTION_MODE).getValue();
    let sensitiveDataLimitUseNotice: number = this.fields.get(UsCaField.SENSITIVE_DATA_LIMIT_USE_NOTICE).getValue();

    if (sharingOptOutNotice == 0) {
      if (sharingOptOut == 1 || sharingOptOut == 2) {
        throw new ValidationError(
          "Invalid usca sharing notice / opt out combination: {" + sharingOptOutNotice + " / " + sharingOptOut + "}"
        );
      }
    } else if (sharingOptOutNotice == 1) {
      if (sharingOptOut == 0) {
        throw new ValidationError(
          "Invalid usca sharing notice / opt out combination: {" + sharingOptOutNotice + " / " + sharingOptOut + "}"
        );
      }
    } else if (sharingOptOutNotice == 2) {
      if (sharingOptOut == 0 || sharingOptOut == 2) {
        throw new ValidationError(
          "Invalid usca sharing notice / opt out combination: {" + sharingOptOutNotice + " / " + sharingOptOut + "}"
        );
      }
    }

    if (saleOptOutNotice == 0) {
      if (saleOptOut == 1 || saleOptOut == 2) {
        throw new ValidationError(
          "Invalid usca sale notice / opt out combination: {" + saleOptOutNotice + " / " + saleOptOut + "}"
        );
      }
    } else if (saleOptOutNotice == 1) {
      if (saleOptOut == 0) {
        throw new ValidationError(
          "Invalid usca sale notice / opt out combination: {" + saleOptOutNotice + " / " + saleOptOut + "}"
        );
      }
    } else if (saleOptOutNotice == 2) {
      if (saleOptOut == 0 || saleOptOut == 2) {
        throw new ValidationError(
          "Invalid usca sale notice / opt out combination: {" + saleOptOutNotice + " / " + saleOptOut + "}"
        );
      }
    }

    if (mspaServiceProviderMode == 0) {
      if (saleOptOutNotice == 1 || saleOptOutNotice == 2) {
        throw new ValidationError(
          "Invalid usca mspa service provider mode / sale opt out notice combination: {" +
            mspaServiceProviderMode +
            " / " +
            saleOptOutNotice +
            "}"
        );
      }

      if (sharingOptOutNotice == 1 || sharingOptOutNotice == 2) {
        throw new ValidationError(
          "Invalid usca mspa service provider mode / sharing opt out notice combination: {" +
            mspaServiceProviderMode +
            " / " +
            sharingOptOutNotice +
            "}"
        );
      }

      if (sensitiveDataLimitUseNotice == 1 || sensitiveDataLimitUseNotice == 2) {
        throw new ValidationError(
          "Invalid usca mspa service provider mode / sensitive data limit use notice combination: {" +
            mspaServiceProviderMode +
            " / " +
            sensitiveDataLimitUseNotice +
            "}"
        );
      }
    } else if (mspaServiceProviderMode == 1) {
      if (mspaOptOutOptionMode == 0 || mspaOptOutOptionMode == 1) {
        throw new ValidationError(
          "Invalid usca mspa service provider / opt out option modes combination: {" +
            mspaServiceProviderMode +
            " / " +
            mspaServiceProviderMode +
            "}"
        );
      }

      if (saleOptOutNotice == 1 || saleOptOutNotice == 2) {
        throw new ValidationError(
          "Invalid usca mspa service provider mode / sale opt out notice combination: {" +
            mspaServiceProviderMode +
            " / " +
            saleOptOutNotice +
            "}"
        );
      }

      if (sharingOptOutNotice == 1 || sharingOptOutNotice == 2) {
        throw new ValidationError(
          "Invalid usca mspa service provider mode / sharing opt out notice combination: {" +
            mspaServiceProviderMode +
            " / " +
            sharingOptOutNotice +
            "}"
        );
      }

      if (sensitiveDataLimitUseNotice == 1 || sensitiveDataLimitUseNotice == 2) {
        throw new ValidationError(
          "Invalid usca mspa service provider mode / sensitive data limit use notice combination: {" +
            mspaServiceProviderMode +
            " / " +
            sensitiveDataLimitUseNotice +
            "}"
        );
      }
    } else if (mspaServiceProviderMode == 2) {
      if (mspaOptOutOptionMode == 0 || mspaOptOutOptionMode == 2) {
        throw new ValidationError(
          "Invalid usca mspa service provider / opt out option modes combination: {" +
            mspaServiceProviderMode +
            " / " +
            mspaOptOutOptionMode +
            "}"
        );
      }
    }
  }
}
