import { expect } from "chai";
import { UsNatV1Field } from "../../../src/encoder/field/UsNatV1Field";
import { UsNatV1 } from "../../../src/encoder/section/UsNatV1";

describe("manifest.section.UsNatV1", (): void => {
  it("should encode default to BAAAAAAAAQA.QA", (): void => {
    let usNatV1 = new UsNatV1();
    expect(usNatV1.encode()).to.eql("BAAAAAAAAQA.QA");
  });

  it("should encode to BVVVkkkklWA.YA", (): void => {
    let usNatV1 = new UsNatV1();

    usNatV1.setFieldValue(UsNatV1Field.SHARING_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 1);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0]);
    usNatV1.setFieldValue(UsNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1]);
    usNatV1.setFieldValue(UsNatV1Field.PERSONAL_DATA_CONSENTS, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_COVERED_TRANSACTION, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNatV1.setFieldValue(UsNatV1Field.GPC, true);

    expect(usNatV1.encode()).to.eql("BVVVkkkklWA.YA");
  });

  it("should encode default to BAAAAAAAAQA", (): void => {
    let usNatV1 = new UsNatV1();
    usNatV1.setFieldValue(UsNatV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usNatV1.encode()).to.eql("BAAAAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usNatV1 = new UsNatV1();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 4);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 0, 0, 1, 2, 0]);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 3]);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.PERSONAL_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sharing", (): void => {
    let usNatV1 = new UsNatV1();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 1);
      usNatV1.encode();
    }).to.throw();
    /*
    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 2);
      usNatV1.encode();
    }).to.throw();
*/
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 0);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 1);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 2);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 1);
    usNatV1.encode();
  });

  it("should validate sale", (): void => {
    let usNatV1 = new UsNatV1();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 2);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 2);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 2);
      usNatV1.encode();
    }).to.throw();

    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 0);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 1);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 2);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 1);
    usNatV1.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usNatV1 = new UsNatV1();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
      usNatV1.encode();
    }).to.throw();

    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 0);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNatV1.encode();
  });

  it("should validate mspa", (): void => {
    let usNatV1 = new UsNatV1();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
      usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 2);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
      usNatV1.encode();
    }).to.throw();

    expect(function () {
      usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
      usNatV1.encode();
    }).to.throw();

    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 0);

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usNatV1.encode();

    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
    usNatV1.encode();
  });

  it("should decode BVVVkkkklWA.YA", (): void => {
    let usNatV1 = new UsNatV1("BVVVkkkklWA.YA");

    expect(1, usNatV1.getFieldValue(UsNatV1Field.SHARING_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.SALE_OPT_OUT));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.SHARING_OPT_OUT));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0], usNatV1.getFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING));
    expect([2, 1], usNatV1.getFieldValue(UsNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.PERSONAL_DATA_CONSENTS));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNatV1.getFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usNatV1.getFieldValue(UsNatV1Field.GPC));
    expect(true, usNatV1.getFieldValue(UsNatV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BbbbGxsbFbA", (): void => {
    let usNatV1 = new UsNatV1("BbbbGxsbFbA");

    expect(1, usNatV1.getFieldValue(UsNatV1Field.SHARING_NOTICE));
    expect(2, usNatV1.getFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, usNatV1.getFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(2, usNatV1.getFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(3, usNatV1.getFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.SALE_OPT_OUT));
    expect(2, usNatV1.getFieldValue(UsNatV1Field.SHARING_OPT_OUT));
    expect(3, usNatV1.getFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], usNatV1.getFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING));
    expect([0, 1], usNatV1.getFieldValue(UsNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.PERSONAL_DATA_CONSENTS));
    expect(1, usNatV1.getFieldValue(UsNatV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, usNatV1.getFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usNatV1.getFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usNatV1.getFieldValue(UsNatV1Field.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsNatV1("z").getFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE);
    }).to.throw("Unable to decode UsNatV1CoreSegment 'z'");
  });
});
