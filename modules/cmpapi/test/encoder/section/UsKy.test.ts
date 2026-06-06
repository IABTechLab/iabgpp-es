import { expect } from "chai";
import { UsKyField } from "../../../src/encoder/field/UsKyField";
import { UsKy } from "../../../src/encoder/section/UsKy";

describe("manifest.section.UsKy", (): void => {
  it("should encode default", (): void => {
    let usKy = new UsKy();
    expect(usKy.encode()).to.eql("BQAAAAA.QA");
  });

  it("should encode with all fields set", (): void => {
    let usKy = new UsKy();

    usKy.setFieldValue(UsKyField.MSPA_COVERED_TRANSACTION, 1);
    usKy.setFieldValue(UsKyField.MSPA_MODE, 1);
    usKy.setFieldValue(UsKyField.PROCESSING_NOTICE, 1);
    usKy.setFieldValue(UsKyField.SALE_OPT_OUT_NOTICE, 1);
    usKy.setFieldValue(UsKyField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usKy.setFieldValue(UsKyField.SALE_OPT_OUT, 1);
    usKy.setFieldValue(UsKyField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usKy.setFieldValue(UsKyField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usKy.setFieldValue(UsKyField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usKy.setFieldValue(UsKyField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usKy.setFieldValue(UsKyField.GPC, true);

    expect(usKy.encode()).to.eql("BVVVkkk.YA");
  });

  it("should encode default with gpc segment excluded", (): void => {
    let usKy = new UsKy();
    usKy.setFieldValue(UsKyField.GPC_SEGMENT_INCLUDED, false);
    expect(usKy.encode()).to.eql("BQAAAAA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usKy = new UsKy();

    expect(function () {
      usKy.setFieldValue(UsKyField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usKy.setFieldValue(UsKyField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();
  });

  it("should decode", (): void => {
    let usKy = new UsKy("BVVVkkk.YA");

    expect(usKy.getFieldValue(UsKyField.MSPA_COVERED_TRANSACTION)).to.eql(1);
    expect(usKy.getFieldValue(UsKyField.SENSITIVE_DATA_PROCESSING)).to.eql([2, 1, 0, 2, 1, 0, 2, 1]);
    expect(usKy.getFieldValue(UsKyField.GPC)).to.eql(true);
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsKy("z").getFieldValue(UsKyField.PROCESSING_NOTICE);
    }).to.throw("Unable to decode UsKyCoreSegment 'z'");
  });
});
