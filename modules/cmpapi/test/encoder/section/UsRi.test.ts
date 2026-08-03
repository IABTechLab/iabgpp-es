import { expect } from "chai";
import { UsRiField } from "../../../src/encoder/field/UsRiField";
import { UsRi } from "../../../src/encoder/section/UsRi";

describe("manifest.section.UsRi", (): void => {
  it("should encode default", (): void => {
    let usRi = new UsRi();
    expect(usRi.encode()).to.eql("BQAA.AAA");
  });

  it("should encode with all fields set", (): void => {
    let usRi = new UsRi();

    usRi.setFieldValue(UsRiField.MSPA_COVERED_TRANSACTION, 1);
    usRi.setFieldValue(UsRiField.MSPA_MODE, 1);
    usRi.setFieldValue(UsRiField.PROCESSING_NOTICE, 1);
    usRi.setFieldValue(UsRiField.SALE_OPT_OUT_NOTICE, 1);
    usRi.setFieldValue(UsRiField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usRi.setFieldValue(UsRiField.SALE_OPT_OUT, 1);
    usRi.setFieldValue(UsRiField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usRi.setFieldValue(UsRiField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usRi.setFieldValue(UsRiField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usRi.setFieldValue(UsRiField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);

    expect(usRi.encode()).to.eql("BVVV.kkk");
  });

  it("should encode default with sensitive data consent segment excluded", (): void => {
    let usRi = new UsRi();
    usRi.setFieldValue(UsRiField.SENSITIVE_DATA_CONSENT_SEGMENT_INCLUDED, false);
    expect(usRi.encode()).to.eql("BQAA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usRi = new UsRi();

    expect(function () {
      usRi.setFieldValue(UsRiField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usRi.setFieldValue(UsRiField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();
  });

  it("should decode", (): void => {
    let usRi = new UsRi("BVVV.kkk");

    expect(usRi.getFieldValue(UsRiField.MSPA_COVERED_TRANSACTION)).to.eql(1);
    expect(usRi.getFieldValue(UsRiField.SENSITIVE_DATA_PROCESSING)).to.eql([2, 1, 0, 2, 1, 0, 2, 1]);
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsRi("z").getFieldValue(UsRiField.PROCESSING_NOTICE);
    }).to.throw("Unable to decode UsRiCoreSegment 'z'");
  });
});
