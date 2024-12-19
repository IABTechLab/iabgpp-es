import { expect } from "chai";
import { UsNhField } from "../../../src/encoder/field/UsNhField";
import { UsNh } from "../../../src/encoder/section/UsNh";

describe("manifest.section.UsNh", (): void => {
  it("should encode default to BAAAAABA.QA", (): void => {
    let usNh = new UsNh();
    expect(usNh.encode()).to.eql("BAAAAABA.QA");
  });

  it("should encode to BVWSSZFY.YA", (): void => {
    let usNh = new UsNh();

    usNh.setFieldValue(UsNhField.PROCESSING_NOTICE, 1);
    usNh.setFieldValue(UsNhField.SALE_OPT_OUT_NOTICE, 1);
    usNh.setFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNh.setFieldValue(UsNhField.SALE_OPT_OUT, 1);
    usNh.setFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNh.setFieldValue(UsNhField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usNh.setFieldValue(UsNhField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usNh.setFieldValue(UsNhField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usNh.setFieldValue(UsNhField.MSPA_COVERED_TRANSACTION, 1);
    usNh.setFieldValue(UsNhField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNh.setFieldValue(UsNhField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNh.setFieldValue(UsNhField.GPC, true);

    expect(usNh.encode()).to.eql("BVWSSZFY.YA");
  });

  it("should encode default to BAAAAABA", (): void => {
    let usNh = new UsNh();
    usNh.setFieldValue(UsNhField.GPC_SEGMENT_INCLUDED, false);
    expect(usNh.encode()).to.eql("BAAAAABA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usNh = new UsNh();

    expect(function () {
      usNh.setFieldValue(UsNhField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usNh.setFieldValue(UsNhField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSZFY.YA", (): void => {
    let usNh = new UsNh("BVWSSZFY.YA");

    expect(1, usNh.getFieldValue(UsNhField.PROCESSING_NOTICE));
    expect(1, usNh.getFieldValue(UsNhField.SALE_OPT_OUT_NOTICE));
    expect(1, usNh.getFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNh.getFieldValue(UsNhField.SALE_OPT_OUT));
    expect(1, usNh.getFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usNh.getFieldValue(UsNhField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usNh.getFieldValue(UsNhField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNh.getFieldValue(UsNhField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usNh.getFieldValue(UsNhField.MSPA_COVERED_TRANSACTION));
    expect(1, usNh.getFieldValue(UsNhField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNh.getFieldValue(UsNhField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usNh.getFieldValue(UsNhField.GPC));
    expect(true, usNh.getFieldValue(UsNhField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSZFY", (): void => {
    let usNh = new UsNh("BVWSSZFY");

    expect(1, usNh.getFieldValue(UsNhField.PROCESSING_NOTICE));
    expect(1, usNh.getFieldValue(UsNhField.SALE_OPT_OUT_NOTICE));
    expect(1, usNh.getFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNh.getFieldValue(UsNhField.SALE_OPT_OUT));
    expect(1, usNh.getFieldValue(UsNhField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usNh.getFieldValue(UsNhField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usNh.getFieldValue(UsNhField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNh.getFieldValue(UsNhField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usNh.getFieldValue(UsNhField.MSPA_COVERED_TRANSACTION));
    expect(1, usNh.getFieldValue(UsNhField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNh.getFieldValue(UsNhField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usNh.getFieldValue(UsNhField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsNh("z").getFieldValue(UsNhField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsNhCoreSegment 'z'");
  });
});
