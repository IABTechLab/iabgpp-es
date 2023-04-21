import { expect } from "chai";
import { TcfCaV1Field } from "../../../src/encoder/field/TcfCaV1Field";
import { TcfCaV1 } from "../../../src/encoder/section/TcfCaV1";

describe("manifest.section.TcfCaV1", (): void => {
  it("should encode default to CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAA", (): void => {
    let tcfCaV2 = new TcfCaV1();
    tcfCaV2.setFieldValue(TcfCaV1Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfCaV2.setFieldValue(TcfCaV1Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV2.encode()).to.eql("CPSG_8APSG_8AAAAAAENAABAAAAAAAAAAAAAAAAA.YAAAAAAAAAA");
  });

  it("should encode to CPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACAC.fHHHA4444ao", (): void => {
    let tcfCaV2 = new TcfCaV1();

    tcfCaV2.setFieldValue(TcfCaV1Field.CMP_ID, 50);
    tcfCaV2.setFieldValue(TcfCaV1Field.CMP_VERSION, 2);
    tcfCaV2.setFieldValue(TcfCaV1Field.VENDOR_LIST_VERSION, 413);
    tcfCaV2.setFieldValue(TcfCaV1Field.USE_NON_STANDARD_STACKS, true);
    tcfCaV2.setFieldValue(TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV1Field.PURPOSES_EXPRESS_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV1Field.PURPOSES_IMPLIED_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV1Field.VENDOR_EXPRESS_CONSENT, [12, 24, 48]);
    tcfCaV2.setFieldValue(TcfCaV1Field.VENDOR_IMPLIED_CONSENT, [18, 30]);
    tcfCaV2.setFieldValue(TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV1Field.NUM_CUSTOM_PURPOSES, 3);
    tcfCaV2.setFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT, [false, true, false]);
    tcfCaV2.setFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT, [true, false, true]);

    tcfCaV2.setFieldValue(TcfCaV1Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfCaV2.setFieldValue(TcfCaV1Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));

    expect(tcfCaV2.encode()).to.eql("CPSG_8APSG_8AAyACAENGdBgf_gfgAfgfgBgABABAAABAB4AACAC.fHHHA4444ao");
  });

  it("should decode CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAA", (): void => {
    let tcfCaV2 = new TcfCaV1("CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAA");

    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CMP_ID)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CMP_VERSION)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.VENDOR_LIST_VERSION)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.USE_NON_STANDARD_STACKS)).to.eql(false);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.VENDOR_EXPRESS_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.VENDOR_IMPLIED_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.NUM_CUSTOM_PURPOSES)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CREATED)).to.eql(new Date("1970-01-01T00:00:00Z"));
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.LAST_UPDATED)).to.eql(new Date("1970-01-01T00:00:00Z"));

    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CONSENT_LANGUAGE)).to.eql("EN");
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.SEGMENT_TYPE)).to.eql(3);
  });

  it("should decode CPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACAC.fHHHA4444ao", (): void => {
    let tcfCaV2 = new TcfCaV1("CPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACAC.fHHHA4444ao");

    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CMP_ID)).to.eql(50);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CMP_VERSION)).to.eql(2);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.VENDOR_LIST_VERSION)).to.eql(413);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.USE_NON_STANDARD_STACKS)).to.eql(true);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.VENDOR_EXPRESS_CONSENT)).to.eql([12, 24, 48]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.VENDOR_IMPLIED_CONSENT)).to.eql([18, 30]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.NUM_CUSTOM_PURPOSES)).to.eql(3);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT)).to.eql([false, true, false]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT)).to.eql([true, false, true]);
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CREATED)).to.eql(new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.LAST_UPDATED)).to.eql(new Date("2022-01-01T00:00:00Z"));

    expect(tcfCaV2.getFieldValue(TcfCaV1Field.CONSENT_LANGUAGE)).to.eql("EN");
    expect(tcfCaV2.getFieldValue(TcfCaV1Field.SEGMENT_TYPE)).to.eql(3);
  });
});
