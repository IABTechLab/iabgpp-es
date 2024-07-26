import { expect } from "chai";
import { UsCtV1Field } from "../../../src/encoder/field/UsCtV1Field";
import { UsCtV1 } from "../../../src/encoder/section/UsCtV1";

describe("manifest.section.UsCtV1", (): void => {
  it("should encode default to BAAAAAEA.QA", (): void => {
    let usCtV1 = new UsCtV1();
    expect(usCtV1.encode()).to.eql("BAAAAAEA.QA");
  });

  it("should encode to BVWSSZFg.YA", (): void => {
    let usCtV1 = new UsCtV1();

    usCtV1.setFieldValue(UsCtV1Field.SHARING_NOTICE, 1);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 1);
    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCtV1.setFieldValue(UsCtV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usCtV1.setFieldValue(UsCtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_COVERED_TRANSACTION, 1);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCtV1.setFieldValue(UsCtV1Field.GPC, true);

    expect(usCtV1.encode()).to.eql("BVWSSZFg.YA");
  });

  it("should encode default to BAAAAAEA", (): void => {
    let usCtV1 = new UsCtV1();
    usCtV1.setFieldValue(UsCtV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usCtV1.encode()).to.eql("BAAAAAEA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usCtV1 = new UsCtV1();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should validate sale", (): void => {
    let usCtV1 = new UsCtV1();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 0);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 1);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 0);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 2);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 0);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 0);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 2);
      usCtV1.encode();
    }).to.throw();

    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 0);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 1);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 2);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 2);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT, 1);
    usCtV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usCtV1 = new UsCtV1();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usCtV1.encode();
    }).to.throw();

    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usCtV1.setFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCtV1.encode();
  });

  it("should validate mspa", (): void => {
    let usCtV1 = new UsCtV1();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCtV1.encode();
    }).to.throw();

    expect(function () {
      usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCtV1.encode();
    }).to.throw();

    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 0);

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCtV1.encode();

    usCtV1.setFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCtV1.setFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE, 2);
    usCtV1.encode();
  });

  it("should decode BVWSSZFg.YA", (): void => {
    let usCtV1 = new UsCtV1("BVWSSZFg.YA");

    expect(1, usCtV1.getFieldValue(UsCtV1Field.SHARING_NOTICE));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usCtV1.getFieldValue(UsCtV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usCtV1.getFieldValue(UsCtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCtV1.getFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usCtV1.getFieldValue(UsCtV1Field.GPC));
    expect(true, usCtV1.getFieldValue(UsCtV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BbYbG22w", (): void => {
    let usCtV1 = new UsCtV1("BbYbG22w");

    expect(1, usCtV1.getFieldValue(UsCtV1Field.SHARING_NOTICE));
    expect(2, usCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, usCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.SALE_OPT_OUT));
    expect(2, usCtV1.getFieldValue(UsCtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], usCtV1.getFieldValue(UsCtV1Field.SENSITIVE_DATA_PROCESSING));
    expect([1, 2, 3], usCtV1.getFieldValue(UsCtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCtV1.getFieldValue(UsCtV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, usCtV1.getFieldValue(UsCtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usCtV1.getFieldValue(UsCtV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usCtV1.getFieldValue(UsCtV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsCtV1("z").getFieldValue(UsCtV1Field.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsCtV1CoreSegment 'z'");
  });
});
