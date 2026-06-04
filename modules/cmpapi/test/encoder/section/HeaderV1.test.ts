import { expect } from "chai";
import { HeaderV1 } from "../../../src/encoder/section/HeaderV1.js";

describe("manifest.section.HeaderV1", (): void => {
  it("should encode section ids [] to DBAA", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", []);
    expect(headerV1.encode()).to.eql("DBAA");
  });

  it("should encode section ids [2] to DBABM", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", [2]);
    expect(headerV1.encode()).to.eql("DBABM");
  });

  it("should encode section ids [2,6] to DBACNY", (): void => {
    let headerV1 = new HeaderV1();
    headerV1.setFieldValue("SectionIds", [2, 6]);
    expect(headerV1.encode()).to.eql("DBACNY");
  });

  it("should decode DBAA to section ids []", (): void => {
    let headerV1 = new HeaderV1("DBAA");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([]);
  });

  it("should decode DBABM to section ids [2]", (): void => {
    let headerV1 = new HeaderV1("DBABM");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2]);
  });

  it("should decode DBABMA to section ids [2]", (): void => {
    let headerV1 = new HeaderV1("DBABMA");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2]);
  });

  it("should decode DBACNY to section ids [2, 6]", (): void => {
    let headerV1 = new HeaderV1("DBACNY");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2, 6]);
  });

  it("should decode DBACNYA to section ids [2, 6]", (): void => {
    let headerV1 = new HeaderV1("DBACNYA");
    expect(headerV1.getFieldValue("SectionIds")).to.eql([2, 6]);
  });

  it("should throw Error on garbage", (): void => {
    expect(function () {
      new HeaderV1("z").getFieldValue("SectionIds");
    }).to.throw("Unable to decode HeaderV1CoreSegment 'z'");
  });
});
