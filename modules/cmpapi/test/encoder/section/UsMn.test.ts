import { expect } from "chai";
import { UsMnField } from "../../../src/encoder/field/UsMnField";
import { UsMn } from "../../../src/encoder/section/UsMn";

describe("manifest.section.UsMn", (): void => {
  it("should encode default to BAAAAAQA.QA", (): void => {
    let usMn = new UsMn();
    expect(usMn.encode()).to.eql("BAAAAAQA.QA");
  });

  it("should encode to BVWSSVWA.YA", (): void => {
    let usMn = new UsMn();

    usMn.setFieldValue(UsMnField.PROCESSING_NOTICE, 1);
    usMn.setFieldValue(UsMnField.SALE_OPT_OUT_NOTICE, 1);
    usMn.setFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usMn.setFieldValue(UsMnField.SALE_OPT_OUT, 1);
    usMn.setFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usMn.setFieldValue(UsMnField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usMn.setFieldValue(UsMnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usMn.setFieldValue(UsMnField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usMn.setFieldValue(UsMnField.MSPA_COVERED_TRANSACTION, 1);
    usMn.setFieldValue(UsMnField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usMn.setFieldValue(UsMnField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usMn.setFieldValue(UsMnField.GPC, true);

    expect(usMn.encode()).to.eql("BVWSSVWA.YA");
  });

  it("should encode default to BAAAAAQA", (): void => {
    let usMn = new UsMn();
    usMn.setFieldValue(UsMnField.GPC_SEGMENT_INCLUDED, false);
    expect(usMn.encode()).to.eql("BAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usMn = new UsMn();

    expect(function () {
      usMn.setFieldValue(UsMnField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usMn.setFieldValue(UsMnField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSVWA.YA", (): void => {
    let usMn = new UsMn("BVWSSVWA.YA");

    expect(1, usMn.getFieldValue(UsMnField.PROCESSING_NOTICE));
    expect(1, usMn.getFieldValue(UsMnField.SALE_OPT_OUT_NOTICE));
    expect(1, usMn.getFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usMn.getFieldValue(UsMnField.SALE_OPT_OUT));
    expect(1, usMn.getFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usMn.getFieldValue(UsMnField.SENSITIVE_DATA_PROCESSING));
    expect(1, usMn.getFieldValue(UsMnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usMn.getFieldValue(UsMnField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usMn.getFieldValue(UsMnField.MSPA_COVERED_TRANSACTION));
    expect(1, usMn.getFieldValue(UsMnField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usMn.getFieldValue(UsMnField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usMn.getFieldValue(UsMnField.GPC));
    expect(true, usMn.getFieldValue(UsMnField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSVWA", (): void => {
    let usMn = new UsMn("BVWSSVWA");

    expect(1, usMn.getFieldValue(UsMnField.PROCESSING_NOTICE));
    expect(1, usMn.getFieldValue(UsMnField.SALE_OPT_OUT_NOTICE));
    expect(1, usMn.getFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usMn.getFieldValue(UsMnField.SALE_OPT_OUT));
    expect(1, usMn.getFieldValue(UsMnField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usMn.getFieldValue(UsMnField.SENSITIVE_DATA_PROCESSING));
    expect(1, usMn.getFieldValue(UsMnField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usMn.getFieldValue(UsMnField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usMn.getFieldValue(UsMnField.MSPA_COVERED_TRANSACTION));
    expect(1, usMn.getFieldValue(UsMnField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usMn.getFieldValue(UsMnField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usMn.getFieldValue(UsMnField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsMn("z").getFieldValue(UsMnField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsMnCoreSegment 'z'");
  });
});
