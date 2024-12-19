import { expect } from "chai";
import { UsTnField } from "../../../src/encoder/field/UsTnField";
import { UsTn } from "../../../src/encoder/section/UsTn";

describe("manifest.section.UsTn", (): void => {
  it("should encode default to BAAAAAQA.QA", (): void => {
    let usTn = new UsTn();
    expect(usTn.encode()).to.eql("BAAAAAQA.QA");
  });

  it("should encode to BVWSSVWA.YA", (): void => {
    let usTn = new UsTn();

    usTn.setFieldValue(UsTnField.PROCESSING_NOTICE, 1);
    usTn.setFieldValue(UsTnField.SALE_OPT_OUT_NOTICE, 1);
    usTn.setFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usTn.setFieldValue(UsTnField.SALE_OPT_OUT, 1);
    usTn.setFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usTn.setFieldValue(UsTnField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usTn.setFieldValue(UsTnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usTn.setFieldValue(UsTnField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usTn.setFieldValue(UsTnField.MSPA_COVERED_TRANSACTION, 1);
    usTn.setFieldValue(UsTnField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usTn.setFieldValue(UsTnField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usTn.setFieldValue(UsTnField.GPC, true);

    expect(usTn.encode()).to.eql("BVWSSVWA.YA");
  });

  it("should encode default to BAAAAAQA", (): void => {
    let usTn = new UsTn();
    usTn.setFieldValue(UsTnField.GPC_SEGMENT_INCLUDED, false);
    expect(usTn.encode()).to.eql("BAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usTn = new UsTn();

    expect(function () {
      usTn.setFieldValue(UsTnField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usTn.setFieldValue(UsTnField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSVWA.YA", (): void => {
    let usTn = new UsTn("BVWSSVWA.YA");

    expect(1, usTn.getFieldValue(UsTnField.PROCESSING_NOTICE));
    expect(1, usTn.getFieldValue(UsTnField.SALE_OPT_OUT_NOTICE));
    expect(1, usTn.getFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usTn.getFieldValue(UsTnField.SALE_OPT_OUT));
    expect(1, usTn.getFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usTn.getFieldValue(UsTnField.SENSITIVE_DATA_PROCESSING));
    expect(1, usTn.getFieldValue(UsTnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usTn.getFieldValue(UsTnField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usTn.getFieldValue(UsTnField.MSPA_COVERED_TRANSACTION));
    expect(1, usTn.getFieldValue(UsTnField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usTn.getFieldValue(UsTnField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usTn.getFieldValue(UsTnField.GPC));
    expect(true, usTn.getFieldValue(UsTnField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSVWA", (): void => {
    let usTn = new UsTn("BVWSSVWA");

    expect(1, usTn.getFieldValue(UsTnField.PROCESSING_NOTICE));
    expect(1, usTn.getFieldValue(UsTnField.SALE_OPT_OUT_NOTICE));
    expect(1, usTn.getFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usTn.getFieldValue(UsTnField.SALE_OPT_OUT));
    expect(1, usTn.getFieldValue(UsTnField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usTn.getFieldValue(UsTnField.SENSITIVE_DATA_PROCESSING));
    expect(1, usTn.getFieldValue(UsTnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usTn.getFieldValue(UsTnField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usTn.getFieldValue(UsTnField.MSPA_COVERED_TRANSACTION));
    expect(1, usTn.getFieldValue(UsTnField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usTn.getFieldValue(UsTnField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usTn.getFieldValue(UsTnField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsTn("z").getFieldValue(UsTnField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsTnCoreSegment 'z'");
  });
});
