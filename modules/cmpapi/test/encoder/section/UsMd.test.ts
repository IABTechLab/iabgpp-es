import { expect } from "chai";
import { UsMdField } from "../../../src/encoder/field/UsMdField";
import { UsMd } from "../../../src/encoder/section/UsMd";

describe("manifest.section.UsMd", (): void => {
  it("should encode default", (): void => {
    let usMd = new UsMd();
    expect(usMd.encode()).to.eql("BQAA.Q");
  });

  it("should encode with all fields set", (): void => {
    let usMd = new UsMd();

    usMd.setFieldValue(UsMdField.MSPA_COVERED_TRANSACTION, 1);
    usMd.setFieldValue(UsMdField.MSPA_MODE, 1);
    usMd.setFieldValue(UsMdField.PROCESSING_NOTICE, 1);
    usMd.setFieldValue(UsMdField.SALE_OPT_OUT_NOTICE, 1);
    usMd.setFieldValue(UsMdField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usMd.setFieldValue(UsMdField.SALE_OPT_OUT, 1);
    usMd.setFieldValue(UsMdField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usMd.setFieldValue(UsMdField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usMd.setFieldValue(UsMdField.GPC, true);

    expect(usMd.encode()).to.eql("BVVV.Y");
  });

  it("should encode default with gpc segment excluded", (): void => {
    let usMd = new UsMd();
    usMd.setFieldValue(UsMdField.GPC_SEGMENT_INCLUDED, false);
    expect(usMd.encode()).to.eql("BQAA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usMd = new UsMd();

    expect(function () {
      usMd.setFieldValue(UsMdField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usMd.setFieldValue(UsMdField.MSPA_MODE, 3);
    }).to.throw();

    expect(function () {
      usMd.setFieldValue(UsMdField.PROCESSING_NOTICE, 3);
    }).to.throw();
  });

  it("should decode", (): void => {
    let usMd = new UsMd("BVVV.Y");

    expect(usMd.getFieldValue(UsMdField.MSPA_COVERED_TRANSACTION)).to.eql(1);
    expect(usMd.getFieldValue(UsMdField.MSPA_MODE)).to.eql(1);
    expect(usMd.getFieldValue(UsMdField.PROCESSING_NOTICE)).to.eql(1);
    expect(usMd.getFieldValue(UsMdField.GPC)).to.eql(true);
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsMd("z").getFieldValue(UsMdField.PROCESSING_NOTICE);
    }).to.throw("Unable to decode UsMdCoreSegment 'z'");
  });
});
