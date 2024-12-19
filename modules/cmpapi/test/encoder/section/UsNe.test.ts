import { expect } from "chai";
import { UsNeField } from "../../../src/encoder/field/UsNeField";
import { UsNe } from "../../../src/encoder/section/UsNe";

describe("manifest.section.UsNe", (): void => {
  it("should encode default to BAAAAAQA.QA", (): void => {
    let usNe = new UsNe();
    expect(usNe.encode()).to.eql("BAAAAAQA.QA");
  });

  it("should encode to BVWSSVWA.YA", (): void => {
    let usNe = new UsNe();

    usNe.setFieldValue(UsNeField.PROCESSING_NOTICE, 1);
    usNe.setFieldValue(UsNeField.SALE_OPT_OUT_NOTICE, 1);
    usNe.setFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNe.setFieldValue(UsNeField.SALE_OPT_OUT, 1);
    usNe.setFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNe.setFieldValue(UsNeField.SENSITIVE_DATA_PROCESSING, [2, 1, 0, 2, 1, 0, 2, 1]);
    usNe.setFieldValue(UsNeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 1);
    usNe.setFieldValue(UsNeField.ADDITIONAL_DATA_PROCESSING_CONSENT, 1);
    usNe.setFieldValue(UsNeField.MSPA_COVERED_TRANSACTION, 1);
    usNe.setFieldValue(UsNeField.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNe.setFieldValue(UsNeField.MSPA_SERVICE_PROVIDER_MODE, 2);
    usNe.setFieldValue(UsNeField.GPC, true);

    expect(usNe.encode()).to.eql("BVWSSVWA.YA");
  });

  it("should encode default to BAAAAAQA", (): void => {
    let usNe = new UsNe();
    usNe.setFieldValue(UsNeField.GPC_SEGMENT_INCLUDED, false);
    expect(usNe.encode()).to.eql("BAAAAAQA");
  });

  it("should throw an error if invalid values are set", (): void => {
    let usNe = new UsNe();

    expect(function () {
      usNe.setFieldValue(UsNeField.PROCESSING_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.SALE_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.SALE_OPT_OUT, 3);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT, -1);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 1, 2, 0, 1]);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [1, 2, 3]);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.ADDITIONAL_DATA_PROCESSING_CONSENT, 3);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.MSPA_COVERED_TRANSACTION, 0);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.MSPA_OPT_OUT_OPTION_MODE, 4);
    }).to.throw();

    expect(function () {
      usNe.setFieldValue(UsNeField.MSPA_SERVICE_PROVIDER_MODE, -1);
    }).to.throw();
  });

  it("should decode BVWSSVWA.YA", (): void => {
    let usNe = new UsNe("BVWSSVWA.YA");

    expect(1, usNe.getFieldValue(UsNeField.PROCESSING_NOTICE));
    expect(1, usNe.getFieldValue(UsNeField.SALE_OPT_OUT_NOTICE));
    expect(1, usNe.getFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNe.getFieldValue(UsNeField.SALE_OPT_OUT));
    expect(1, usNe.getFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usNe.getFieldValue(UsNeField.SENSITIVE_DATA_PROCESSING));
    expect(1, usNe.getFieldValue(UsNeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNe.getFieldValue(UsNeField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usNe.getFieldValue(UsNeField.MSPA_COVERED_TRANSACTION));
    expect(1, usNe.getFieldValue(UsNeField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNe.getFieldValue(UsNeField.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, usNe.getFieldValue(UsNeField.GPC));
    expect(true, usNe.getFieldValue(UsNeField.GPC_SEGMENT_INCLUDED));
  });

  it("should decode BVWSSVWA", (): void => {
    let usNe = new UsNe("BVWSSVWA");

    expect(1, usNe.getFieldValue(UsNeField.PROCESSING_NOTICE));
    expect(1, usNe.getFieldValue(UsNeField.SALE_OPT_OUT_NOTICE));
    expect(1, usNe.getFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usNe.getFieldValue(UsNeField.SALE_OPT_OUT));
    expect(1, usNe.getFieldValue(UsNeField.TARGETED_ADVERTISING_OPT_OUT));
    expect([2, 1, 0, 2, 1, 0, 2, 1], usNe.getFieldValue(UsNeField.SENSITIVE_DATA_PROCESSING));
    expect(1, usNe.getFieldValue(UsNeField.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usNe.getFieldValue(UsNeField.ADDITIONAL_DATA_PROCESSING_CONSENT));
    expect(1, usNe.getFieldValue(UsNeField.MSPA_COVERED_TRANSACTION));
    expect(1, usNe.getFieldValue(UsNeField.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, usNe.getFieldValue(UsNeField.MSPA_SERVICE_PROVIDER_MODE));
    expect(false, usNe.getFieldValue(UsNeField.GPC_SEGMENT_INCLUDED));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsNe("z").getFieldValue(UsNeField.SALE_OPT_OUT);
    }).to.throw("Unable to decode UsNeCoreSegment 'z'");
  });
});
