import { expect } from "chai";
import { UsFlV1Field } from "../../../src/encoder/field/UsFlV1Field";
import { UsFlV1 } from "../../../src/encoder/section/UsFlV1";

describe("manifest.section.UsFlV1", (): void => {
  it("should encode default to BAAAAABA", (): void => {
    let usFlV1 = new UsFlV1();
    expect(usFlV1.encode()).to.eql("BAAAAABA");
  });

  it("should encode to BVWSSZlY", (): void => {
    let usFlV1 = new UsFlV1();

    usFlV1.setFieldValue(UsFlV1Field.PROCESSING_NOTICE, 1);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 1);
    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 1);
    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usFlV1.setFieldValue(UsFlV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usFlV1.setFieldValue(UsFlV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 2]);
    usFlV1.setFieldValue(UsFlV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_COVERED_TRANSACTION, 1);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);

    expect(usFlV1.encode()).to.eql("BVWSSZlY");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usFlV1 = new UsFlV1();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 4);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 3, 0]);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usFlV1 = new UsFlV1();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 0);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 1);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 0);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 2);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 1);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 0);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 2);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 0);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 2);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 2);
      usFlV1.encode();
    }).to.throw();

    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 0);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 0);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 1);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 1);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 1);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 2);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 2);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT, 1);
    usFlV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usFlV1 = new UsFlV1();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usFlV1.encode();
    }).to.throw();

    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usFlV1.setFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usFlV1.encode();
  });

  it("should validate mspa", (): void => {
    let usFlV1 = new UsFlV1();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 1);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 2);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 1);
      usFlV1.encode();
    }).to.throw();

    expect(function () {
      usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 2);
      usFlV1.encode();
    }).to.throw();

    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 0);

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 0);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 0);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 0);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 1);
    usFlV1.encode();

    usFlV1.setFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usFlV1.setFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE, 2);
    usFlV1.encode();
  });

  it("should decode BVWSSZlY", (): void => {
    let usFlV1 = new UsFlV1("BVWSSZlY");

    expect(1, usFlV1.getFieldValue(UsFlV1Field.PROCESSING_NOTICE));
    expect(1, usFlV1.getFieldValue(UsFlV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usFlV1.getFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usFlV1.getFieldValue(UsFlV1Field.SALE_OPT_OUT));
    expect(1, usFlV1.getFieldValue(UsFlV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usFlV1.getFieldValue(UsFlV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 2], usFlV1.getFieldValue(UsFlV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usFlV1.getFieldValue(UsFlV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usFlV1.getFieldValue(UsFlV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usFlV1.getFieldValue(UsFlV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usFlV1.getFieldValue(UsFlV1Field.MSPA_SERVICE_PROVIDER_MODE));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsFlV1("z").getFieldValue(UsFlV1Field.PROCESSING_NOTICE);
    }).to.throw("Unable to decode UsFlV1CoreSegment 'z'");
  });
});
