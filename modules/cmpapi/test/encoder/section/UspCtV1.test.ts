import { expect } from "chai";
import { UsCtV1Field } from "../../../src/encoder/field/UsCtV1Field";
import { UsCtV1 } from "../../../src/encoder/section/UsCtV1";

describe("manifest.section.UsCtV1", (): void => {
  it("should encode default to BAAAAAAA.QA", (): void => {
    let uspCtV1 = new UsCtV1();
    expect(uspCtV1.encode()).to.eql("BAAAAAAA.QA");
  });

  it("should encode to BbYbG22w.YA", (): void => {
    let uspCtV1 = new UsCtV1();

    uspCtV1.setFieldValue(UsCtV1Field.SHARING_NOTICE, 1);
    uspCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 2);
    uspCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    uspCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 1);
    uspCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    uspCtV1.setFieldValue(UsCtV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3]);
    uspCtV1.setFieldValue(UsCtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    uspCtV1.setFieldValue(UsCtV1Field.MSPA_COVERED_TRANSACTION, 1);
    uspCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    uspCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    uspCtV1.setFieldValue(UsCtV1Field.GPC, true);

    expect(uspCtV1.encode()).to.eql("BbYbG22w.YA");
  });

  it("should encode default to BAAAAAAA", (): void => {
    let uspCtV1 = new UsCtV1();
    uspCtV1.setFieldValue(UsCtV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(uspCtV1.encode()).to.eql("BAAAAAAA");
  });

  it("should decode BbYbG22w.YA", (): void => {
    let uspCtV1 = new UsCtV1("BbYbG22w.YA");

    expect(1, uspCtV1.getFieldValue(UsCtV1Field.SHARING_NOTICE));
    expect(2, uspCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, uspCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, uspCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT));
    expect(2, uspCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], uspCtV1.getFieldValue(UsCtV1Field.SENSITIVE_DATA_PROCESSING));
    expect([1, 2, 3], uspCtV1.getFieldValue(UsCtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, uspCtV1.getFieldValue(UsCtV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, uspCtV1.getFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, uspCtV1.getFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, uspCtV1.getFieldValue(UsCtV1Field.GPC));
    expect(true, uspCtV1.getFieldValue(UsCtV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BbYbG22w", (): void => {
    let uspCtV1 = new UsCtV1("BbYbG22w");

    expect(1, uspCtV1.getFieldValue(UsCtV1Field.SHARING_NOTICE));
    expect(2, uspCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, uspCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, uspCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT));
    expect(2, uspCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], uspCtV1.getFieldValue(UsCtV1Field.SENSITIVE_DATA_PROCESSING));
    expect([1, 2, 3], uspCtV1.getFieldValue(UsCtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, uspCtV1.getFieldValue(UsCtV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, uspCtV1.getFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, uspCtV1.getFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, uspCtV1.getFieldValue(UsCtV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsCtV1("z").getFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE);
    }).to.throw("Unable to decode field 'MspaOptOutOptionMode'");
  });
});
