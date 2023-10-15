import { expect } from "chai";
import { UsVaV1Field } from "../../../src/encoder/field/UsVaV1Field";
import { UsVaV1 } from "../../../src/encoder/section/UsVaV1";

describe("manifest.section.UsVaV1", (): void => {
  it("should encode default to BAAAABA", (): void => {
    let usVaV1 = new UsVaV1();
    expect(usVaV1.encode()).to.eql("BAAAABA");
  });

  it("should encode to BVWSSVY", (): void => {
    let usVaV1 = new UsVaV1();

    usVaV1.setFieldValue(UsVaV1Field.SHARING_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 1);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usVaV1.setFieldValue(UsVaV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usVaV1.setFieldValue(UsVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_COVERED_TRANSACTION, 1);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);

    expect(usVaV1.encode()).to.eql("BVWSSVY");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usVaV1 = new UsVaV1();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 4);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usVaV1 = new UsVaV1();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 0);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 1);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 0);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 2);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 1);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 0);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 0);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 2);
      usVaV1.encode();
    }).to.throw();

    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 0);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 1);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 2);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 2);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 1);
    usVaV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usVaV1 = new UsVaV1();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usVaV1.encode();
    }).to.throw();

    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usVaV1.encode();
  });

  it("should validate mspa", (): void => {
    let usVaV1 = new UsVaV1();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 1);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 1);
      usVaV1.encode();
    }).to.throw();

    expect(function () {
      usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usVaV1.encode();
    }).to.throw();

    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 0);

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usVaV1.encode();

    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 2);
    usVaV1.encode();
  });

  it("should decode BVWSSVY", (): void => {
    let usVaV1 = new UsVaV1("BVWSSVY");

    expect(1, usVaV1.getFieldValue(UsVaV1Field.SHARING_NOTICE));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.SALE_OPT_OUT));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usVaV1.getFieldValue(UsVaV1Field.SENSITIVE_DATA_PROCESSING));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usVaV1.getFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE));
  });
});
