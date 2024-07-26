import { expect } from "chai";
import { UsTxV1Field } from "../../../src/encoder/field/UsTxV1Field";
import { UsTxV1 } from "../../../src/encoder/section/UsTxV1";

describe("manifest.section.UsTxV1", (): void => {
  it("should encode default to BAAAAAQA.QA", (): void => {
    let usTxV1 = new UsTxV1();
    expect(usTxV1.encode()).to.eql("BAAAAAQA.QA");
  });

  it("should encode to BVWSSVWA.YA", (): void => {
    let usTxV1 = new UsTxV1();

    usTxV1.setFieldValue(UsTxV1Field.PROCESSING_NOTICE, 1);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 1);
    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 1);
    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usTxV1.setFieldValue(UsTxV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usTxV1.setFieldValue(UsTxV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usTxV1.setFieldValue(UsTxV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_COVERED_TRANSACTION, 1);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usTxV1.setFieldValue(UsTxV1Field.GPC, true);

    expect(usTxV1.encode()).to.eql("BVWSSVWA.YA");
  });

  it("should encode default to BAAAAAQA", (): void => {
    let usTxV1 = new UsTxV1();
    usTxV1.setFieldValue(UsTxV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usTxV1.encode()).to.eql("BAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usTxV1 = new UsTxV1();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usTxV1 = new UsTxV1();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 0);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 1);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 0);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 2);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 1);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 0);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 2);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 0);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 2);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 2);
      usTxV1.encode();
    }).to.throw();

    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 0);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 0);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 1);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 1);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 1);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 2);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 2);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT, 1);
    usTxV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usTxV1 = new UsTxV1();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usTxV1.encode();
    }).to.throw();

    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usTxV1.setFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usTxV1.encode();
  });

  it("should validate mspa", (): void => {
    let usTxV1 = new UsTxV1();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 1);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 2);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 1);
      usTxV1.encode();
    }).to.throw();

    expect(function () {
      usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 2);
      usTxV1.encode();
    }).to.throw();

    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 0);

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 0);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 0);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 0);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 1);
    usTxV1.encode();

    usTxV1.setFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usTxV1.setFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE, 2);
    usTxV1.encode();
  });

  it("should decode BVWSSVWA.YA", (): void => {
    let usTxV1 = new UsTxV1("BVWSSVWA.YA");

    expect(1, usTxV1.getFieldValue(UsTxV1Field.PROCESSING_NOTICE));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.SALE_OPT_OUT));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usTxV1.getFieldValue(UsTxV1Field.SENSITIVE_DATA_PROCESSING));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usTxV1.getFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usTxV1.getFieldValue(UsTxV1Field.GPC));
    expect(true, usTxV1.getFieldValue(UsTxV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSVWA", (): void => {
    let usTxV1 = new UsTxV1("BVWSSVWA");

    expect(1, usTxV1.getFieldValue(UsTxV1Field.PROCESSING_NOTICE));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.SALE_OPT_OUT));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usTxV1.getFieldValue(UsTxV1Field.SENSITIVE_DATA_PROCESSING));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usTxV1.getFieldValue(UsTxV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usTxV1.getFieldValue(UsTxV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usTxV1.getFieldValue(UsTxV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsTxV1("z").getFieldValue(UsTxV1Field.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsTxV1CoreSegment 'z'");
  });
});
