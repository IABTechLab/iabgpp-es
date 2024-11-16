import { expect } from "chai";
import { UsDeField } from "../../../src/encoder/field/UsDeField";
import { UsDe } from "../../../src/encoder/section/UsDe";

describe("manifest.section.UsDe", (): void => {
  it("should encode default to BAAAAAABAA.QA", (): void => {
    let usDe = new UsDe();
    expect(usDe.encode()).to.eql("BAAAAAABAA.QA");
  });

  it("should encode to BVWSSSSVYA.YA", (): void => {
    let usDe = new UsDe();

    usDe.setFieldValue(UsDeField.PROCESSING_NOTICE, 1);
    usDe.setFieldValue(UsDeField.SALE_OPT_OUT_NOTICE, 1);
    usDe.setFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usDe.setFieldValue(UsDeField.SALE_OPT_OUT, 1);
    usDe.setFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usDe.setFieldValue(UsDeField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0]);
    usDe.setFieldValue(UsDeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0, 2, 1]);
    usDe.setFieldValue(UsDeField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usDe.setFieldValue(UsDeField.MSPA_COVERED_TRANSACTION, 1);
    usDe.setFieldValue(UsDeField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usDe.setFieldValue(UsDeField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usDe.setFieldValue(UsDeField.GPC, true);

    expect(usDe.encode()).to.eql("BVWSSSSVYA.YA");
  });

  it("should encode default to BAAAAAABAA", (): void => {
    let usDe = new UsDe();
    usDe.setFieldValue(UsDeField.GPC_SEGMENT_INCLUDED, false);
    expect(usDe.encode()).to.eql("BAAAAAABAA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usDe = new UsDe();

    expect(function () {
      usDe.setFieldValue(UsDeField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usDe.setFieldValue(UsDeField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSSSVYA.YA", (): void => {
    let usDe = new UsDe("BVWSSSSVYA.YA");

    expect(1, usDe.getFieldValue(UsDeField.PROCESSING_NOTICE));
    expect(1, usDe.getFieldValue(UsDeField.SALE_OPT_OUT_NOTICE));
    expect(1, usDe.getFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usDe.getFieldValue(UsDeField.SALE_OPT_OUT));
    expect(1, usDe.getFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0], usDe.getFieldValue(UsDeField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0, 2, 1], usDe.getFieldValue(UsDeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usDe.getFieldValue(UsDeField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usDe.getFieldValue(UsDeField.MSPA_COVERED_TRANSACTION));
    expect(1, usDe.getFieldValue(UsDeField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usDe.getFieldValue(UsDeField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usDe.getFieldValue(UsDeField.GPC));
    expect(true, usDe.getFieldValue(UsDeField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSSSVYA", (): void => {
    let usDe = new UsDe("BVWSSSSVYA");

    expect(1, usDe.getFieldValue(UsDeField.PROCESSING_NOTICE));
    expect(1, usDe.getFieldValue(UsDeField.SALE_OPT_OUT_NOTICE));
    expect(1, usDe.getFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usDe.getFieldValue(UsDeField.SALE_OPT_OUT));
    expect(1, usDe.getFieldValue(UsDeField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0], usDe.getFieldValue(UsDeField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0, 2, 1], usDe.getFieldValue(UsDeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usDe.getFieldValue(UsDeField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usDe.getFieldValue(UsDeField.MSPA_COVERED_TRANSACTION));
    expect(1, usDe.getFieldValue(UsDeField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usDe.getFieldValue(UsDeField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usDe.getFieldValue(UsDeField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsDe("z").getFieldValue(UsDeField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsDeCoreSegment 'z'");
  });
});
