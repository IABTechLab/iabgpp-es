import { expect } from "chai";
import { UsTxField } from "../../../src/encoder/field/UsTxField";
import { UsTx } from "../../../src/encoder/section/UsTx";

describe("manifest.section.UsTx", (): void => {
  it("should encode default to BAAAAAQA.QA", (): void => {
    let usTx = new UsTx();
    expect(usTx.encode()).to.eql("BAAAAAQA.QA");
  });

  it("should encode to BVWSSVWA.YA", (): void => {
    let usTx = new UsTx();

    usTx.setFieldValue(UsTxField.PROCESSING_NOTICE, 1);
    usTx.setFieldValue(UsTxField.SALE_OPT_OUT_NOTICE, 1);
    usTx.setFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usTx.setFieldValue(UsTxField.SALE_OPT_OUT, 1);
    usTx.setFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usTx.setFieldValue(UsTxField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usTx.setFieldValue(UsTxField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usTx.setFieldValue(UsTxField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usTx.setFieldValue(UsTxField.MSPA_COVERED_TRANSACTION, 1);
    usTx.setFieldValue(UsTxField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usTx.setFieldValue(UsTxField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usTx.setFieldValue(UsTxField.GPC, true);

    expect(usTx.encode()).to.eql("BVWSSVWA.YA");
  });

  it("should encode default to BAAAAAQA", (): void => {
    let usTx = new UsTx();
    usTx.setFieldValue(UsTxField.GPC_SEGMENT_INCLUDED, false);
    expect(usTx.encode()).to.eql("BAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usTx = new UsTx();

    expect(function () {
      usTx.setFieldValue(UsTxField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usTx.setFieldValue(UsTxField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSVWA.YA", (): void => {
    let usTx = new UsTx("BVWSSVWA.YA");

    expect(1, usTx.getFieldValue(UsTxField.PROCESSING_NOTICE));
    expect(1, usTx.getFieldValue(UsTxField.SALE_OPT_OUT_NOTICE));
    expect(1, usTx.getFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usTx.getFieldValue(UsTxField.SALE_OPT_OUT));
    expect(1, usTx.getFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usTx.getFieldValue(UsTxField.SENSITIVE_DATA_PROCESSING));
    expect(1, usTx.getFieldValue(UsTxField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usTx.getFieldValue(UsTxField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usTx.getFieldValue(UsTxField.MSPA_COVERED_TRANSACTION));
    expect(1, usTx.getFieldValue(UsTxField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usTx.getFieldValue(UsTxField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usTx.getFieldValue(UsTxField.GPC));
    expect(true, usTx.getFieldValue(UsTxField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSVWA", (): void => {
    let usTx = new UsTx("BVWSSVWA");

    expect(1, usTx.getFieldValue(UsTxField.PROCESSING_NOTICE));
    expect(1, usTx.getFieldValue(UsTxField.SALE_OPT_OUT_NOTICE));
    expect(1, usTx.getFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usTx.getFieldValue(UsTxField.SALE_OPT_OUT));
    expect(1, usTx.getFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usTx.getFieldValue(UsTxField.SENSITIVE_DATA_PROCESSING));
    expect(1, usTx.getFieldValue(UsTxField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usTx.getFieldValue(UsTxField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usTx.getFieldValue(UsTxField.MSPA_COVERED_TRANSACTION));
    expect(1, usTx.getFieldValue(UsTxField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usTx.getFieldValue(UsTxField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usTx.getFieldValue(UsTxField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsTx("z").getFieldValue(UsTxField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsTxCoreSegment 'z'");
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
    let usTx = new UsTx();
    usTx.setFieldValue(UsTxField.SALE_OPT_OUT_NOTICE, saleOptOutNotice);
    usTx.setFieldValue(UsTxField.SALE_OPT_OUT, saleOptOut);
    usTx.setFieldValue(UsTxField.MSPA_SERVICE_PROVIDER_MODE, mspaServiceProviderMode);
    usTx.setFieldValue(UsTxField.MSPA_OPT_OUT_OPTION_MODE, mspaOptOutOptionMode);

    if (valid) {
      usTx.encode();
    } else {
      expect(function () {
        usTx.encode();
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
    let usTx = new UsTx();
    usTx.setFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, targetedAdvertisingOptOutNotice);
    usTx.setFieldValue(UsTxField.TARGETED_ADVERTISING_OPT_OUT, targetedAdvertisingOptOut);

    if (valid) {
      usTx.encode();
    } else {
      expect(function () {
        usTx.encode();
      }).to.throw();
    }
  }
});
