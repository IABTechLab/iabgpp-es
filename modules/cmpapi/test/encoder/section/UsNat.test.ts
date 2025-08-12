import { expect } from "chai";
import { UsNatField } from "../../../src/encoder/field/UsNatField";
import { UsNat } from "../../../src/encoder/section/UsNat";

describe("manifest.section.UsNat", (): void => {
  it("should encode default to CAAAAAAAAABA.QA", (): void => {
    let usNat = new UsNat();
    expect(usNat.encode()).to.eql("CAAAAAAAAABA.QA");
  });

  it("should encode to CVVVkkkkkpFY.YA", (): void => {
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

    expect(usNat.encode()).to.eql("CVVVkkkkkpFY.YA");
  });

  it("should encode default to CAAAAAAAAABA", (): void => {
    let usNat = new UsNat();
    usNat.setFieldValue(UsNatField.GPC_SEGMENT_INCLUDED, false);
    expect(usNat.encode()).to.eql("CAAAAAAAAABA");
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

  it("should decode BVVVkkkklWA.YA", (): void => {
    let usNat = new UsNat("BVVVkkkklWA.YA");

    expect(usNat.getFieldValue(UsNatField.VERSION)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING)).to.eql([2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 0, 0, 0, 0]);
    expect(usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS)).to.eql([2, 1, 0]);
    expect(usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.GPC)).to.eql(true);
    expect(usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED)).to.eql(true);
  });

  it("should decode BqqqqqqqqqA", (): void => {
    let usNat = new UsNat("BqqqqqqqqqA");

    expect(usNat.getFieldValue(UsNatField.VERSION)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_NOTICE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING)).to.eql([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0]);
    expect(usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS)).to.eql([2, 2, 0]);
    expect(usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED)).to.eql(false);
    expect(usNat.getFieldValue(UsNatField.GPC)).to.eql(false);
  });

  it("should decode CVVVkkkkkpFY.YA", (): void => {
    let usNat = new UsNat("CVVVkkkkkpFY.YA");

    expect(usNat.getFieldValue(UsNatField.VERSION)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SHARING_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING)).to.eql([2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2]);
    expect(usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS)).to.eql([2, 1, 0]);
    expect(usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.GPC)).to.eql(true);
    expect(usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED)).to.eql(true);
  });

  it("should decode CVVVkkkkkpFY", (): void => {
    let usNat = new UsNat("CVVVkkkkkpFY");

    expect(usNat.getFieldValue(UsNatField.VERSION)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.SHARING_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SALE_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SHARING_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING)).to.eql([2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0, 2]);
    expect(usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS)).to.eql([2, 1, 0]);
    expect(usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE)).to.eql(1);
    expect(usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE)).to.eql(2);
    expect(usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED)).to.eql(false);
    expect(usNat.getFieldValue(UsNatField.GPC)).to.eql(false);
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsNat("z").getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE);
    }).to.throw("Unable to decode UsNatCoreSegment 'z'");
  });
});
