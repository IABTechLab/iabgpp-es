import { expect } from "chai";
import { UsCaField } from "../../../src/encoder/field/UsCaField";
import { UsCa } from "../../../src/encoder/section/UsCa";

describe("manifest.section.UsCa", (): void => {
  it("should encode default to BAAAAABA.QA", (): void => {
    let usCa = new UsCa();
    expect(usCa.encode()).to.eql("BAAAAABA.QA");
  });

  it("should encode to BVWSSSVY.YA", (): void => {
    let usCa = new UsCa();

    usCa.setFieldValue(UsCaField.SALE_OPT_OUT_NOTICE, 1);
    usCa.setFieldValue(UsCaField.SHARING_OPT_OUT_NOTICE, 1);
    usCa.setFieldValue(UsCaField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usCa.setFieldValue(UsCaField.SALE_OPT_OUT, 1);
    usCa.setFieldValue(UsCaField.SHARING_OPT_OUT, 1);
    usCa.setFieldValue(UsCaField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0]);
    usCa.setFieldValue(UsCaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1]);
    usCa.setFieldValue(UsCaField.PERSONAL_DATA_CONSENTS, 1);
    usCa.setFieldValue(UsCaField.MSPA_COVERED_TRANSACTION, 1);
    usCa.setFieldValue(UsCaField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCa.setFieldValue(UsCaField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCa.setFieldValue(UsCaField.GPC, true);

    expect(usCa.encode()).to.eql("BVWSSSVY.YA");
  });

  it("should encode to BAAAAABA", (): void => {
    let usCa = new UsCa();
    usCa.setFieldValue(UsCaField.GPC_SEGMENT_INCLUDED, false);
    expect(usCa.encode()).to.eql("BAAAAABA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usCa = new UsCa();

    expect(function () {
      usCa.setFieldValue(UsCaField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.SHARING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.SENSITIVE_DATA_LIMIT_USE_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.SHARING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.SENSITIVE_DATA_PROCESSING, [0, 0, 0, 0, 3, 0, 0, 0, 0]);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 3]);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.PERSONAL_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usCa.setFieldValue(UsCaField.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should decode BVWSSSVY.YA", (): void => {
    let usCa = new UsCa("BVWSSSVY.YA");

    expect(1, usCa.getFieldValue(UsCaField.SALE_OPT_OUT_NOTICE));
    expect(1, usCa.getFieldValue(UsCaField.SHARING_OPT_OUT_NOTICE));
    expect(1, usCa.getFieldValue(UsCaField.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usCa.getFieldValue(UsCaField.SALE_OPT_OUT));
    expect(1, usCa.getFieldValue(UsCaField.SHARING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0], usCa.getFieldValue(UsCaField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1], usCa.getFieldValue(UsCaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCa.getFieldValue(UsCaField.PERSONAL_DATA_CONSENTS));
    expect(1, usCa.getFieldValue(UsCaField.MSPA_COVERED_TRANSACTION));
    expect(1, usCa.getFieldValue(UsCaField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCa.getFieldValue(UsCaField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usCa.getFieldValue(UsCaField.GPC));
    expect(true, usCa.getFieldValue(UsCaField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BAAAAAAA", (): void => {
    let usCa = new UsCa("BbYbGwXY.YA");

    expect(1, usCa.getFieldValue(UsCaField.SALE_OPT_OUT_NOTICE));
    expect(2, usCa.getFieldValue(UsCaField.SHARING_OPT_OUT_NOTICE));
    expect(3, usCa.getFieldValue(UsCaField.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usCa.getFieldValue(UsCaField.SALE_OPT_OUT));
    expect(2, usCa.getFieldValue(UsCaField.SHARING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3, 0], usCa.getFieldValue(UsCaField.SENSITIVE_DATA_PROCESSING));
    expect([0, 1], usCa.getFieldValue(UsCaField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCa.getFieldValue(UsCaField.PERSONAL_DATA_CONSENTS));
    expect(3, usCa.getFieldValue(UsCaField.MSPA_COVERED_TRANSACTION));
    expect(1, usCa.getFieldValue(UsCaField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCa.getFieldValue(UsCaField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usCa.getFieldValue(UsCaField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsCa("z").getFieldValue(UsCaField.PERSONAL_DATA_CONSENTS);
    }).to.throw("Unable to decode UsCaCoreSegment 'z'");
  });
});
