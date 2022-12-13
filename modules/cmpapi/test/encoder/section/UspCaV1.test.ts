import { expect } from "chai";
import { UspCaV1Field } from "../../../src/encoder/field/UspCaV1Field";
import { UspCaV1 } from "../../../src/encoder/section/UspCaV1";

describe("manifest.section.UspCaV1", (): void => {
  it("should encode default to BAAAAAAA.QAAA", (): void => {
    let uspCaV1 = new UspCaV1();
    expect(uspCaV1.encode()).to.eql("BAAAAAAA.QAAA");
  });

  it("should encode to BbYbGwXY.YAAA", (): void => {
    let uspCaV1 = new UspCaV1();

    uspCaV1.setFieldValue(UspCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    uspCaV1.setFieldValue(UspCaV1Field.SHARING_OPT_OUT_NOTICE, 2);
    uspCaV1.setFieldValue(UspCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 3);
    uspCaV1.setFieldValue(UspCaV1Field.SALE_OPT_OUT, 1);
    uspCaV1.setFieldValue(UspCaV1Field.SHARING_OPT_OUT, 2);
    uspCaV1.setFieldValue(UspCaV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3, 0]);
    uspCaV1.setFieldValue(UspCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 1]);
    uspCaV1.setFieldValue(UspCaV1Field.PERSONAL_DATA_CONSENTS, 1);
    uspCaV1.setFieldValue(UspCaV1Field.MSPA_COVERED_TRANSACTION, 3);
    uspCaV1.setFieldValue(UspCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    uspCaV1.setFieldValue(UspCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 2);
    uspCaV1.setFieldValue(UspCaV1Field.GPC, true);

    expect(uspCaV1.encode()).to.eql("BbYbGwXY.YAAA");
  });

  it("should encode to BUoAAABQ.YAAA", (): void => {
    let uspCaV1 = new UspCaV1();

    uspCaV1.setFieldValue(UspCaV1Field.SALE_OPT_OUT_NOTICE, 1);
    uspCaV1.setFieldValue(UspCaV1Field.SHARING_OPT_OUT_NOTICE, 1);
    uspCaV1.setFieldValue(UspCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE, 0);
    uspCaV1.setFieldValue(UspCaV1Field.SALE_OPT_OUT, 2);
    uspCaV1.setFieldValue(UspCaV1Field.SHARING_OPT_OUT, 2);
    uspCaV1.setFieldValue(UspCaV1Field.SENSITIVE_DATA_PROCESSING, [0, 0, 0, 0, 0, 0, 0, 0, 0]);
    uspCaV1.setFieldValue(UspCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, [0, 0]);
    uspCaV1.setFieldValue(UspCaV1Field.PERSONAL_DATA_CONSENTS, 0);
    uspCaV1.setFieldValue(UspCaV1Field.MSPA_COVERED_TRANSACTION, 1);
    uspCaV1.setFieldValue(UspCaV1Field.MSPA_OPT_OUT_OPTION_MODE, 1);
    uspCaV1.setFieldValue(UspCaV1Field.MSPA_SERVICE_PROVIDER_MODE, 0);
    uspCaV1.setFieldValue(UspCaV1Field.GPC, true);

    expect(uspCaV1.encode()).to.eql("BUoAAABQ.YAAA");
  });

  it("should decode BbYbGwXY.YAAA", (): void => {
    let uspCaV1 = new UspCaV1("BbYbGwXY.YAAA");

    expect(1, uspCaV1.getFieldValue(UspCaV1Field.SALE_OPT_OUT_NOTICE));
    expect(2, uspCaV1.getFieldValue(UspCaV1Field.SHARING_OPT_OUT_NOTICE));
    expect(3, uspCaV1.getFieldValue(UspCaV1Field.SENSITIVE_DATA_LIMIT_USE_NOTICE));
    expect(1, uspCaV1.getFieldValue(UspCaV1Field.SALE_OPT_OUT));
    expect(2, uspCaV1.getFieldValue(UspCaV1Field.SHARING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3, 0], uspCaV1.getFieldValue(UspCaV1Field.SENSITIVE_DATA_PROCESSING));
    expect([0, 1], uspCaV1.getFieldValue(UspCaV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, uspCaV1.getFieldValue(UspCaV1Field.PERSONAL_DATA_CONSENTS));
    expect(3, uspCaV1.getFieldValue(UspCaV1Field.MSPA_COVERED_TRANSACTION));
    expect(1, uspCaV1.getFieldValue(UspCaV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(2, uspCaV1.getFieldValue(UspCaV1Field.MSPA_SERVICE_PROVIDER_MODE));
    expect(true, uspCaV1.getFieldValue(UspCaV1Field.GPC));
  });
});
