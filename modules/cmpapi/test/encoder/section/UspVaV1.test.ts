import { expect } from "chai";
import { UspVaV1Field } from "../../../src/encoder/field/UspVaV1Field";
import { UspVaV1 } from "../../../src/encoder/section/UspVaV1";

describe("manifest.section.UspVaV1", (): void => {
  it("should encode default to BAAAAAAA", (): void => {
    let uspVaV1 = new UspVaV1();
    expect(uspVaV1.encode()).to.eql("BAAAAAAA");
  });

  it("should encode to BbYbG9sA", (): void => {
    let uspVaV1 = new UspVaV1();

    uspVaV1.setFieldValue(UspVaV1Field.SHARING_NOTICE, 1);
    uspVaV1.setFieldValue(UspVaV1Field.SALE_OPT_OUT_NOTICE, 2);
    uspVaV1.setFieldValue(UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    uspVaV1.setFieldValue(UspVaV1Field.SALE_OPT_OUT, 1);
    uspVaV1.setFieldValue(UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    uspVaV1.setFieldValue(UspVaV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3]);
    uspVaV1.setFieldValue(UspVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    uspVaV1.setFieldValue(UspVaV1Field.MSPA_COVERED_TRANSACTION, 1);
    uspVaV1.setFieldValue(UspVaV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    uspVaV1.setFieldValue(UspVaV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);

    expect(uspVaV1.encode()).to.eql("BbYbG9sA");
  });

  it("should decode BbYbG9sA", (): void => {
    let uspVaV1 = new UspVaV1("BbYbG9sA");

    expect(1, uspVaV1.getFieldValue(UspVaV1Field.SHARING_NOTICE));
    expect(2, uspVaV1.getFieldValue(UspVaV1Field.SALE_OPT_OUT_NOTICE));
    expect(1, uspVaV1.getFieldValue(UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, uspVaV1.getFieldValue(UspVaV1Field.SALE_OPT_OUT));
    expect(3, uspVaV1.getFieldValue(UspVaV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], uspVaV1.getFieldValue(UspVaV1Field.SENSITIVE_DATA_PROCESSING));
    expect(3, uspVaV1.getFieldValue(UspVaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, uspVaV1.getFieldValue(UspVaV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, uspVaV1.getFieldValue(UspVaV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, uspVaV1.getFieldValue(UspVaV1Field.MSPA_SERVICE_PROVIDER_MODE));
  });
});
