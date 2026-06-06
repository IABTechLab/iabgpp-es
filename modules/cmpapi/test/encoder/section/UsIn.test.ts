import { expect } from "chai";
import { UsInField } from "../../../src/encoder/field/UsInField";
import { UsIn } from "../../../src/encoder/section/UsIn";

describe("manifest.section.UsIn", (): void => {
  it("should encode default", (): void => {
    let usIn = new UsIn();
    expect(usIn.encode()).to.eql("BQAAAAA.QA");
  });

  it("should encode with all fields set", (): void => {
    let usIn = new UsIn();

    usIn.setFieldValue(UsInField.MSPA_COVERED_TRANSACTION, 1);
    usIn.setFieldValue(UsInField.MSPA_MODE, 1);
    usIn.setFieldValue(UsInField.PROCESSING_NOTICE, 1);
    usIn.setFieldValue(UsInField.SALE_OPT_OUT_NOTICE, 1);
    usIn.setFieldValue(UsInField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usIn.setFieldValue(UsInField.SALE_OPT_OUT, 1);
    usIn.setFieldValue(UsInField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usIn.setFieldValue(UsInField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usIn.setFieldValue(UsInField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usIn.setFieldValue(UsInField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usIn.setFieldValue(UsInField.GPC, true);

    expect(usIn.encode()).to.eql("BVVVkkk.YA");
  });

  it("should encode default with gpc segment excluded", (): void => {
    let usIn = new UsIn();
    usIn.setFieldValue(UsInField.GPC_SEGMENT_INCLUDED, false);
    expect(usIn.encode()).to.eql("BQAAAAA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usIn = new UsIn();

    expect(function () {
      usIn.setFieldValue(UsInField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usIn.setFieldValue(UsInField.MSPA_MODE, 3);
    }).to.throw();

    expect(function () {
      usIn.setFieldValue(UsInField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();
  });

  it("should decode", (): void => {
    let usIn = new UsIn("BVVVkkk.YA");

    expect(usIn.getFieldValue(UsInField.MSPA_COVERED_TRANSACTION)).to.eql(1);
    expect(usIn.getFieldValue(UsInField.MSPA_MODE)).to.eql(1);
    expect(usIn.getFieldValue(UsInField.SENSITIVE_DATA_PROCESSING)).to.eql([2, 1, 0, 2, 1, 0, 2, 1]);
    expect(usIn.getFieldValue(UsInField.GPC)).to.eql(true);
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsIn("z").getFieldValue(UsInField.PROCESSING_NOTICE);
    }).to.throw("Unable to decode UsInCoreSegment 'z'");
  });
});
