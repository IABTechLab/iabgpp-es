import { UspV1 } from "../../../src/encoder/section/UspV1";
import { expect } from "chai";

describe("manifest.section.UspV1", (): void => {
  it("should default encode 1---", (): void => {
    let uspv1 = new UspV1();
    expect(uspv1.encode()).to.eql("1---");
  });

  it("should decode 1NYN", (): void => {
    let uspv1 = new UspV1("1NYN");
    expect(uspv1.getFieldValue("Version")).to.eql(1);
    expect(uspv1.getFieldValue("Notice")).to.eql("N");
    expect(uspv1.getFieldValue("OptOutSale")).to.eql("Y");
    expect(uspv1.getFieldValue("LspaCovered")).to.eql("N");
  });

  it("should decode 2YNY", (): void => {
    let uspv1 = new UspV1("2YNY");
    expect(uspv1.getFieldValue("Version")).to.eql(2);
    expect(uspv1.getFieldValue("Notice")).to.eql("Y");
    expect(uspv1.getFieldValue("OptOutSale")).to.eql("N");
    expect(uspv1.getFieldValue("LspaCovered")).to.eql("Y");
  });

  it("should encode to 1YNN", (): void => {
    let uspv1 = new UspV1();
    uspv1.setFieldValue("Notice", "Y");
    uspv1.setFieldValue("OptOutSale", "N");
    uspv1.setFieldValue("LspaCovered", "N");

    expect(uspv1.encode()).to.eql("1YNN");
  });

  it("should decode to 2NYY", (): void => {
    let uspv1 = new UspV1();
    uspv1.setFieldValue("Version", 2);
    uspv1.setFieldValue("Notice", "N");
    uspv1.setFieldValue("OptOutSale", "Y");
    uspv1.setFieldValue("LspaCovered", "Y");

    expect(uspv1.encode()).to.eql("2NYY");
  });
});
