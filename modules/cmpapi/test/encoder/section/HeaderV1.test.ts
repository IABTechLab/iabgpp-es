import { expect } from "chai";
import { HeaderV1 } from "../../../src/encoder/section/HeaderV1";

describe("manifest.section.HeaderV1", (): void => {
  it("should encode section ids [] to 000011000001000000000000", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", []);
    expect(headerV1.encodeToBitString()).to.eql("000011000001000000000000");
  });

  it("should encode section ids [2] to 0000110000010000000000010011", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", [2]);
    expect(headerV1.encodeToBitString()).to.eql("0000110000010000000000010011");
  });

  it("should encode section ids [2,6] to 000011000001000000000010001101011", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", [2, 6]);
    expect(headerV1.encodeToBitString()).to.eql("000011000001000000000010001101011");
  });

  it("should decode 000011000001000000000010001101011 to section ids []", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.decodeFromBitString("000011000001000000000000");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([]);
  });

  it("should decode 0000110000010000000000010011 to section ids [2]", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.decodeFromBitString("0000110000010000000000010011");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2]);
  });

  it("should decode 000011000001000000000010001101011 to section ids [2, 6]", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.decodeFromBitString("000001000011000000000010001101011");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2, 6]);
  });

  it("should encode section ids [] to DBAA", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", []);
    expect(headerV1.encode()).to.eql("DBAA");
  });

  it("should encode section ids [2] to DBABMA", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", [2]);
    expect(headerV1.encode()).to.eql("DBABMA");
  });

  it("should encode section ids [2,6] to DBACNYA", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", [2, 6]);
    expect(headerV1.encode()).to.eql("DBACNYA");
  });

  it("should decode DBAA to section ids []", (): void => {
    let headerV1 = new HeaderV1("DBAA");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([]);
  });

  it("should decode DBABMA to section ids [2]", (): void => {
    let headerV1 = new HeaderV1("DBABMA");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2]);
  });

  it("should decode DBACNYA to section ids [2, 6]", (): void => {
    let headerV1 = new HeaderV1("DBACNYA");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2, 6]);
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new HeaderV1("z").getFieldValue("SectionIds");
    }).to.throw("Unable to decode field 'Version'");
  });
});
