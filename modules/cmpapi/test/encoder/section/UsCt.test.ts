import { expect } from "chai";
import { UsCtField } from "../../../src/encoder/field/UsCtField";
import { UsCt } from "../../../src/encoder/section/UsCt";

describe("manifest.section.UsCt", (): void => {
  it("should encode default to BAAAAAEA.QA", (): void => {
    let usCt = new UsCt();
    expect(usCt.encode()).to.eql("BAAAAAEA.QA");
  });

  it("should encode to BVWSSZFg.YA", (): void => {
    let usCt = new UsCt();

    usCt.setFieldValue(UsCtField.SHARING_NOTICE, 1);
    usCt.setFieldValue(UsCtField.SALE_OPT_OUT_NOTICE, 1);
    usCt.setFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCt.setFieldValue(UsCtField.SALE_OPT_OUT, 1);
    usCt.setFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCt.setFieldValue(UsCtField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usCt.setFieldValue(UsCtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1, 0]);
    usCt.setFieldValue(UsCtField.MSPA_COVERED_TRANSACTION, 1);
    usCt.setFieldValue(UsCtField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCt.setFieldValue(UsCtField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCt.setFieldValue(UsCtField.GPC, true);

    expect(usCt.encode()).to.eql("BVWSSZFg.YA");
  });

  it("should encode default to BAAAAAEA", (): void => {
    let usCt = new UsCt();
    usCt.setFieldValue(UsCtField.GPC_SEGMENT_INCLUDED, false);
    expect(usCt.encode()).to.eql("BAAAAAEA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usCt = new UsCt();

    expect(function () {
      usCt.setFieldValue(UsCtField.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usCt.setFieldValue(UsCtField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSZFg.YA", (): void => {
    let usCt = new UsCt("BVWSSZFg.YA");

    expect(1, usCt.getFieldValue(UsCtField.SHARING_NOTICE));
    expect(1, usCt.getFieldValue(UsCtField.SALE_OPT_OUT_NOTICE));
    expect(1, usCt.getFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCt.getFieldValue(UsCtField.SALE_OPT_OUT));
    expect(1, usCt.getFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usCt.getFieldValue(UsCtField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1, 0], usCt.getFieldValue(UsCtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCt.getFieldValue(UsCtField.MSPA_COVERED_TRANSACTION));
    expect(1, usCt.getFieldValue(UsCtField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCt.getFieldValue(UsCtField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usCt.getFieldValue(UsCtField.GPC));
    expect(true, usCt.getFieldValue(UsCtField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BbYbG22w", (): void => {
    let usCt = new UsCt("BbYbG22w");

    expect(1, usCt.getFieldValue(UsCtField.SHARING_NOTICE));
    expect(2, usCt.getFieldValue(UsCtField.SALE_OPT_OUT_NOTICE));
    expect(3, usCt.getFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCt.getFieldValue(UsCtField.SALE_OPT_OUT));
    expect(2, usCt.getFieldValue(UsCtField.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], usCt.getFieldValue(UsCtField.SENSITIVE_DATA_PROCESSING));
    expect([1, 2, 3], usCt.getFieldValue(UsCtField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCt.getFieldValue(UsCtField.MSPA_COVERED_TRANSACTION));
    expect(2, usCt.getFieldValue(UsCtField.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usCt.getFieldValue(UsCtField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usCt.getFieldValue(UsCtField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsCt("z").getFieldValue(UsCtField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsCtCoreSegment 'z'");
  });
});
