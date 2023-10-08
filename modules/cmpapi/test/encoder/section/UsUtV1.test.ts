import { expect } from "chai";
import { UsUtV1Field } from "../../../src/encoder/field/UsUtV1Field";
import { UsUtV1 } from "../../../src/encoder/section/UsUtV1";

describe("manifest.section.UsUtV1", (): void => {
  it("should encode default to BAAAAAAA", (): void => {
    let usUtV1 = new UsUtV1();
    expect(usUtV1.encode()).to.eql("BAAAAAAA");
  });

  it("should encode to BbWGxvbA", (): void => {
    let usUtV1 = new UsUtV1();

    usUtV1.setFieldValue(UsUtV1Field.SHARING_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE, 2);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE, 3);
    usUtV1.setFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE, 1);
    usUtV1.setFieldValue(UsUtV1Field.SALE_OPT_OUT, 1);
    usUtV1.setFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT, 2);
    usUtV1.setFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING, [0, 1, 2, 3, 0, 1, 2, 3]);
    usUtV1.setFieldValue(UsUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS, 3);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_COVERED_TRANSACTION, 1);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE, 2);
    usUtV1.setFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE, 3);

    expect(usUtV1.encode()).to.eql("BbWGxvbA");
  });

  it("should decode BbWGxvbA", (): void => {
    let usUtV1 = new UsUtV1("BbWGxvbA");

    expect(1, usUtV1.getFieldValue(UsUtV1Field.SHARING_NOTICE));
    expect(2, usUtV1.getFieldValue(UsUtV1Field.SALE_OPT_OUT_NOTICE));
    expect(3, usUtV1.getFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT_NOTICE));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING_OPT_OUT_NOTICE));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.SALE_OPT_OUT));
    expect(2, usUtV1.getFieldValue(UsUtV1Field.TARGETED_ADVERTISING_OPT_OUT));
    expect([0, 1, 2, 3, 0, 1, 2, 3], usUtV1.getFieldValue(UsUtV1Field.SENSITIVE_DATA_PROCESSING));
    expect(3, usUtV1.getFieldValue(UsUtV1Field.KNOWN_CHILD_SENSITIVE_DATA_CONSENTS));
    expect(1, usUtV1.getFieldValue(UsUtV1Field.MSPA_COVERED_TRANSACTION));
    expect(2, usUtV1.getFieldValue(UsUtV1Field.MSPA_OPT_OUT_OPTION_MODE));
    expect(3, usUtV1.getFieldValue(UsUtV1Field.MSPA_SERVICE_PROVIDER_MODE));
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new UsUtV1("z").getFieldValue(UsUtV1Field.SHARING_NOTICE);
    }).to.throw("Unable to decode field 'SharingNotice'");
  });
});
