import { expect } from "chai";
import { UsCoV1Field } from "../../../src/encoder/field/UsCoV1Field";
import { UsCoV1 } from "../../../src/encoder/section/UsCoV1";

describe("manifest.section.UsCoV1", (): void => {
  it("should encode default to BAAAAEA.QA", (): void => {
    let usCoV1 = new UsCoV1();
    expect(usCoV1.encode()).to.eql("BAAAAEA.QA");
  });

  it("should encode to BVWSSVg.YA", (): void => {
    let usCoV1 = new UsCoV1();

    usCoV1.setFieldValue(UsCoV1Field.SHARING_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 1);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCoV1.setFieldValue(UsCoV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2]);
    usCoV1.setFieldValue(UsCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_COVERED_TRANSACTION, 1);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCoV1.setFieldValue(UsCoV1Field.GPC, true);

    expect(usCoV1.encode()).to.eql("BVWSSVg.YA");
  });

  it("should encode default to BAAAAEA", (): void => {
    let usCoV1 = new UsCoV1();
    usCoV1.setFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usCoV1.encode()).to.eql("BAAAAEA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usCoV1 = new UsCoV1();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2]);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, -1);
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 5);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usCoV1 = new UsCoV1();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 0);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 1);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 0);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 2);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 0);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 0);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 2);
      usCoV1.encode();
    }).to.throw();

    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 0);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 1);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 2);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 2);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT, 1);
    usCoV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usCoV1 = new UsCoV1();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usCoV1.encode();
    }).to.throw();

    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usCoV1.setFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCoV1.encode();
  });

  it("should validate mspa", (): void => {
    let usCoV1 = new UsCoV1();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCoV1.encode();
    }).to.throw();

    expect(function () {
      usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCoV1.encode();
    }).to.throw();

    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 0);

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCoV1.encode();

    usCoV1.setFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCoV1.setFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE, 2);
    usCoV1.encode();
  });

  it("should decode BVWSSVg.YA", (): void => {
    let usCoV1 = new UsCoV1("BVWSSVg.YA");

    expect(1, usCoV1.getFieldValue(UsCoV1Field.SHARING_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2], usCoV1.getFieldValue(UsCoV1Field.SENSITIVE_DATA_PROCESSING));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usCoV1.getFieldValue(UsCoV1Field.GPC));
    expect(true, usCoV1.getFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSVg", (): void => {
    let usCoV1 = new UsCoV1("BVWSSVg");

    expect(1, usCoV1.getFieldValue(UsCoV1Field.SHARING_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.SALE_OPT_OUT));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2], usCoV1.getFieldValue(UsCoV1Field.SENSITIVE_DATA_PROCESSING));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usCoV1.getFieldValue(UsCoV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCoV1.getFieldValue(UsCoV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usCoV1.getFieldValue(UsCoV1Field.GPC_SEGMENT_INCLUDED));
  });
});
