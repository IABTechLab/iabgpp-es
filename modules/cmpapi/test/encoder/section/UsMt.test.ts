import { expect } from "chai";
import { UsMtField } from "../../../src/encoder/field/UsMtField";
import { UsMt } from "../../../src/encoder/section/UsMt";

describe("manifest.section.UsMt", (): void => {
  it("should encode default to BAAAAABA.QA", (): void => {
    let usMt = new UsMt();
    expect(usMt.encode()).to.eql("BAAAAABA.QA");
  });

  it("should encode to BVWSSZFY.YA", (): void => {
    let usMt = new UsMt();

    usMt.setFieldValue(UsMtField.SHARING_NOTICE, 1);
    usMt.setFieldValue(UsMtField.SALE_OPT_OUT_NOTICE, 1);
    usMt.setFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usMt.setFieldValue(UsMtField.SALE_OPT_OUT, 1);
    usMt.setFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usMt.setFieldValue(UsMtField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usMt.setFieldValue(UsMtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usMt.setFieldValue(UsMtField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usMt.setFieldValue(UsMtField.MSPA_COVERED_TRANSACTION, 1);
    usMt.setFieldValue(UsMtField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usMt.setFieldValue(UsMtField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usMt.setFieldValue(UsMtField.GPC, true);

    expect(usMt.encode()).to.eql("BVWSSZFY.YA");
  });

  it("should encode default to BAAAAABA", (): void => {
    let usMt = new UsMt();
    usMt.setFieldValue(UsMtField.GPC_SEGMENT_INCLUDED, false);
    expect(usMt.encode()).to.eql("BAAAAABA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usMt = new UsMt();

    expect(function () {
      usMt.setFieldValue(UsMtField.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usMt.setFieldValue(UsMtField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSZFY.YA", (): void => {
    let usMt = new UsMt("BVWSSZFY.YA");

    expect(1, usMt.getFieldValue(UsMtField.SHARING_NOTICE));
    expect(1, usMt.getFieldValue(UsMtField.SALE_OPT_OUT_NOTICE));
    expect(1, usMt.getFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usMt.getFieldValue(UsMtField.SALE_OPT_OUT));
    expect(1, usMt.getFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usMt.getFieldValue(UsMtField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usMt.getFieldValue(UsMtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usMt.getFieldValue(UsMtField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usMt.getFieldValue(UsMtField.MSPA_COVERED_TRANSACTION));
    expect(1, usMt.getFieldValue(UsMtField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usMt.getFieldValue(UsMtField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usMt.getFieldValue(UsMtField.GPC));
    expect(true, usMt.getFieldValue(UsMtField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSZFY", (): void => {
    let usMt = new UsMt("BVWSSZFY");

    expect(1, usMt.getFieldValue(UsMtField.SHARING_NOTICE));
    expect(1, usMt.getFieldValue(UsMtField.SALE_OPT_OUT_NOTICE));
    expect(1, usMt.getFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usMt.getFieldValue(UsMtField.SALE_OPT_OUT));
    expect(1, usMt.getFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usMt.getFieldValue(UsMtField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usMt.getFieldValue(UsMtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usMt.getFieldValue(UsMtField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usMt.getFieldValue(UsMtField.MSPA_COVERED_TRANSACTION));
    expect(1, usMt.getFieldValue(UsMtField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usMt.getFieldValue(UsMtField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usMt.getFieldValue(UsMtField.GPC));
    expect(false, usMt.getFieldValue(UsMtField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsMt("z").getFieldValue(UsMtField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsMtCoreSegment 'z'");
  });

  it("validate", (): void => {
    testValidate(0, 0, 0, 0, true);
    testValidate(0, 0, 0, 1, true);
    testValidate(0, 0, 0, 2, true);
    testValidate(0, 0, 1, 0, false);
    testValidate(0, 0, 1, 1, false);
    testValidate(0, 0, 1, 2, true);
    testValidate(0, 0, 2, 0, false);
    testValidate(0, 0, 2, 1, true);
    testValidate(0, 0, 2, 2, false);
    testValidate(0, 1, 0, 0, false);
    testValidate(0, 1, 0, 1, false);
    testValidate(0, 1, 0, 2, false);
    testValidate(0, 1, 1, 0, false);
    testValidate(0, 1, 1, 1, false);
    testValidate(0, 1, 1, 2, false);
    testValidate(0, 1, 2, 0, false);
    testValidate(0, 1, 2, 1, false);
    testValidate(0, 1, 2, 2, false);
    testValidate(0, 2, 0, 0, false);
    testValidate(0, 2, 0, 1, false);
    testValidate(0, 2, 0, 2, false);
    testValidate(0, 2, 1, 0, false);
    testValidate(0, 2, 1, 1, false);
    testValidate(0, 2, 1, 2, false);
    testValidate(0, 2, 2, 0, false);
    testValidate(0, 2, 2, 1, false);
    testValidate(0, 2, 2, 2, false);
    testValidate(1, 0, 0, 0, false);
    testValidate(1, 0, 0, 1, false);
    testValidate(1, 0, 0, 2, false);
    testValidate(1, 0, 1, 0, false);
    testValidate(1, 0, 1, 1, false);
    testValidate(1, 0, 1, 2, false);
    testValidate(1, 0, 2, 0, false);
    testValidate(1, 0, 2, 1, false);
    testValidate(1, 0, 2, 2, false);
    testValidate(1, 1, 0, 0, false);
    testValidate(1, 1, 0, 1, false);
    testValidate(1, 1, 0, 2, false);
    testValidate(1, 1, 1, 0, false);
    testValidate(1, 1, 1, 1, false);
    testValidate(1, 1, 1, 2, false);
    testValidate(1, 1, 2, 0, false);
    testValidate(1, 1, 2, 1, true);
    testValidate(1, 1, 2, 2, false);
    testValidate(1, 2, 0, 0, false);
    testValidate(1, 2, 0, 1, false);
    testValidate(1, 2, 0, 2, false);
    testValidate(1, 2, 1, 0, false);
    testValidate(1, 2, 1, 1, false);
    testValidate(1, 2, 1, 2, false);
    testValidate(1, 2, 2, 0, false);
    testValidate(1, 2, 2, 1, true);
    testValidate(1, 2, 2, 2, false);
    testValidate(2, 0, 0, 0, false);
    testValidate(2, 0, 0, 1, false);
    testValidate(2, 0, 0, 2, false);
    testValidate(2, 0, 1, 0, false);
    testValidate(2, 0, 1, 1, false);
    testValidate(2, 0, 1, 2, false);
    testValidate(2, 0, 2, 0, false);
    testValidate(2, 0, 2, 1, false);
    testValidate(2, 0, 2, 2, false);
    testValidate(2, 1, 0, 0, false);
    testValidate(2, 1, 0, 1, false);
    testValidate(2, 1, 0, 2, false);
    testValidate(2, 1, 1, 0, false);
    testValidate(2, 1, 1, 1, false);
    testValidate(2, 1, 1, 2, false);
    testValidate(2, 1, 2, 0, false);
    testValidate(2, 1, 2, 1, true);
    testValidate(2, 1, 2, 2, false);
    testValidate(2, 2, 0, 0, false);
    testValidate(2, 2, 0, 1, false);
    testValidate(2, 2, 0, 2, false);
    testValidate(2, 2, 1, 0, false);
    testValidate(2, 2, 1, 1, false);
    testValidate(2, 2, 1, 2, false);
    testValidate(2, 2, 2, 0, false);
    testValidate(2, 2, 2, 1, false);
    testValidate(2, 2, 2, 2, false);
  });

  function testValidate(
    saleOptOutNotice: number,
    saleOptOut: number,
    mspaServiceProviderMode: number,
    mspaOptOutOptionMode: number,
    valid: boolean
  ) {
    let usMt = new UsMt();
    usMt.setFieldValue(UsMtField.SALE_OPT_OUT_NOTICE, saleOptOutNotice);
    usMt.setFieldValue(UsMtField.SALE_OPT_OUT, saleOptOut);
    usMt.setFieldValue(UsMtField.MSPA_SERVICE_PROVIDER_MODE, mspaServiceProviderMode);
    usMt.setFieldValue(UsMtField.MSPA_OPT_OUT_OPTION_MODE, mspaOptOutOptionMode);

    if (valid) {
      usMt.encode();
    } else {
      expect(function () {
        usMt.encode();
      }).to.throw();
    }
  }

  it("validate targeted advertising", (): void => {
    testValidateTargetedAdvertising(0, 0, true);
    testValidateTargetedAdvertising(0, 1, false);
    testValidateTargetedAdvertising(0, 2, false);
    testValidateTargetedAdvertising(1, 0, false);
    testValidateTargetedAdvertising(1, 1, true);
    testValidateTargetedAdvertising(1, 2, true);
    testValidateTargetedAdvertising(2, 0, false);
    testValidateTargetedAdvertising(2, 1, true);
    testValidateTargetedAdvertising(2, 2, false);
  });

  function testValidateTargetedAdvertising(
    targetedAdvertisingOptOutNotice: number,
    targetedAdvertisingOptOut: number,
    valid: boolean
  ) {
    let usMt = new UsMt();
    usMt.setFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, targetedAdvertisingOptOutNotice);
    usMt.setFieldValue(UsMtField.TARGETED_ADVERTISING_OPT_OUT, targetedAdvertisingOptOut);

    if (valid) {
      usMt.encode();
    } else {
      expect(function () {
        usMt.encode();
      }).to.throw();
    }
  }
});
