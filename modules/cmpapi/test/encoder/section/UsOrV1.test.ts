import { expect } from "chai";
import { UsOrV1Field } from "../../../src/encoder/field/UsOrV1Field";
import { UsOrV1 } from "../../../src/encoder/section/UsOrV1";

describe("manifest.section.UsOrV1", (): void => {
  it("should encode default to BAAAAAABAA.QA", (): void => {
    let usOrV1 = new UsOrV1();
    expect(usOrV1.encode()).to.eql("BAAAAAABAA.QA");
  });

  it("should encode to BVWSSRpFYA.YA", (): void => {
    let usOrV1 = new UsOrV1();

    usOrV1.setFieldValue(UsOrV1Field.PROCESSING_NOTICE, 1);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 1);
    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 1);
    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usOrV1.setFieldValue(UsOrV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0, 1, 2]);
    usOrV1.setFieldValue(UsOrV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usOrV1.setFieldValue(UsOrV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_COVERED_TRANSACTION, 1);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usOrV1.setFieldValue(UsOrV1Field.GPC, true);

    expect(usOrV1.encode()).to.eql("BVWSSRpFYA.YA");
  });

  it("should encode default to BAAAAAABAA", (): void => {
    let usOrV1 = new UsOrV1();
    usOrV1.setFieldValue(UsOrV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usOrV1.encode()).to.eql("BAAAAAABAA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usOrV1 = new UsOrV1();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usOrV1 = new UsOrV1();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 0);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 1);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 0);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 2);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 1);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 0);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 2);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 0);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 2);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 2);
      usOrV1.encode();
    }).to.throw();

    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 0);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 0);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 1);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 1);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 1);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 2);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 2);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT, 1);
    usOrV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usOrV1 = new UsOrV1();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usOrV1.encode();
    }).to.throw();

    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usOrV1.setFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usOrV1.encode();
  });

  it("should validate mspa", (): void => {
    let usOrV1 = new UsOrV1();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 1);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 2);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 1);
      usOrV1.encode();
    }).to.throw();

    expect(function () {
      usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 2);
      usOrV1.encode();
    }).to.throw();

    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 0);

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 0);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 0);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 0);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 1);
    usOrV1.encode();

    usOrV1.setFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usOrV1.setFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE, 2);
    usOrV1.encode();
  });

  it("should decode BVWSSRpFYA.YA", (): void => {
    let usOrV1 = new UsOrV1("BVWSSRpFYA.YA");

    expect(1, usOrV1.getFieldValue(UsOrV1Field.PROCESSING_NOTICE));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.SALE_OPT_OUT));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 1, 2], usOrV1.getFieldValue(UsOrV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usOrV1.getFieldValue(UsOrV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usOrV1.getFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usOrV1.getFieldValue(UsOrV1Field.GPC));
    expect(true, usOrV1.getFieldValue(UsOrV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSRpFYA", (): void => {
    let usOrV1 = new UsOrV1("BVWSSRpFYA");

    expect(1, usOrV1.getFieldValue(UsOrV1Field.PROCESSING_NOTICE));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.SALE_OPT_OUT));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 1, 2], usOrV1.getFieldValue(UsOrV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usOrV1.getFieldValue(UsOrV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usOrV1.getFieldValue(UsOrV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usOrV1.getFieldValue(UsOrV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usOrV1.getFieldValue(UsOrV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsOrV1("z").getFieldValue(UsOrV1Field.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsOrV1CoreSegment 'z'");
  });
});
