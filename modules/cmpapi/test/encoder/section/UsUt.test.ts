import { expect } from "chai";
import { UsUtField } from "../../../src/encoder/field/UsUtField";
import { UsUt } from "../../../src/encoder/section/UsUt";

describe("manifest.section.UsUt", (): void => {
  it("should encode default to BAAAAAQA", (): void => {
    let usUt = new UsUt();
    expect(usUt.encode()).to.eql("BAAAAAQA");
  });

  it("should encode to BVVkklWA", (): void => {
    let usUt = new UsUt();

    usUt.setFieldValue(UsUtField.SHARING_NOTICE, 1);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 1);
    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usUt.setFieldValue(UsUtField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 1);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 1);
    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usUt.setFieldValue(UsUtField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usUt.setFieldValue(UsUtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usUt.setFieldValue(UsUtField.MSPA_COVERED_TRANSACTION, 1);
    usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 2);

    expect(usUt.encode()).to.eql("BVVkklWA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usUt = new UsUt();

    expect(function () {
      usUt.setFieldValue(UsUtField.SHARING_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 4);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 0]);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usUt = new UsUt();

    expect(function () {
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 0);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 1);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 0);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 2);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 1);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 0);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 2);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 0);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 2);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 2);
      usUt.encode();
    }).to.throw();

    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 0);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 0);
    usUt.encode();

    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 1);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 1);
    usUt.encode();

    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 1);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 2);
    usUt.encode();

    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 2);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT, 1);
    usUt.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usUt = new UsUt();

    expect(function () {
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 1);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 2);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 0);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 0);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 2);
      usUt.encode();
    }).to.throw();

    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 0);
    usUt.encode();

    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usUt.encode();

    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 2);
    usUt.encode();

    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usUt.setFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usUt.encode();
  });

  it("should validate mspa", (): void => {
    let usUt = new UsUt();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 0);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 1);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 2);
      usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 0);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 2);
      usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 2);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 1);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 2);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 1);
      usUt.encode();
    }).to.throw();

    expect(function () {
      usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 2);
      usUt.encode();
    }).to.throw();

    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 0);

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 0);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 2);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 1);
    usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 2);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE, 0);

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 0);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 1);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 0);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 0);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 1);
    usUt.encode();

    usUt.setFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usUt.setFieldValue(UsUtField.SALE_OPT_OUT_NOTICE, 2);
    usUt.encode();
  });

  it("should decode BVVkklWA", (): void => {
    let usUt = new UsUt("BVVkklWA");

    expect(1, usUt.getFieldValue(UsUtField.SHARING_NOTICE));
    expect(1, usUt.getFieldValue(UsUtField.SALE_OPT_OUT_NOTICE));
    expect(1, usUt.getFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usUt.getFieldValue(UsUtField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, usUt.getFieldValue(UsUtField.SALE_OPT_OUT));
    expect(1, usUt.getFieldValue(UsUtField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usUt.getFieldValue(UsUtField.SENSITIVE_DATA_PROCESSING));
    expect(1, usUt.getFieldValue(UsUtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usUt.getFieldValue(UsUtField.MSPA_COVERED_TRANSACTION));
    expect(1, usUt.getFieldValue(UsUtField.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usUt.getFieldValue(UsUtField.MSPA_SERVICE_PROVIDER_MODE));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsUt("z").getFieldValue(UsUtField.SHARING_NOTICE);
    }).to.throw("Unable to decode UsUtCoreSegment 'z'");
  });
});
