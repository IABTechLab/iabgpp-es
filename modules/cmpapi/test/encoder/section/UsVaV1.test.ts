import { expect } from "chai";
import { UsVaV1Field } from "../../../src/encoder/field/UsVaV1Field";
import { UsVaV1 } from "../../../src/encoder/section/UsVaV1";

describe("manifest.section.UsVaV1", (): void => {
  it("should encode default to BAAAAAA", (): void => {
    let usVaV1 = new UsVaV1();
    expect(usVaV1.encode()).to.eql("BAAAAAA");
  });

  it("should encode to BbYbG9s", (): void => {
    let usVaV1 = new UsVaV1();

    usVaV1.setFieldValue(UsVaV1Field.SHARING_NOTICE, 1);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE, 2);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    usVaV1.setFieldValue(UsVaV1Field.SALE_OPT_OUT, 1);
    usVaV1.setFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usVaV1.setFieldValue(UsVaV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3]);
    usVaV1.setFieldValue(UsVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_COVERED_TRANSACTION, 1);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usVaV1.setFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);

    expect(usVaV1.encode()).to.eql("BbYbG9s");
  });

  it("should decode BbYbG9s", (): void => {
    let usVaV1 = new UsVaV1("BbYbG9s");

    expect(1, usVaV1.getFieldValue(UsVaV1Field.SHARING_NOTICE));
    expect(2, usVaV1.getFieldValue(UsVaV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.SALE_OPT_OUT));
    expect(3, usVaV1.getFieldValue(UsVaV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], usVaV1.getFieldValue(UsVaV1Field.SENSITIVE_DATA_PROCESSING));
    expect(3, usVaV1.getFieldValue(UsVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usVaV1.getFieldValue(UsVaV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, usVaV1.getFieldValue(UsVaV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usVaV1.getFieldValue(UsVaV1Field.MSPA_SERVICE_PROVIDER_MODE));
  });
});
