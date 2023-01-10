import { expect } from "chai";
import { UspCoV1Field } from "../../../src/encoder/field/UspCoV1Field";
import { UspCoV1 } from "../../../src/encoder/section/UspCoV1";

describe("manifest.section.UspCoV1", (): void => {
  it("should encode default to BAAAAAA.QA", (): void => {
    let uspCoV1 = new UspCoV1();
    expect(uspCoV1.encode()).to.eql("BAAAAAA.QA");
  });

  it("should encode to BbYbG2w.YA", (): void => {
    let uspCoV1 = new UspCoV1();

    uspCoV1.setFieldValue(UspCoV1Field.SHARING_NOTICE, 1);
    uspCoV1.setFieldValue(UspCoV1Field.SALE_OPT_OUT_NOTICE, 2);
    uspCoV1.setFieldValue(UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    uspCoV1.setFieldValue(UspCoV1Field.SALE_OPT_OUT, 1);
    uspCoV1.setFieldValue(UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    uspCoV1.setFieldValue(UspCoV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2]);
    uspCoV1.setFieldValue(UspCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    uspCoV1.setFieldValue(UspCoV1Field.MSPA_COVERED_TRANSACTION, 1);
    uspCoV1.setFieldValue(UspCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    uspCoV1.setFieldValue(UspCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    uspCoV1.setFieldValue(UspCoV1Field.GPC, true);

    expect(uspCoV1.encode()).to.eql("BbYbG2w.YA");
  });

  it("should decode BbYbG2w.YA", (): void => {
    let uspCoV1 = new UspCoV1("BbYbG2w.YA");

    expect(1, uspCoV1.getFieldValue(UspCoV1Field.SHARING_NOTICE));
    expect(2, uspCoV1.getFieldValue(UspCoV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, uspCoV1.getFieldValue(UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, uspCoV1.getFieldValue(UspCoV1Field.SALE_OPT_OUT));
    expect(2, uspCoV1.getFieldValue(UspCoV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2], uspCoV1.getFieldValue(UspCoV1Field.SENSITIVE_DATA_PROCESSING));
    expect(3, uspCoV1.getFieldValue(UspCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, uspCoV1.getFieldValue(UspCoV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, uspCoV1.getFieldValue(UspCoV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, uspCoV1.getFieldValue(UspCoV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, uspCoV1.getFieldValue(UspCoV1Field.GPC));
  });
});
