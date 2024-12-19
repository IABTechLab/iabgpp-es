import { expect } from "chai";
import { UsIaField } from "../../../src/encoder/field/UsIaField";
import { UsIa } from "../../../src/encoder/section/UsIa";

describe("manifest.section.UsIa", (): void => {
  it("should encode default to BAAAAAQA.QA", (): void => {
    let usIa = new UsIa();
    expect(usIa.encode()).to.eql("BAAAAAQA.QA");
  });

  it("should encode to BVVkklWA.YA", (): void => {
    let usIa = new UsIa();

    usIa.setFieldValue(UsIaField.PROCESSING_NOTICE, 1);
    usIa.setFieldValue(UsIaField.SALE_OPT_OUT_NOTICE, 1);
    usIa.setFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usIa.setFieldValue(UsIaField.SENSITIVE_DATA_OPT_OUT_NOTICE, 1);
    usIa.setFieldValue(UsIaField.SALE_OPT_OUT, 1);
    usIa.setFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usIa.setFieldValue(UsIaField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usIa.setFieldValue(UsIaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usIa.setFieldValue(UsIaField.MSPA_COVERED_TRANSACTION, 1);
    usIa.setFieldValue(UsIaField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usIa.setFieldValue(UsIaField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usIa.setFieldValue(UsIaField.GPC, true);

    expect(usIa.encode()).to.eql("BVVkklWA.YA");
  });

  it("should encode default to BAAAAAQA", (): void => {
    let usIa = new UsIa();
    usIa.setFieldValue(UsIaField.GPC_SEGMENT_INCLUDED, false);
    expect(usIa.encode()).to.eql("BAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usIa = new UsIa();

    expect(function () {
      usIa.setFieldValue(UsIaField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.SENSITIVE_DATA_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usIa.setFieldValue(UsIaField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVVkklWA.YA", (): void => {
    let usIa = new UsIa("BVVkklWA.YA");

    expect(1, usIa.getFieldValue(UsIaField.PROCESSING_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.SALE_OPT_OUT_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.SENSITIVE_DATA_OPT_OUT_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.SALE_OPT_OUT));
    expect(1, usIa.getFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usIa.getFieldValue(UsIaField.SENSITIVE_DATA_PROCESSING));
    expect(1, usIa.getFieldValue(UsIaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usIa.getFieldValue(UsIaField.MSPA_COVERED_TRANSACTION));
    expect(1, usIa.getFieldValue(UsIaField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usIa.getFieldValue(UsIaField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usIa.getFieldValue(UsIaField.GPC));
    expect(true, usIa.getFieldValue(UsIaField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVVkklWA", (): void => {
    let usIa = new UsIa("BVVkklWA");

    expect(1, usIa.getFieldValue(UsIaField.PROCESSING_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.SALE_OPT_OUT_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.SENSITIVE_DATA_OPT_OUT_NOTICE));
    expect(1, usIa.getFieldValue(UsIaField.SALE_OPT_OUT));
    expect(1, usIa.getFieldValue(UsIaField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usIa.getFieldValue(UsIaField.SENSITIVE_DATA_PROCESSING));
    expect(1, usIa.getFieldValue(UsIaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usIa.getFieldValue(UsIaField.MSPA_COVERED_TRANSACTION));
    expect(1, usIa.getFieldValue(UsIaField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usIa.getFieldValue(UsIaField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usIa.getFieldValue(UsIaField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsIa("z").getFieldValue(UsIaField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsIaCoreSegment 'z'");
  });
});
