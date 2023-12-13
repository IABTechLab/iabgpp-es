import { expect } from "chai";
import { TcfCaV1Field } from "../../../src/encoder/field/TcfCaV1Field";
import { TcfCaV1 } from "../../../src/encoder/section/TcfCaV1";
import { RangeEntry } from "../../../src/encoder/datatype";

describe("manifest.section.TcfCaV1", (): void => {
  it("BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA", (): void => {
    let tcfCaV1 = new TcfCaV1();
    tcfCaV1.setFieldValue(TcfCaV1Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfCaV1.setFieldValue(TcfCaV1Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV1.encode()).to.eql("BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA");
  });

  it("should encode to BPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACACAAA.fHHHA4444ao", (): void => {
    let tcfCaV1 = new TcfCaV1();

    tcfCaV1.setFieldValue(TcfCaV1Field.CMP_ID, 50);
    tcfCaV1.setFieldValue(TcfCaV1Field.CMP_VERSION, 2);
    tcfCaV1.setFieldValue(TcfCaV1Field.VENDOR_LIST_VERSION, 413);
    tcfCaV1.setFieldValue(TcfCaV1Field.USE_NON_STANDARD_STACKS, true);
    tcfCaV1.setFieldValue(TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT, [
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
    tcfCaV1.setFieldValue(TcfCaV1Field.PURPOSES_EXPRESS_CONSENT, [
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    tcfCaV1.setFieldValue(TcfCaV1Field.PURPOSES_IMPLIED_CONSENT, [
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
    tcfCaV1.setFieldValue(TcfCaV1Field.VENDOR_EXPRESS_CONSENT, [12, 24, 48]);
    tcfCaV1.setFieldValue(TcfCaV1Field.VENDOR_IMPLIED_CONSENT, [18, 30]);
    tcfCaV1.setFieldValue(TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT, [
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
    ]);
    tcfCaV1.setFieldValue(TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT, [
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
    ]);
    tcfCaV1.setFieldValue(TcfCaV1Field.NUM_CUSTOM_PURPOSES, 3);
    tcfCaV1.setFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT, [false, true, false]);
    tcfCaV1.setFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT, [true, false, true]);

    tcfCaV1.setFieldValue(TcfCaV1Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfCaV1.setFieldValue(TcfCaV1Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));

    expect(tcfCaV1.encode()).to.eql("BPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACACAAA.fHHHA4444ao");
  });

  it("should encode to BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA.IAGO5wAA", (): void => {
    let tcfCaV1 = new TcfCaV1();
    tcfCaV1.setFieldValue(TcfCaV1Field.DISCLOSED_VENDORS, [1, 2, 3, 5, 6, 7, 10, 11, 12]);
    tcfCaV1.setFieldValue(TcfCaV1Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfCaV1.setFieldValue(TcfCaV1Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV1.encode()).to.eql("BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA.IAGO5wAA");
  });

  it("should encode to BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAACCgBwABAAOAAoADgAJA.YAAAAAAAAAA", (): void => {
    let tcfCaV1 = new TcfCaV1();
    tcfCaV1.setFieldValue(TcfCaV1Field.PUB_RESTRICTIONS, [new RangeEntry(1, 1, [1, 2, 3, 5, 6, 7, 9])]);
    tcfCaV1.setFieldValue(TcfCaV1Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfCaV1.setFieldValue(TcfCaV1Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV1.encode()).to.eql("BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAACCgBwABAAOAAoADgAJA.YAAAAAAAAAA");
  });

  it("should decode BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA", (): void => {
    let tcfCaV1 = new TcfCaV1("BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA");

    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CMP_ID)).to.eql(0);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CMP_VERSION)).to.eql(0);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.VENDOR_LIST_VERSION)).to.eql(0);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.USE_NON_STANDARD_STACKS)).to.eql(false);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT)).to.eql([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PURPOSES_EXPRESS_CONSENT)).to.eql([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PURPOSES_IMPLIED_CONSENT)).to.eql([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.VENDOR_EXPRESS_CONSENT)).to.eql([]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.VENDOR_IMPLIED_CONSENT)).to.eql([]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT)).to.eql([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT)).to.eql([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.NUM_CUSTOM_PURPOSES)).to.eql(0);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT)).to.eql([]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT)).to.eql([]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CREATED)).to.eql(new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.LAST_UPDATED)).to.eql(new Date("2022-01-01T00:00:00Z"));

    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CONSENT_LANGUAGE)).to.eql("EN");
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_PURPOSES_SEGMENT_TYPE)).to.eql(3);
  });

  it("should decode BPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACACAAA.fHHHA4444ao", (): void => {
    let tcfCaV1 = new TcfCaV1("BPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACACAAA.fHHHA4444ao");

    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CMP_ID)).to.eql(50);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CMP_VERSION)).to.eql(2);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.VENDOR_LIST_VERSION)).to.eql(413);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.USE_NON_STANDARD_STACKS)).to.eql(true);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT)).to.eql([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PURPOSES_EXPRESS_CONSENT)).to.eql([
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PURPOSES_IMPLIED_CONSENT)).to.eql([
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.VENDOR_EXPRESS_CONSENT)).to.eql([12, 24, 48]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.VENDOR_IMPLIED_CONSENT)).to.eql([18, 30]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT)).to.eql([
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT)).to.eql([
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
    ]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.NUM_CUSTOM_PURPOSES)).to.eql(3);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT)).to.eql([false, true, false]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT)).to.eql([true, false, true]);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CREATED)).to.eql(new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.LAST_UPDATED)).to.eql(new Date("2022-01-01T00:00:00Z"));

    expect(tcfCaV1.getFieldValue(TcfCaV1Field.CONSENT_LANGUAGE)).to.eql("EN");
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_PURPOSES_SEGMENT_TYPE)).to.eql(3);
  });

  it("should decode BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAACCgBwABAAOAAoADgAJA.YAAAAAAAAAA", (): void => {
    let tcfCaV1 = new TcfCaV1("BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAACCgBwABAAOAAoADgAJA.YAAAAAAAAAA");

    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_RESTRICTIONS).length).to.eql(1);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_RESTRICTIONS)[0].key).to.eql(1);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_RESTRICTIONS)[0].type).to.eql(1);
    expect(tcfCaV1.getFieldValue(TcfCaV1Field.PUB_RESTRICTIONS)[0].ids).to.eql([1, 2, 3, 5, 6, 7, 9]);
  });

  it("should throw Error on garbage 1", (): void => {
    expect(function () {
      new TcfCaV1("A").getFieldValue(TcfCaV1Field.USE_NON_STANDARD_STACKS);
    }).to.throw("Unable to decode TcfCaV1CoreSegment 'A'");
  });

  it("should throw Error on garbage 2", (): void => {
    expect(function () {
      new TcfCaV1("z").getFieldValue(TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT);
    }).to.throw("Unable to decode TcfCaV1 segment 'z'");
  });
});
