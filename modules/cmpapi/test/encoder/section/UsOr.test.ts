import { expect } from "chai";
import { UsOrField } from "../../../src/encoder/field/UsOrField";
import { UsOr } from "../../../src/encoder/section/UsOr";

describe("manifest.section.UsOr", (): void => {
  it("should encode default to BAAAAAABAA.QA", (): void => {
    let usOr = new UsOr();
    expect(usOr.encode()).to.eql("BAAAAAABAA.QA");
  });

  it("should encode to BVWSSRpFYA.YA", (): void => {
    let usOr = new UsOr();

    usOr.setFieldValue(UsOrField.PROCESSING_NOTICE, 1);
    usOr.setFieldValue(UsOrField.SALE_OPT_OUT_NOTICE, 1);
    usOr.setFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usOr.setFieldValue(UsOrField.SALE_OPT_OUT, 1);
    usOr.setFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usOr.setFieldValue(UsOrField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0, 1, 2]);
    usOr.setFieldValue(UsOrField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usOr.setFieldValue(UsOrField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usOr.setFieldValue(UsOrField.MSPA_COVERED_TRANSACTION, 1);
    usOr.setFieldValue(UsOrField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usOr.setFieldValue(UsOrField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usOr.setFieldValue(UsOrField.GPC, true);

    expect(usOr.encode()).to.eql("BVWSSRpFYA.YA");
  });

  it("should encode default to BAAAAAABAA", (): void => {
    let usOr = new UsOr();
    usOr.setFieldValue(UsOrField.GPC_SEGMENT_INCLUDED, false);
    expect(usOr.encode()).to.eql("BAAAAAABAA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usOr = new UsOr();

    expect(function () {
      usOr.setFieldValue(UsOrField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usOr.setFieldValue(UsOrField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSRpFYA.YA", (): void => {
    let usOr = new UsOr("BVWSSRpFYA.YA");

    expect(1, usOr.getFieldValue(UsOrField.PROCESSING_NOTICE));
    expect(1, usOr.getFieldValue(UsOrField.SALE_OPT_OUT_NOTICE));
    expect(1, usOr.getFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usOr.getFieldValue(UsOrField.SALE_OPT_OUT));
    expect(1, usOr.getFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 1, 2], usOr.getFieldValue(UsOrField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usOr.getFieldValue(UsOrField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usOr.getFieldValue(UsOrField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usOr.getFieldValue(UsOrField.MSPA_COVERED_TRANSACTION));
    expect(1, usOr.getFieldValue(UsOrField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usOr.getFieldValue(UsOrField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usOr.getFieldValue(UsOrField.GPC));
    expect(true, usOr.getFieldValue(UsOrField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSRpFYA", (): void => {
    let usOr = new UsOr("BVWSSRpFYA");

    expect(1, usOr.getFieldValue(UsOrField.PROCESSING_NOTICE));
    expect(1, usOr.getFieldValue(UsOrField.SALE_OPT_OUT_NOTICE));
    expect(1, usOr.getFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usOr.getFieldValue(UsOrField.SALE_OPT_OUT));
    expect(1, usOr.getFieldValue(UsOrField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 1, 2], usOr.getFieldValue(UsOrField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usOr.getFieldValue(UsOrField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usOr.getFieldValue(UsOrField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usOr.getFieldValue(UsOrField.MSPA_COVERED_TRANSACTION));
    expect(1, usOr.getFieldValue(UsOrField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usOr.getFieldValue(UsOrField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usOr.getFieldValue(UsOrField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsOr("z").getFieldValue(UsOrField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsOrCoreSegment 'z'");
  });
});
