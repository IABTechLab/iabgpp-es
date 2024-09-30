import { expect } from "chai";
import { UsNatField } from "../../../src/encoder/field/UsNatField";
import { UsNat } from "../../../src/encoder/section/UsNat";

describe("manifest.section.UsNat", (): void => {
  it("should encode default to BAAAAAAAAQA.QA", (): void => {
    let usNat = new UsNat();
    expect(usNat.encode()).to.eql("BAAAAAAAAQA.QA");
  });

  it("should encode to BVVVkkkklWA.YA", (): void => {
    let usNat = new UsNat();

    usNat.setFieldValue(UsNatField.SHARING_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 1);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 1);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0]);
    usNat.setFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [2, 1]);
    usNat.setFieldValue(UsNatField.PERSONAL_DATA_CONSENTS, 1);
    usNat.setFieldValue(UsNatField.MSPA_COVERED_TRANSACTION, 1);
    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNat.setFieldValue(UsNatField.GPC, true);

    expect(usNat.encode()).to.eql("BVVVkkkklWA.YA");
  });

  it("should encode default to BAAAAAAAAQA", (): void => {
    let usNat = new UsNat();
    usNat.setFieldValue(UsNatField.GPC_SEGMENT_INCLUDED, false);
    expect(usNat.encode()).to.eql("BAAAAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usNat = new UsNat();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_NOTICE, -1);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 4);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 0, 0, 1, 2, 0]);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 3]);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.PERSONAL_DATA_CONSENTS, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 3);
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 3);
    }).to.throw();
  });

  it("should validate sharing", (): void => {
    let usNat = new UsNat();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 0);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 1);
      usNat.encode();
    }).to.throw();
    /*
    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 0);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 2);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 2);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 2);
      usNat.encode();
    }).to.throw();
*/
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 0);
    usNat.encode();

    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 1);
    usNat.encode();

    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 2);
    usNat.encode();

    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 2);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT, 1);
    usNat.encode();
  });

  it("should validate sale", (): void => {
    let usNat = new UsNat();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 0);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 0);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 2);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 2);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 2);
      usNat.encode();
    }).to.throw();

    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 0);
    usNat.encode();

    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 1);
    usNat.encode();

    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 2);
    usNat.encode();

    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 2);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT, 1);
    usNat.encode();
  });

  it("should validate targeted advertising", (): void => {
    let usNat = new UsNat();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
      usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 2);
      usNat.encode();
    }).to.throw();

    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 0);
    usNat.encode();

    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNat.encode();

    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 2);
    usNat.encode();

    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 2);
    usNat.setFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNat.encode();
  });

  it("should validate mspa", (): void => {
    let usNat = new UsNat();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
      usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 0);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
      usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 2);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
      usNat.encode();
    }).to.throw();

    expect(function () {
      usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
      usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
      usNat.encode();
    }).to.throw();

    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 0);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 2);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 2);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE, 0);

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 1);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 0);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 1);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 1);
    usNat.encode();

    usNat.setFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNat.setFieldValue(UsNatField.SALE_OPT_OUT_NOTICE, 2);
    usNat.setFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE, 2);
    usNat.setFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE, 2);
    usNat.encode();
  });

  it("should decode BVVVkkkklWA.YA", (): void => {
    let usNat = new UsNat("BVVVkkkklWA.YA");

    expect(1, usNat.getFieldValue(UsNatField.SHARING_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SALE_OPT_OUT));
    expect(1, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT));
    expect(1, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1, 0, 2, 1, 0], usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING));
    expect([2, 1], usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION));
    expect(1, usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usNat.getFieldValue(UsNatField.GPC));
    expect(true, usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BbbbGxsbFbA", (): void => {
    let usNat = new UsNat("BbbbGxsbFbA");

    expect(1, usNat.getFieldValue(UsNatField.SHARING_NOTICE));
    expect(2, usNat.getFieldValue(UsNatField.SALE_OPT_OUT_NOTICE));
    expect(3, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(2, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(3, usNat.getFieldValue(UsNatField.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, usNat.getFieldValue(UsNatField.SALE_OPT_OUT));
    expect(2, usNat.getFieldValue(UsNatField.SHARING_OPT_OUT));
    expect(3, usNat.getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3], usNat.getFieldValue(UsNatField.SENSITIVE_DATA_PROCESSING));
    expect([0, 1], usNat.getFieldValue(UsNatField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.PERSONAL_DATA_CONSENTS));
    expect(1, usNat.getFieldValue(UsNatField.MSPA_COVERED_TRANSACTION));
    expect(2, usNat.getFieldValue(UsNatField.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usNat.getFieldValue(UsNatField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usNat.getFieldValue(UsNatField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsNat("z").getFieldValue(UsNatField.TARGETED_ADVERTISING_OPT_OUT_NOTICE);
    }).to.throw("Unable to decode UsNatCoreSegment 'z'");
  });
});
