import { expect } from "chai";
import { UsFlField } from "../../../src/encoder/field/UsFlField";
import { UsFl } from "../../../src/encoder/section/UsFl";

describe("manifest.section.UsFl", (): void => {
  it("should encode default to BAAAAABA", (): void => {
    let usFl = new UsFl();
    expect(usFl.encode()).to.eql("BAAAAABA");
  });

  it("should encode to BVWSSZlY", (): void => {
    let usFl = new UsFl();

    usFl.setFieldValue(UsFlField.PROCESSING_NOTICE, 1);
    usFl.setFieldValue(UsFlField.SALE_OPT_OUT_NOTICE, 1);
    usFl.setFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usFl.setFieldValue(UsFlField.SALE_OPT_OUT, 1);
    usFl.setFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usFl.setFieldValue(UsFlField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usFl.setFieldValue(UsFlField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 2]);
    usFl.setFieldValue(UsFlField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usFl.setFieldValue(UsFlField.MSPA_COVERED_TRANSACTION, 1);
    usFl.setFieldValue(UsFlField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usFl.setFieldValue(UsFlField.MSPA_SERVICE_PROVIDER_MODE, 2);

    expect(usFl.encode()).to.eql("BVWSSZlY");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usFl = new UsFl();

    expect(function () {
      usFl.setFieldValue(UsFlField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.SALE_OPT_OUT_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 4);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 3, 0]);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usFl.setFieldValue(UsFlField.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should decode BVWSSZlY", (): void => {
    let usFl = new UsFl("BVWSSZlY");

    expect(1, usFl.getFieldValue(UsFlField.PROCESSING_NOTICE));
    expect(1, usFl.getFieldValue(UsFlField.SALE_OPT_OUT_NOTICE));
    expect(1, usFl.getFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usFl.getFieldValue(UsFlField.SALE_OPT_OUT));
    expect(1, usFl.getFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usFl.getFieldValue(UsFlField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 2], usFl.getFieldValue(UsFlField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usFl.getFieldValue(UsFlField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usFl.getFieldValue(UsFlField.MSPA_COVERED_TRANSACTION));
    expect(1, usFl.getFieldValue(UsFlField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usFl.getFieldValue(UsFlField.MSPA_SERVICE_PROVIDER_MODE));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsFl("z").getFieldValue(UsFlField.PROCESSING_NOTICE);
    }).to.throw("Unable to decode UsFlCoreSegment 'z'");
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
    let usFl = new UsFl();
    usFl.setFieldValue(UsFlField.SALE_OPT_OUT_NOTICE, saleOptOutNotice);
    usFl.setFieldValue(UsFlField.SALE_OPT_OUT, saleOptOut);
    usFl.setFieldValue(UsFlField.MSPA_SERVICE_PROVIDER_MODE, mspaServiceProviderMode);
    usFl.setFieldValue(UsFlField.MSPA_OPT_OUT_OPTION_MODE, mspaOptOutOptionMode);

    if (valid) {
      usFl.encode();
    } else {
      expect(function () {
        usFl.encode();
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
    let usFl = new UsFl();
    usFl.setFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, targetedAdvertisingOptOutNotice);
    usFl.setFieldValue(UsFlField.TARGETED_ADVERTISING_OPT_OUT, targetedAdvertisingOptOut);

    if (valid) {
      usFl.encode();
    } else {
      expect(function () {
        usFl.encode();
      }).to.throw();
    }
  }
});
