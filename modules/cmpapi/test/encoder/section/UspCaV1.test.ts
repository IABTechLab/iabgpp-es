import { expect } from "chai";
import { UsCaV1Field } from "../../../src/encoder/field/UsCaV1Field";
import { UsCaV1 } from "../../../src/encoder/section/UsCaV1";

describe("manifest.section.UsCaV1", (): void => {
  it("should encode default to BAAAAAAA.QA", (): void => {
    let UsCaV1 = new UsCaV1();
    expect(UsCaV1.encode()).to.eql("BAAAAAAA.QA");
  });

  it("should encode to BbYbGwXY.YA", (): void => {
    let UsCaV1 = new UsCaV1();

    UsCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    UsCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
    UsCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 3);
    UsCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 1);
    UsCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 2);
    UsCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3, 0]);
    UsCaV1.setFieldValue(UsCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 1]);
    UsCaV1.setFieldValue(UsCaV1Field.PERSONAL_DATA_CONSENTS, 1);
    UsCaV1.setFieldValue(UsCaV1Field.MSPA_COVERED_TRANSACTION, 3);
    UsCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    UsCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    UsCaV1.setFieldValue(UsCaV1Field.GPC, true);

    expect(UsCaV1.encode()).to.eql("BbYbGwXY.YA");
  });

  it("should encode to BUoAAABQ.YA", (): void => {
    let UsCaV1 = new UsCaV1();

    UsCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    UsCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
    UsCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    UsCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 2);
    UsCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 2);
    UsCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_PROCESSING, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    UsCaV1.setFieldValue(UsCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 0]);
    UsCaV1.setFieldValue(UsCaV1Field.PERSONAL_DATA_CONSENTS, 0);
    UsCaV1.setFieldValue(UsCaV1Field.MSPA_COVERED_TRANSACTION, 1);
    UsCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    UsCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    UsCaV1.setFieldValue(UsCaV1Field.GPC, true);

    expect(UsCaV1.encode()).to.eql("BUoAAABQ.YA");
  });

  it("should encode to BAAAAAAA", (): void => {
    let UsCaV1 = new UsCaV1();
    UsCaV1.setFieldValue(UsCaV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(UsCaV1.encode()).to.eql("BAAAAAAA");
  });

  it("should decode BbYbGwXY.YA", (): void => {
    let UsCaV1 = new UsCaV1("BbYbGwXY.YA");

    expect(1, UsCaV1.getFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE));
    expect(2, UsCaV1.getFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE));
    expect(3, UsCaV1.getFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, UsCaV1.getFieldValue(UsCaV1Field.SALE_OPT_OUT));
    expect(2, UsCaV1.getFieldValue(UsCaV1Field.SHARING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3, 0], UsCaV1.getFieldValue(UsCaV1Field.SENSITIVE_DATA_PROCESSING));
    expect([0, 1], UsCaV1.getFieldValue(UsCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, UsCaV1.getFieldValue(UsCaV1Field.PERSONAL_DATA_CONSENTS));
    expect(3, UsCaV1.getFieldValue(UsCaV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, UsCaV1.getFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, UsCaV1.getFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, UsCaV1.getFieldValue(UsCaV1Field.GPC));
    expect(true, UsCaV1.getFieldValue(UsCaV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BAAAAAAA", (): void => {
    let UsCaV1 = new UsCaV1("BbYbGwXY.YA");

    expect(1, UsCaV1.getFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE));
    expect(2, UsCaV1.getFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE));
    expect(3, UsCaV1.getFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, UsCaV1.getFieldValue(UsCaV1Field.SALE_OPT_OUT));
    expect(2, UsCaV1.getFieldValue(UsCaV1Field.SHARING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3, 0], UsCaV1.getFieldValue(UsCaV1Field.SENSITIVE_DATA_PROCESSING));
    expect([0, 1], UsCaV1.getFieldValue(UsCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, UsCaV1.getFieldValue(UsCaV1Field.PERSONAL_DATA_CONSENTS));
    expect(3, UsCaV1.getFieldValue(UsCaV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, UsCaV1.getFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, UsCaV1.getFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, UsCaV1.getFieldValue(UsCaV1Field.GPC_SEGMENT_INCLUDED));
  });
});
