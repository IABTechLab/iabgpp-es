import { UspV1 } from "../../../src/encoder/section/UspV1";
import { expect } from "chai";

describe("manifest.section.UspV1", (): void => {
  it("should encode 1, 2, 3 to 000001011011", (): void => {
    let uspv1 = new UspV1();
    uspv1.setFieldValue("Notice", 1);
    uspv1.setFieldValue("OptOutSale", 2);
    uspv1.setFieldValue("LspaCovered", 3);

    expect(uspv1.encodeToBitString()).to.eql("000001011011");
  });

  it("should decode 000001011011 to 1, 2, 3", (): void => {
    let uspv1 = new UspV1();
    uspv1.decodeFromBitString("000001011011");
    expect(uspv1.getFieldValue("Notice")).to.eql(1);
    expect(uspv1.getFieldValue("OptOutSale")).to.eql(2);
    expect(uspv1.getFieldValue("LspaCovered")).to.eql(3);
  });

  it("should encode 1, 2, 3 to BbA", (): void => {
    let uspv1 = new UspV1();
    uspv1.setFieldValue("Notice", 1);
    uspv1.setFieldValue("OptOutSale", 2);
    uspv1.setFieldValue("LspaCovered", 3);

    expect(uspv1.encode()).to.eql("BbA");
  });

  it("should decode BbA to 1, 2, 3", (): void => {
    let uspv1 = new UspV1("BbA");
    expect(uspv1.getFieldValue("Notice")).to.eql(1);
    expect(uspv1.getFieldValue("OptOutSale")).to.eql(2);
    expect(uspv1.getFieldValue("LspaCovered")).to.eql(3);
  });
});
