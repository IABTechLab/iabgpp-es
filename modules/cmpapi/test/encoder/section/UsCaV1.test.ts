import { expect } from "chai";
import { UsCaV1Field } from "../../../src/encoder/field/UsCaV1Field";
import { UsCaV1 } from "../../../src/encoder/section/UsCaV1";

describe("manifest.section.UsCaV1", (): void => {
  it("should encode default to BAAAAABA.QA", (): void => {
    let usCaV1 = new UsCaV1();
    expect(usCaV1.encode()).to.eql("BAAAAABA.QA");
  });

  it("should encode to BVWSSSVY.YA", (): void => {
    let usCaV1 = new UsCaV1();

    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 1);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 1);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0]);
    usCaV1.setFieldValue(UsCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1]);
    usCaV1.setFieldValue(UsCaV1Field.PERSONAL_DATA_CONSENTS, 1);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_COVERED_TRANSACTION, 1);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCaV1.setFieldValue(UsCaV1Field.GPC, true);

    expect(usCaV1.encode()).to.eql("BVWSSSVY.YA");
  });

  it("should encode to BAAAAABA", (): void => {
    let usCaV1 = new UsCaV1();
    usCaV1.setFieldValue(UsCaV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usCaV1.encode()).to.eql("BAAAAABA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usCaV1 = new UsCaV1();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_PROCESSING, [0, 0, 0, 0, 3, 0, 0, 0, 0]);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 3]);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.PERSONAL_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sharing", (): void => {
    let usCaV1 = new UsCaV1();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 0);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 0);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 2);
      usCaV1.encode();
    }).to.throw();

    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 0);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 1);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 2);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT, 1);
    usCaV1.encode();
  });

  it("should validate sale", (): void => {
    let usCaV1 = new UsCaV1();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 0);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 0);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 2);
      usCaV1.encode();
    }).to.throw();

    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 0);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 1);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 2);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 2);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT, 1);
    usCaV1.encode();
  });

  it("should validate mspa", (): void => {
    let usCaV1 = new UsCaV1();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
      usCaV1.encode();
    }).to.throw();

    expect(function () {
      usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
      usCaV1.encode();
    }).to.throw();

    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usCaV1.encode();

    usCaV1.setFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usCaV1.setFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE, 2);
    usCaV1.setFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
    usCaV1.setFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
    usCaV1.encode();
  });

  it("should decode BVWSSSVY.YA", (): void => {
    let usCaV1 = new UsCaV1("BVWSSSVY.YA");

    expect(1, usCaV1.getFieldValue(UsCaV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usCaV1.getFieldValue(UsCaV1Field.SHARING_OPT_OUT_NOTICE));
    expect(1, usCaV1.getFieldValue(UsCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usCaV1.getFieldValue(UsCaV1Field.SALE_OPT_OUT));
    expect(1, usCaV1.getFieldValue(UsCaV1Field.SHARING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0], usCaV1.getFieldValue(UsCaV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1], usCaV1.getFieldValue(UsCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usCaV1.getFieldValue(UsCaV1Field.PERSONAL_DATA_CONSENTS));
    expect(1, usCaV1.getFieldValue(UsCaV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usCaV1.getFieldValue(UsCaV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usCaV1.getFieldValue(UsCaV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usCaV1.getFieldValue(UsCaV1Field.GPC));
    expect(true, usCaV1.getFieldValue(UsCaV1Field.GPC_SEGMENT_INCLUDED));
  });
});
