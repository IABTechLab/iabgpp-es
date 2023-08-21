import { expect } from "chai";
import { UsCoV1Field } from "../../../src/encoder/field/UsCoV1Field";
import { UsCoV1 } from "../../../src/encoder/section/UsCoV1";

describe("manifest.section.UsCoV1", (): void => {
  it("should encode default to BAAAAAA.QA", (): void => {
    let usCoV1 = new UsCoV1();
    expect(usCoV1.encode()).to.eql("BAAAAAA.QA");
  });

  it("should encode to BbYbG2w.YA", (): void => {
    let usCoV1 = new UsCoV1();

    usCoV1.setFieldValue(UsCoV1Field.SHARING_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 2);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 1);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usCoV1.setFieldValue(UsCoV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2]);
    usCoV1.setFieldValue(UsCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_COVERED_TRANSACTION, 1);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    usCoV1.setFieldValue(UsCoV1Field.GPC, true);

    expect(usCoV1.encode()).to.eql("BbYbG2w.YA");
  });

  it("should encode default to BAAAAAA", (): void => {
    let usCoV1 = new UsCoV1();
    usCoV1.setFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usCoV1.encode()).to.eql("BAAAAAA");
  });

  it("should decode BbYbG2w.YA", (): void => {
    let usCoV1 = new UsCoV1("BbYbG2w.YA");

    expect(1, usCoV1.getFieldValue(UsCoV1Field.SHARING_NOTICE));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2], usCoV1.getFieldValue(UsCoV1Field.SENSITIVE_DATA_PROCESSING));
    expect(3, usCoV1.getFieldValue(UsCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usCoV1.getFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usCoV1.getFieldValue(UsCoV1Field.GPC));
    expect(true, usCoV1.getFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BbYbG2w", (): void => {
    let usCoV1 = new UsCoV1("BbYbG2w");

    expect(1, usCoV1.getFieldValue(UsCoV1Field.SHARING_NOTICE));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2], usCoV1.getFieldValue(UsCoV1Field.SENSITIVE_DATA_PROCESSING));
    expect(3, usCoV1.getFieldValue(UsCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usCoV1.getFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usCoV1.getFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED));
  });
});
