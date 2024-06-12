import { expect } from "chai";
import { UsNatV1Field } from "../../../src/encoder/field/UsNatV1Field";
import { UsNatV1 } from "../../../src/encoder/section/UsNatV1";

describe("manifest.section.UsNatV1", (): void => {
  it("should encode default to BAAAAAAAAQA.QA", (): void => {
    let usNatV1 = new UsNatV1();
    expect(usNatV1.encode()).to.eql("BAAAAAAAAQA.QA");
  });

  it("should encode to BbbbGxsbFbA.YA", (): void => {
    let usNatV1 = new UsNatV1();

    usNatV1.setFieldValue(UsNatV1Field.SHARING_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 3);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 2);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 3);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 2);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 3);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3]);
    usNatV1.setFieldValue(UsNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 1]);
    usNatV1.setFieldValue(UsNatV1Field.PERSONAL_DATA_CONSENTS, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_COVERED_TRANSACTION, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);
    usNatV1.setFieldValue(UsNatV1Field.GPC, true);

    expect(usNatV1.encode()).to.eql("BbbbGxsbFbA.YA");
  });

  it("should encode to BVQVAAAAAUA.YA", (): void => {
    let usNatV1 = new UsNatV1();

    usNatV1.setFieldValue(UsNatV1Field.SHARING_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 1);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    usNatV1.setFieldValue(UsNatV1Field.SALE_OPT_OUT, 1);
    usNatV1.setFieldValue(UsNatV1Field.SHARING_OPT_OUT, 1);
    usNatV1.setFieldValue(UsNatV1Field.TARGETED_ADVERTISING_OPT_OUT, 1);
    usNatV1.setFieldValue(UsNatV1Field.SENSITIVE_DATA_PROCESSING, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    usNatV1.setFieldValue(UsNatV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 0]);
    usNatV1.setFieldValue(UsNatV1Field.PERSONAL_DATA_CONSENTS, 0);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_COVERED_TRANSACTION, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    usNatV1.setFieldValue(UsNatV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    usNatV1.setFieldValue(UsNatV1Field.GPC, true);

    expect(usNatV1.encode()).to.eql("BVQVAAAAAUA.YA");
  });

  it("should encode default to BAAAAAAAAQA", (): void => {
    let usNatV1 = new UsNatV1();
    usNatV1.setFieldValue(UsNatV1Field.GPC_SEGMENT_INCLUDED, false);
    expect(usNatV1.encode()).to.eql("BAAAAAAAAQA");
  });

  it("should decode BbbbGxsbFbA.YA", (): void => {
    let usNatV1 = new UsNatV1("BbbbGxsbFbA.YA");

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
});
