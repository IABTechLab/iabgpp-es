import { expect } from "chai";
import { UsVaField } from "../../../src/encoder/field/UsVaField";
import { UsVa } from "../../../src/encoder/section/UsVa";

describe("manifest.section.UsVa", (): void => {
  it("should encode default to BAAAABA", (): void => {
    let usVa = new UsVa();
    expect(usVa.encode()).to.eql("BAAAABA");
  });

  it("should encode to BVWSSVY", (): void => {
    let usVa = new UsVa();

    usVa.setFieldValue(UsVaField.SHARING_NOTICE, 1);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 1);
    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 1);
    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usVa.setFieldValue(UsVaField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usVa.setFieldValue(UsVaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usVa.setFieldValue(UsVaField.MSPA_COVERED_TRANSACTION, 1);
    usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 2);

    expect(usVa.encode()).to.eql("BVWSSVY");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usVa = new UsVa();

    expect(function () {
      usVa.setFieldValue(UsVaField.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 4);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usVa = new UsVa();

    expect(function () {
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 0);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 1);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 0);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 2);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 1);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 0);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 2);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 0);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 2);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 2);
      usVa.encode();
    }).to.throw();

    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 0);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 0);
    usVa.encode();

    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 1);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 1);
    usVa.encode();

    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 1);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 2);
    usVa.encode();

    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 2);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT, 1);
    usVa.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usVa = new UsVa();

    expect(function () {
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 1);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 2);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 0);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 0);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 2);
      usVa.encode();
    }).to.throw();

    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 0);
    usVa.encode();

    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usVa.encode();

    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 2);
    usVa.encode();

    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usVa.setFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usVa.encode();
  });

  it("should validate mspa", (): void => {
    let usVa = new UsVa();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 0);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 1);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 2);
      usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 0);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 2);
      usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 2);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 1);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 2);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 1);
      usVa.encode();
    }).to.throw();

    expect(function () {
      usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 2);
      usVa.encode();
    }).to.throw();

    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 0);

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 0);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 2);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 1);
    usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 2);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE, 0);

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 0);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 1);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 0);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 0);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 1);
    usVa.encode();

    usVa.setFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usVa.setFieldValue(UsVaField.SALE_OPT_OUT_NOTICE, 2);
    usVa.encode();
  });

  it("should decode BVWSSVY", (): void => {
    let usVa = new UsVa("BVWSSVY");

    expect(1, usVa.getFieldValue(UsVaField.SHARING_NOTICE));
    expect(1, usVa.getFieldValue(UsVaField.SALE_OPT_OUT_NOTICE));
    expect(1, usVa.getFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usVa.getFieldValue(UsVaField.SALE_OPT_OUT));
    expect(1, usVa.getFieldValue(UsVaField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usVa.getFieldValue(UsVaField.SENSITIVE_DATA_PROCESSING));
    expect(1, usVa.getFieldValue(UsVaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usVa.getFieldValue(UsVaField.MSPA_COVERED_TRANSACTION));
    expect(1, usVa.getFieldValue(UsVaField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usVa.getFieldValue(UsVaField.MSPA_SERVICE_PROVIDER_MODE));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsVa("z").getFieldValue(UsVaField.SHARING_NOTICE);
    }).to.throw("Unable to decode UsVaCoreSegment 'z'");
  });
});
