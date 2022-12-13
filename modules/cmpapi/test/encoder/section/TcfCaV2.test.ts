import { expect } from "chai";
import { TcfCaV2Field } from "../../../src/encoder/field/TcfCaV2Field";
import { TcfCaV2 } from "../../../src/encoder/section/TcfCaV2";

describe("manifest.section.TcfCaV2", (): void => {
  it("should encode default to CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAAA", (): void => {
    let tcfCaV2 = new TcfCaV2();
    expect(tcfCaV2.encode()).to.eql("CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAAA");
  });

  it("should encode to CPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgAMAAwADAAIACQAHg.fHHHA4444aoA", (): void => {
    let tcfCaV2 = new TcfCaV2();

    tcfCaV2.setFieldValue(TcfCaV2Field.CMP_ID, 50);
    tcfCaV2.setFieldValue(TcfCaV2Field.CMP_VERSION, 2);
    tcfCaV2.setFieldValue(TcfCaV2Field.VENDOR_LIST_VERSION, 413);
    tcfCaV2.setFieldValue(TcfCaV2Field.USE_NON_STANDARD_STACKS, true);
    tcfCaV2.setFieldValue(TcfCaV2Field.SPECIAL_FEATURE_EXPRESS_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV2Field.PURPOSES_EXPRESS_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV2Field.PURPOSES_IMPLIED_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV2Field.VENDOR_EXPRESS_CONSENT, [12, 24, 48]);
    tcfCaV2.setFieldValue(TcfCaV2Field.VENDOR_IMPLIED_CONSENT, [18, 30]);
    tcfCaV2.setFieldValue(TcfCaV2Field.PUB_PURPOSES_EXPRESS_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV2Field.PUB_PURPOSES_IMPLIED_CONSENT, [
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
    tcfCaV2.setFieldValue(TcfCaV2Field.NUM_CUSTOM_PURPOSES, 3);
    tcfCaV2.setFieldValue(TcfCaV2Field.CUSTOM_PURPOSES_EXPRESS_CONSENT, [false, true, false]);
    tcfCaV2.setFieldValue(TcfCaV2Field.CUSTOM_PURPOSES_IMPLIED_CONSENT, [true, false, true]);

    tcfCaV2.setFieldValue(TcfCaV2Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfCaV2.setFieldValue(TcfCaV2Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));

    expect(tcfCaV2.encode()).to.eql("CPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgAMAAwADAAIACQAHg.fHHHA4444aoA");
  });

  it("should decode CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAAA", (): void => {
    let tcfCaV2 = new TcfCaV2("CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAAA");

    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CMP_ID)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CMP_VERSION)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.VENDOR_LIST_VERSION)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.USE_NON_STANDARD_STACKS)).to.eql(false);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.SPECIAL_FEATURE_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.VENDOR_EXPRESS_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.VENDOR_IMPLIED_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PUB_PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PUB_PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.NUM_CUSTOM_PURPOSES)).to.eql(0);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CUSTOM_PURPOSES_EXPRESS_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CUSTOM_PURPOSES_IMPLIED_CONSENT)).to.eql([]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CREATED)).to.eql(new Date("1970-01-01T00:00:00Z"));
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.LAST_UPDATED)).to.eql(new Date("1970-01-01T00:00:00Z"));

    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CONSENT_LANGUAGE)).to.eql("EN");
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.SEGMENT_TYPE)).to.eql(3);
  });

  it("should decode CPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgAMAAwADAAIACQAHg.fHHHA4444aoA.fHHHA4444ao", (): void => {
    let tcfCaV2 = new TcfCaV2("CPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgAMAAwADAAIACQAHg.fHHHA4444aoA.fHHHA4444ao");

    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CMP_ID)).to.eql(50);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CMP_VERSION)).to.eql(2);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.VENDOR_LIST_VERSION)).to.eql(413);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.USE_NON_STANDARD_STACKS)).to.eql(true);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.SPECIAL_FEATURE_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.VENDOR_EXPRESS_CONSENT)).to.eql([12, 24, 48]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.VENDOR_IMPLIED_CONSENT)).to.eql([18, 30]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PUB_PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.PUB_PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.NUM_CUSTOM_PURPOSES)).to.eql(3);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CUSTOM_PURPOSES_EXPRESS_CONSENT)).to.eql([false, true, false]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CUSTOM_PURPOSES_IMPLIED_CONSENT)).to.eql([true, false, true]);
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CREATED)).to.eql(new Date("2022-01-01T00:00:00Z"));
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.LAST_UPDATED)).to.eql(new Date("2022-01-01T00:00:00Z"));

    expect(tcfCaV2.getFieldValue(TcfCaV2Field.CONSENT_LANGUAGE)).to.eql("EN");
    expect(tcfCaV2.getFieldValue(TcfCaV2Field.SEGMENT_TYPE)).to.eql(3);
  });
});
