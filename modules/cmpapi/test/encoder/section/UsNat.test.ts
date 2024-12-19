import { expect } from "chai";
import { UsNatField } from "../../../src/encoder/field/UsNatField";
import { UsNat } from "../../../src/encoder/section/UsNat";

describe("manifest.section.UsNat", (): void => {
  it("should encode default to BAAAAAAAAABA.QA", (): void => {
    let usNat = new UsNat();
    expect(usNat.encode()).to.eql("BAAAAAAAAABA.QA");
  });

  it("should encode to BVVVkkkkkpFY.YA", (): void => {
    let usNat = new UsNat();

    usNat.setFieldValue(UsNatField.SHARING_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 1);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 1);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2]);
    usNat.setFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usNat.setFieldValue(UsNatField.PERSONAL_DATA_CONSENTS, 1);
    usNat.setFieldValue(UsNatField.MSPA_COVERED_TRANSACTION, 1);
    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNat.setFieldValue(UsNatField.GPC, true);

    expect(usNat.encode()).to.eql("BVVVkkkkkpFY.YA");
  });

  it("should encode default to BAAAAAAAAABA", (): void => {
    let usNat = new UsNat();
    usNat.setFieldValue(UsNatField.GPC_SEGMENT_INCLUDED, false);
    expect(usNat.encode()).to.eql("BAAAAAAAAABA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usNat = new UsNat();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 4);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 0, 0, 1, 2, 0]);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 3]);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.PERSONAL_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should decode BVVVkkkkkpFY.YA", (): void => {
    let usNat = new UsNat("BVVVkkkkkpFY.YA");

    expect(1, usNat.getFieldValue(UsNatField.SHARING_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SALE_OPT_OUT));
    expect(1, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT));
    expect(1, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2], usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION));
    expect(1, usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usNat.getFieldValue(UsNatField.GPC));
    expect(true, usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVVVkkkkkpFY.YA", (): void => {
    let usNat = new UsNat("BVVVkkkkkpFY");

    expect(1, usNat.getFieldValue(UsNatField.SHARING_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SALE_OPT_OUT));
    expect(1, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT));
    expect(1, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2], usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION));
    expect(1, usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsNat("z").getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE);
    }).to.throw("Unable to decode UsNatCoreSegment 'z'");
  });
});
