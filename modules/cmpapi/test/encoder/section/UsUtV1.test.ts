import { expect } from "chai";
import { UsUtV1Field } from "../../../src/encoder/field/UsUtV1Field";
import { UsUtV1 } from "../../../src/encoder/section/UsUtV1";

describe("manifest.section.UsUtV1", (): void => {
  it("should encode default to BAAAAAQA", (): void => {
    let usUtV1 = new UsUtV1();
    expect(usUtV1.encode()).to.eql("BAAAAAQA");
  });

  it("should encode to BVVkklWA", (): void => {
    let usUtV1 = new UsUtV1();

    usUtV1.setFieldValue(UsUtV1Field.SHARING_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 1);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usUtV1.setFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usUtV1.setFieldValue(UsUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_COVERED_TRANSACTION, 1);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);

    expect(usUtV1.encode()).to.eql("BVVkklWA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usUtV1 = new UsUtV1();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SHARING_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 4);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 0]);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usUtV1 = new UsUtV1();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 0);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 1);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 0);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 2);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 0);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 0);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 2);
      usUtV1.encode();
    }).to.throw();

    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 0);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 1);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 2);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 2);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 1);
    usUtV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usUtV1 = new UsUtV1();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usUtV1.encode();
    }).to.throw();

    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usUtV1.encode();
  });

  it("should validate mspa", (): void => {
    let usUtV1 = new UsUtV1();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usUtV1.encode();
    }).to.throw();

    expect(function () {
      usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usUtV1.encode();
    }).to.throw();

    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 0);

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usUtV1.encode();

    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 2);
    usUtV1.encode();
  });

  it("should decode BVVkklWA", (): void => {
    let usUtV1 = new UsUtV1("BVVkklWA");

    expect(1, usUtV1.getFieldValue(UsUtV1Field.SHARING_NOTICE));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.SALE_OPT_OUT));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usUtV1.getFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usUtV1.getFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsUtV1("z").getFieldValue(UsUtV1Field.SHARING_NOTICE);
    }).to.throw("Unable to decode UsUtV1CoreSegment 'z'");
  });
});
