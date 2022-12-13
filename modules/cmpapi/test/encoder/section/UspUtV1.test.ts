import { expect } from "chai";
import { UspUtV1Field } from "../../../src/encoder/field/UspUtV1Field";
import { UspUtV1 } from "../../../src/encoder/section/UspUtV1";

describe("manifest.section.UspUtV1", (): void => {
  it("should encode default to BAAAAAAA", (): void => {
    let uspUtV1 = new UspUtV1();
    expect(uspUtV1.encode()).to.eql("BAAAAAAA");
  });

  it("should encode to BbWGxvbA", (): void => {
    let uspUtV1 = new UspUtV1();

    uspUtV1.setFieldValue(UspUtV1Field.SHARING_NOTICE, 1);
    uspUtV1.setFieldValue(UspUtV1Field.SALE_OPT_OUT_NOTICE, 2);
    uspUtV1.setFieldValue(UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    uspUtV1.setFieldValue(UspUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 1);
    uspUtV1.setFieldValue(UspUtV1Field.SALE_OPT_OUT, 1);
    uspUtV1.setFieldValue(UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    uspUtV1.setFieldValue(UspUtV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3]);
    uspUtV1.setFieldValue(UspUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    uspUtV1.setFieldValue(UspUtV1Field.MSPA_COVERED_TRANSACTION, 1);
    uspUtV1.setFieldValue(UspUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    uspUtV1.setFieldValue(UspUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);

    expect(uspUtV1.encode()).to.eql("BbWGxvbA");
  });

  it("should decode BbWGxvbA", (): void => {
    let uspUtV1 = new UspUtV1("BbWGxvbA");

    expect(1, uspUtV1.getFieldValue(UspUtV1Field.SHARING_NOTICE));
    expect(2, uspUtV1.getFieldValue(UspUtV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, uspUtV1.getFieldValue(UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, uspUtV1.getFieldValue(UspUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, uspUtV1.getFieldValue(UspUtV1Field.SALE_OPT_OUT));
    expect(2, uspUtV1.getFieldValue(UspUtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], uspUtV1.getFieldValue(UspUtV1Field.SENSITIVE_DATA_PROCESSING));
    expect(3, uspUtV1.getFieldValue(UspUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, uspUtV1.getFieldValue(UspUtV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, uspUtV1.getFieldValue(UspUtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, uspUtV1.getFieldValue(UspUtV1Field.MSPA_SERVICE_PROVIDER_MODE));
  });
});
