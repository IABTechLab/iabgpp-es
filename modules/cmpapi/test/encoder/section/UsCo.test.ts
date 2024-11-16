import { expect } from "chai";
import { UsCoField } from "../../../src/encoder/field/UsCoField";
import { UsCo } from "../../../src/encoder/section/UsCo";

describe("manifest.section.UsCo", (): void => {
  it("should encode default to BAAAAEA.QA", (): void => {
    let usCo = new UsCo();
    expect(usCo.encode()).to.eql("BAAAAEA.QA");
  });

  it("should encode to BVWSSVg.YA", (): void => {
    let usCo = new UsCo();

    usCo.setFieldValue(UsCoField.SHARING_NOTICE, 1);
    usCo.setFieldValue(UsCoField.SALE_OPT_OUT_NOTICE, 1);
    usCo.setFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usCo.setFieldValue(UsCoField.SALE_OPT_OUT, 1);
    usCo.setFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usCo.setFieldValue(UsCoField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2]);
    usCo.setFieldValue(UsCoField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usCo.setFieldValue(UsCoField.MSPA_COVERED_TRANSACTION, 1);
    usCo.setFieldValue(UsCoField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCo.setFieldValue(UsCoField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCo.setFieldValue(UsCoField.GPC, true);

    expect(usCo.encode()).to.eql("BVWSSVg.YA");
  });

  it("should encode default to BAAAAEA", (): void => {
    let usCo = new UsCo();
    usCo.setFieldValue(UsCoField.GPC_SEGMENT_INCLUDED, false);
    expect(usCo.encode()).to.eql("BAAAAEA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usCo = new UsCo();

    expect(function () {
      usCo.setFieldValue(UsCoField.SHARING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2]);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.MSPA_OPT_OUT_OPTION_MODE, -1);
    }).to.throw();

    expect(function () {
      usCo.setFieldValue(UsCoField.MSPA_SERVICE_PROVIDER_MODE, 5);
    }).to.throw();
  });

  it("should decode BVWSSVg.YA", (): void => {
    let usCo = new UsCo("BVWSSVg.YA");

    expect(1, usCo.getFieldValue(UsCoField.SHARING_NOTICE));
    expect(1, usCo.getFieldValue(UsCoField.SALE_OPT_OUT_NOTICE));
    expect(1, usCo.getFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCo.getFieldValue(UsCoField.SALE_OPT_OUT));
    expect(1, usCo.getFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2], usCo.getFieldValue(UsCoField.SENSITIVE_DATA_PROCESSING));
    expect(1, usCo.getFieldValue(UsCoField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCo.getFieldValue(UsCoField.MSPA_COVERED_TRANSACTION));
    expect(1, usCo.getFieldValue(UsCoField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCo.getFieldValue(UsCoField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usCo.getFieldValue(UsCoField.GPC));
    expect(true, usCo.getFieldValue(UsCoField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSVg", (): void => {
    let usCo = new UsCo("BVWSSVg");

    expect(1, usCo.getFieldValue(UsCoField.SHARING_NOTICE));
    expect(1, usCo.getFieldValue(UsCoField.SALE_OPT_OUT_NOTICE));
    expect(1, usCo.getFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usCo.getFieldValue(UsCoField.SALE_OPT_OUT));
    expect(1, usCo.getFieldValue(UsCoField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2], usCo.getFieldValue(UsCoField.SENSITIVE_DATA_PROCESSING));
    expect(1, usCo.getFieldValue(UsCoField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCo.getFieldValue(UsCoField.MSPA_COVERED_TRANSACTION));
    expect(1, usCo.getFieldValue(UsCoField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCo.getFieldValue(UsCoField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usCo.getFieldValue(UsCoField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsCo("z").getFieldValue(UsCoField.MSPA_COVERED_TRANSACTION);
    }).to.throw("Unable to decode UsCoCoreSegment 'z'");
  });
});
