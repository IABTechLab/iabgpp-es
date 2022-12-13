import { expect } from "chai";
import { UspNatV1Field } from "../../../src/encoder/field/UspNatV1Field";
import { UspNatV1 } from "../../../src/encoder/section/UspNatV1";

describe("manifest.section.UspNatV1", (): void => {
  it("should encode default to BAAAAAAAAAAA.QAAA", (): void => {
    let uspNatV1 = new UspNatV1();
    expect(uspNatV1.encode()).to.eql("BAAAAAAAAAAA.QAAA");
  });

  it("should encode to BbbbGxsbFbAA.YAAA", (): void => {
    let uspNatV1 = new UspNatV1();

    uspNatV1.setFieldValue(UspNatV1Field.SHARING_NOTICE, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SALE_OPT_OUT_NOTICE, 2);
    uspNatV1.setFieldValue(UspNatV1Field.SHARING_OPT_OUT_NOTICE, 3);
    uspNatV1.setFieldValue(UspNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 2);
    uspNatV1.setFieldValue(UspNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 3);
    uspNatV1.setFieldValue(UspNatV1Field.SALE_OPT_OUT, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SHARING_OPT_OUT, 2);
    uspNatV1.setFieldValue(UspNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 3);
    uspNatV1.setFieldValue(UspNatV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]);
    uspNatV1.setFieldValue(UspNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 1]);
    uspNatV1.setFieldValue(UspNatV1Field.PERSONAL_DATA_CONSENTS, 1);
    uspNatV1.setFieldValue(UspNatV1Field.MSPA_COVERED_TRANSACTION, 1);
    uspNatV1.setFieldValue(UspNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    uspNatV1.setFieldValue(UspNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    uspNatV1.setFieldValue(UspNatV1Field.GPC, true);

    expect(uspNatV1.encode()).to.eql("BbbbGxsbFbAA.YAAA");
  });

  it("should encode to BVQVAAAAAUAA.YAAA", (): void => {
    let uspNatV1 = new UspNatV1();

    uspNatV1.setFieldValue(UspNatV1Field.SHARING_NOTICE, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SALE_OPT_OUT_NOTICE, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
    uspNatV1.setFieldValue(UspNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 0);
    uspNatV1.setFieldValue(UspNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    uspNatV1.setFieldValue(UspNatV1Field.SALE_OPT_OUT, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SHARING_OPT_OUT, 1);
    uspNatV1.setFieldValue(UspNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    uspNatV1.setFieldValue(UspNatV1Field.SENSITIVE_DATA_PROCESSING, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    uspNatV1.setFieldValue(UspNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 0]);
    uspNatV1.setFieldValue(UspNatV1Field.PERSONAL_DATA_CONSENTS, 0);
    uspNatV1.setFieldValue(UspNatV1Field.MSPA_COVERED_TRANSACTION, 1);
    uspNatV1.setFieldValue(UspNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    uspNatV1.setFieldValue(UspNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    uspNatV1.setFieldValue(UspNatV1Field.GPC, true);

    expect(uspNatV1.encode()).to.eql("BVQVAAAAAUAA.YAAA");
  });

  it("should decode BbbbGxsbFbAA.YAAA", (): void => {
    let uspNatV1 = new UspNatV1("BbbbGxsbFbAA.YAAA");

    expect(1, uspNatV1.getFieldValue(UspNatV1Field.SHARING_NOTICE));
    expect(2, uspNatV1.getFieldValue(UspNatV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, uspNatV1.getFieldValue(UspNatV1Field.SHARING_OPT_OUT_NOTICE));
    expect(1, uspNatV1.getFieldValue(UspNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(2, uspNatV1.getFieldValue(UspNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(3, uspNatV1.getFieldValue(UspNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, uspNatV1.getFieldValue(UspNatV1Field.SALE_OPT_OUT));
    expect(2, uspNatV1.getFieldValue(UspNatV1Field.SHARING_OPT_OUT));
    expect(3, uspNatV1.getFieldValue(UspNatV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], uspNatV1.getFieldValue(UspNatV1Field.SENSITIVE_DATA_PROCESSING));
    expect([0, 1], uspNatV1.getFieldValue(UspNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, uspNatV1.getFieldValue(UspNatV1Field.PERSONAL_DATA_CONSENTS));
    expect(1, uspNatV1.getFieldValue(UspNatV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, uspNatV1.getFieldValue(UspNatV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, uspNatV1.getFieldValue(UspNatV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, uspNatV1.getFieldValue(UspNatV1Field.GPC));
  });
});
