import { expect } from "chai";
import { UsNjField } from "../../../src/encoder/field/UsNjField";
import { UsNj } from "../../../src/encoder/section/UsNj";

describe("manifest.section.UsNj", (): void => {
  it("should encode default to BAAAAAAAQA.QA", (): void => {
    let usNj = new UsNj();
    expect(usNj.encode()).to.eql("BAAAAAAAQA.QA");
  });

  it("should encode to BVWSSRklWA.YA", (): void => {
    let usNj = new UsNj();

    usNj.setFieldValue(UsNjField.PROCESSING_NOTICE, 1);
    usNj.setFieldValue(UsNjField.SALE_OPT_OUT_NOTICE, 1);
    usNj.setFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNj.setFieldValue(UsNjField.SALE_OPT_OUT, 1);
    usNj.setFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNj.setFieldValue(UsNjField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0, 1]);
    usNj.setFieldValue(UsNjField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0, 2, 1]);
    usNj.setFieldValue(UsNjField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usNj.setFieldValue(UsNjField.MSPA_COVERED_TRANSACTION, 1);
    usNj.setFieldValue(UsNjField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNj.setFieldValue(UsNjField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNj.setFieldValue(UsNjField.GPC, true);

    expect(usNj.encode()).to.eql("BVWSSRklWA.YA");
  });

  it("should encode default to BAAAAAAAQA", (): void => {
    let usNj = new UsNj();
    usNj.setFieldValue(UsNjField.GPC_SEGMENT_INCLUDED, false);
    expect(usNj.encode()).to.eql("BAAAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usNj = new UsNj();

    expect(function () {
      usNj.setFieldValue(UsNjField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usNj.setFieldValue(UsNjField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSRklWA.YA", (): void => {
    let usNj = new UsNj("BVWSSRklWA.YA");

    expect(1, usNj.getFieldValue(UsNjField.PROCESSING_NOTICE));
    expect(1, usNj.getFieldValue(UsNjField.SALE_OPT_OUT_NOTICE));
    expect(1, usNj.getFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNj.getFieldValue(UsNjField.SALE_OPT_OUT));
    expect(1, usNj.getFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 1], usNj.getFieldValue(UsNjField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0, 2, 1], usNj.getFieldValue(UsNjField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNj.getFieldValue(UsNjField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usNj.getFieldValue(UsNjField.MSPA_COVERED_TRANSACTION));
    expect(1, usNj.getFieldValue(UsNjField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNj.getFieldValue(UsNjField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usNj.getFieldValue(UsNjField.GPC));
    expect(true, usNj.getFieldValue(UsNjField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSRklWA", (): void => {
    let usNj = new UsNj("BVWSSRklWA");

    expect(1, usNj.getFieldValue(UsNjField.PROCESSING_NOTICE));
    expect(1, usNj.getFieldValue(UsNjField.SALE_OPT_OUT_NOTICE));
    expect(1, usNj.getFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNj.getFieldValue(UsNjField.SALE_OPT_OUT));
    expect(1, usNj.getFieldValue(UsNjField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 1], usNj.getFieldValue(UsNjField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0, 2, 1], usNj.getFieldValue(UsNjField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNj.getFieldValue(UsNjField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usNj.getFieldValue(UsNjField.MSPA_COVERED_TRANSACTION));
    expect(1, usNj.getFieldValue(UsNjField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNj.getFieldValue(UsNjField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usNj.getFieldValue(UsNjField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsNj("z").getFieldValue(UsNjField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsNjCoreSegment 'z'");
  });
});
