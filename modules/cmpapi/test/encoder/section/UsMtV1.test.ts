import { expect } from "chai";
import { UsMtV1Field } from "../../../src/encoder/field/UsMtV1Field";
import { UsMtV1 } from "../../../src/encoder/section/UsMtV1";

describe("manifest.section.UsMtV1", (): void => {
  it("should encode default to BAAAAABA.QA", (): void => {
    let usMtV1 = new UsMtV1();
    expect(usMtV1.encode()).to.eql("BAAAAABA.QA");
  });

  it("should encode to BVWSSZFY.YA", (): void => {
    let usMtV1 = new UsMtV1();

    usMtV1.setFieldValue(UsMtV1Field.SHARING_NOTICE, 1);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 1);
    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usMtV1.setFieldValue(UsMtV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usMtV1.setFieldValue(UsMtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usMtV1.setFieldValue(UsMtV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_COVERED_TRANSACTION, 1);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usMtV1.setFieldValue(UsMtV1Field.GPC, true);

    expect(usMtV1.encode()).to.eql("BVWSSZFY.YA");
  });

  it("should encode default to BAAAAABA", (): void => {
    let usMtV1 = new UsMtV1();
    usMtV1.setFieldValue(UsMtV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usMtV1.encode()).to.eql("BAAAAABA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usMtV1 = new UsMtV1();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usMtV1 = new UsMtV1();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 0);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 1);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 0);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 2);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 0);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 0);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 2);
      usMtV1.encode();
    }).to.throw();

    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 0);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 1);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 2);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 2);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT, 1);
    usMtV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usMtV1 = new UsMtV1();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usMtV1.encode();
    }).to.throw();

    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usMtV1.setFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usMtV1.encode();
  });

  it("should validate mspa", (): void => {
    let usMtV1 = new UsMtV1();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usMtV1.encode();
    }).to.throw();

    expect(function () {
      usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usMtV1.encode();
    }).to.throw();

    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 0);

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usMtV1.encode();

    usMtV1.setFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usMtV1.setFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE, 2);
    usMtV1.encode();
  });

  it("should decode BVWSSZFY.YA", (): void => {
    let usMtV1 = new UsMtV1("BVWSSZFY.YA");

    expect(1, usMtV1.getFieldValue(UsMtV1Field.SHARING_NOTICE));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.SALE_OPT_OUT));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usMtV1.getFieldValue(UsMtV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usMtV1.getFieldValue(UsMtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usMtV1.getFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usMtV1.getFieldValue(UsMtV1Field.GPC));
    expect(true, usMtV1.getFieldValue(UsMtV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSZFY", (): void => {
    let usMtV1 = new UsMtV1("BVWSSZFY");

    expect(1, usMtV1.getFieldValue(UsMtV1Field.SHARING_NOTICE));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.SALE_OPT_OUT));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usMtV1.getFieldValue(UsMtV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usMtV1.getFieldValue(UsMtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usMtV1.getFieldValue(UsMtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usMtV1.getFieldValue(UsMtV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usMtV1.getFieldValue(UsMtV1Field.GPC));
    expect(false, usMtV1.getFieldValue(UsMtV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsMtV1("z").getFieldValue(UsMtV1Field.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsMtV1CoreSegment 'z'");
  });
});
