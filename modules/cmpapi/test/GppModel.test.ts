import { GppModel } from "../src/encoder/GppModel";
import { expect } from "chai";
import { HeaderV1Field } from "../src/encoder/field/HeaderV1Field";
import { TcfCaV1Field } from "../src/encoder/field/TcfCaV1Field";
import { LazyDecodingError } from "../src/encoder/error/LazyDecodingError";

let utcDateTime = new Date("2022-01-01T00:00:00Z");

describe("manifest.GppModel", (): void => {
  it("should encode empty sections to only a header", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBAA");

    expect(gppModel.getSectionIds()).to.eql([]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);
  });

  it("should throw LazyDecodingError", (): void => {
    let gppModel = new GppModel("invalid gpp string");
    expect(function () {
      gppModel.getHeader();
    }).to.throw("Undecodable Base64URL string");
  });

  it("should default all sections", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("usnatv1")).to.eql(false);
    expect(gppModel.hasSection("uscav1")).to.eql(false);
    expect(gppModel.hasSection("usvav1")).to.eql(false);
    expect(gppModel.hasSection("uscov1")).to.eql(false);
    expect(gppModel.hasSection("usutv1")).to.eql(false);
    expect(gppModel.hasSection("usctv1")).to.eql(false);

    gppModel.setFieldValue("tcfeuv2", "Version", 2);
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);
    gppModel.setFieldValue("tcfcav1", "Version", 1);
    gppModel.setFieldValue("tcfcav1", "Created", utcDateTime);
    gppModel.setFieldValue("tcfcav1", "LastUpdated", utcDateTime);
    gppModel.setFieldValue("uspv1", "Version", 1);
    gppModel.setFieldValue("usnatv1", "Version", 1);
    gppModel.setFieldValue("uscav1", "Version", 1);
    gppModel.setFieldValue("usvav1", "Version", 1);
    gppModel.setFieldValue("uscov1", "Version", 1);
    gppModel.setFieldValue("usutv1", "Version", 1);
    gppModel.setFieldValue("usctv1", "Version", 1);

    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(true);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("usnatv1")).to.eql(true);
    expect(gppModel.hasSection("uscav1")).to.eql(true);
    expect(gppModel.hasSection("usvav1")).to.eql(true);
    expect(gppModel.hasSection("uscov1")).to.eql(true);
    expect(gppModel.hasSection("usutv1")).to.eql(true);
    expect(gppModel.hasSection("usctv1")).to.eql(true);

    let gppString = gppModel.encode();
    expect(gppString).to.eql(
      "DBACOaw~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~BPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAA.YAAAAAAAAAA~1---~BAAAAAAAAAA.QA~BAAAAAAA.QA~BAAAAAA~BAAAAAA.QA~BAAAAAAA~BAAAAAAA.QA"
    );
  });

  it("should encode uspv1 section", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    gppModel.setFieldValue("uspv1", "Notice", "Y");
    gppModel.setFieldValue("uspv1", "OptOutSale", "N");
    gppModel.setFieldValue("uspv1", "LspaCovered", "N");

    expect(gppModel.getSectionIds()).to.eql([6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBABTA~1YNN");

    expect(gppModel.getSectionIds()).to.eql([6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
  });

  it("should encode tcfeuv2 sections", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    gppModel.setFieldValue("tcfeuv2", "CmpId", 880);
    gppModel.setFieldValue("tcfeuv2", "CmpVersion", 0);
    gppModel.setFieldValue("tcfeuv2", "ConsentScreen", 0);
    gppModel.setFieldValue("tcfeuv2", "ConsentLanguage", "EN");
    gppModel.setFieldValue("tcfeuv2", "VendorListVersion", 48);
    gppModel.setFieldValue("tcfeuv2", "PolicyVersion", 2);
    gppModel.setFieldValue("tcfeuv2", "IsServiceSpecific", false);
    gppModel.setFieldValue("tcfeuv2", "UseNonStandardStacks", false);
    gppModel.setFieldValue("tcfeuv2", "PurposeOneTreatment", false);
    gppModel.setFieldValue("tcfeuv2", "PublisherCountryCode", "AA");
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);

    expect(gppModel.getSectionIds()).to.eql([2]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBABMA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA");

    expect(gppString.split("~").length).to.eql(2);

    expect(gppModel.getSectionIds()).to.eql([2]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);
  });

  it("should encode uspv1 and tcfeuv2 sections", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    gppModel.setFieldValue("tcfeuv2", "CmpId", 880);
    gppModel.setFieldValue("tcfeuv2", "CmpVersion", 0);
    gppModel.setFieldValue("tcfeuv2", "ConsentScreen", 0);
    gppModel.setFieldValue("tcfeuv2", "ConsentLanguage", "EN");
    gppModel.setFieldValue("tcfeuv2", "VendorListVersion", 48);
    gppModel.setFieldValue("tcfeuv2", "PolicyVersion", 2);
    gppModel.setFieldValue("tcfeuv2", "IsServiceSpecific", false);
    gppModel.setFieldValue("tcfeuv2", "UseNonStandardStacks", false);
    gppModel.setFieldValue("tcfeuv2", "PurposeOneTreatment", false);
    gppModel.setFieldValue("tcfeuv2", "PublisherCountryCode", "AA");
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);

    expect(gppModel.getSectionIds()).to.eql([2]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    gppModel.setFieldValue("uspv1", "Notice", "Y");
    gppModel.setFieldValue("uspv1", "OptOutSale", "N");
    gppModel.setFieldValue("uspv1", "LspaCovered", "N");

    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBACNYA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~1YNN");

    expect(gppString.split("~").length).to.eql(3);

    expect(gppModel.getSectionIds()).to.eql([2, 6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);
  });

  it("should encode uspv1 and tcfeuv2 and tcfcav1 sections", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    gppModel.setFieldValue("tcfeuv2", "CmpId", 880);
    gppModel.setFieldValue("tcfeuv2", "CmpVersion", 0);
    gppModel.setFieldValue("tcfeuv2", "ConsentScreen", 0);
    gppModel.setFieldValue("tcfeuv2", "ConsentLanguage", "EN");
    gppModel.setFieldValue("tcfeuv2", "VendorListVersion", 48);
    gppModel.setFieldValue("tcfeuv2", "PolicyVersion", 2);
    gppModel.setFieldValue("tcfeuv2", "IsServiceSpecific", false);
    gppModel.setFieldValue("tcfeuv2", "UseNonStandardStacks", false);
    gppModel.setFieldValue("tcfeuv2", "PurposeOneTreatment", false);
    gppModel.setFieldValue("tcfeuv2", "PublisherCountryCode", "AA");
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);

    expect(gppModel.getSectionIds()).to.eql([2]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    gppModel.setFieldValue("uspv1", "Notice", "Y");
    gppModel.setFieldValue("uspv1", "OptOutSale", "N");
    gppModel.setFieldValue("uspv1", "LspaCovered", "N");

    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    expect(gppModel.getSectionIds()).to.eql([2, 6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.CMP_ID, 50);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.CMP_VERSION, 2);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.VENDOR_LIST_VERSION, 413);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.USE_NON_STANDARD_STACKS, true);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT, [
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
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.PURPOSES_EXPRESS_CONSENT, [
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
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.PURPOSES_IMPLIED_CONSENT, [
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
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.VENDOR_EXPRESS_CONSENT, [12, 24, 48]);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.VENDOR_IMPLIED_CONSENT, [18, 30]);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT, [
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
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT, [
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
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.NUM_CUSTOM_PURPOSES, 3);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT, [false, true, false]);
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT, [true, false, true]);

    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    gppModel.setFieldValue("tcfcav1", TcfCaV1Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));

    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(true);

    let gppString = gppModel.encode();
    expect(gppString).to.eql(
      "DBACOeA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~BPSG_8APSG_8AAyACAENGdCgf_gfgAfgfgBgABABAAABAB4AACAC.fHHHA4444ao~1YNN"
    );

    expect(gppString.split("~").length).to.eql(4);
  });

  it("should decode header only", (): void => {
    let gppString = "DBAA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);
  });

  it("should decode defaults from all sections", (): void => {
    let gppString =
      "DBACOaw~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~BPSG_8APSG_8AAAAAAENAABAAAAAAAAAAAAAAAAA.YAAAAAAAAAA~1---~BAAAAAAAAAA.QA~BAAAAAAA.QA~BAAAAAA~BAAAAAA.QA~BAAAAAAA~BAAAAAAA.QA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(true);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("usnatv1")).to.eql(true);
    expect(gppModel.hasSection("uscav1")).to.eql(true);
    expect(gppModel.hasSection("usvav1")).to.eql(true);
    expect(gppModel.hasSection("uscov1")).to.eql(true);
    expect(gppModel.hasSection("usutv1")).to.eql(true);
    expect(gppModel.hasSection("usctv1")).to.eql(true);
  });

  it("should decode uspv1 section", (): void => {
    let gppString = "DBABTA~1YNN";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getSectionIds()).to.eql([6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    expect(gppModel.getFieldValue("uspv1", "Notice")).to.eql("Y");
    expect(gppModel.getFieldValue("uspv1", "OptOutSale")).to.eql("N");
    expect(gppModel.getFieldValue("uspv1", "LspaCovered")).to.eql("N");
  });

  it("should decode tcfeuv2 sections", (): void => {
    let gppString = "DBABMA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getSectionIds()).to.eql([2]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    expect(gppModel.getFieldValue("tcfeuv2", "Version")).to.eql(2);
    expect(gppModel.getFieldValue("tcfeuv2", "CmpId")).to.eql(880);
    expect(gppModel.getFieldValue("tcfeuv2", "CmpVersion")).to.eql(0);
    expect(gppModel.getFieldValue("tcfeuv2", "ConsentScreen")).to.eql(0);
    expect(gppModel.getFieldValue("tcfeuv2", "ConsentLanguage")).to.eql("EN");
    expect(gppModel.getFieldValue("tcfeuv2", "VendorListVersion")).to.eql(48);
    expect(gppModel.getFieldValue("tcfeuv2", "PolicyVersion")).to.eql(2);
    expect(gppModel.getFieldValue("tcfeuv2", "IsServiceSpecific")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "UseNonStandardStacks")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "PurposeOneTreatment")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "PublisherCountryCode")).to.eql("AA");
    expect(gppModel.getFieldValue("tcfeuv2", "Created")).to.eql(utcDateTime);
    expect(gppModel.getFieldValue("tcfeuv2", "LastUpdated")).to.eql(utcDateTime);
  });

  it("should decode uspv1 and tcfeuv2 sections", (): void => {
    let gppString = "DBACNYA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~1YNN";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getSectionIds()).to.eql([2, 6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(false);

    expect(gppModel.getFieldValue("uspv1", "Notice")).to.eql("Y");
    expect(gppModel.getFieldValue("uspv1", "OptOutSale")).to.eql("N");
    expect(gppModel.getFieldValue("uspv1", "LspaCovered")).to.eql("N");

    expect(gppModel.getFieldValue("tcfeuv2", "Version")).to.eql(2);
    expect(gppModel.getFieldValue("tcfeuv2", "CmpId")).to.eql(880);
    expect(gppModel.getFieldValue("tcfeuv2", "CmpVersion")).to.eql(0);
    expect(gppModel.getFieldValue("tcfeuv2", "ConsentScreen")).to.eql(0);
    expect(gppModel.getFieldValue("tcfeuv2", "ConsentLanguage")).to.eql("EN");
    expect(gppModel.getFieldValue("tcfeuv2", "VendorListVersion")).to.eql(48);
    expect(gppModel.getFieldValue("tcfeuv2", "PolicyVersion")).to.eql(2);
    expect(gppModel.getFieldValue("tcfeuv2", "IsServiceSpecific")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "UseNonStandardStacks")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "PurposeOneTreatment")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "PublisherCountryCode")).to.eql("AA");
    expect(gppModel.getFieldValue("tcfeuv2", "Created")).to.eql(utcDateTime);
    expect(gppModel.getFieldValue("tcfeuv2", "LastUpdated")).to.eql(utcDateTime);
  });

  it("should decode uspv1 and tcfeuv2 and tcfcav1 sections", (): void => {
    let gppString =
      "DBACOeA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~BPSG_8APSG_8AAyACAENGdBgf_gfgAfgfgBgABABAAABAB4AACAC.fHHHA4444ao~1YNN";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getSectionIds()).to.eql([2, 5, 6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav1")).to.eql(true);

    expect(gppModel.getFieldValue("uspv1", "Notice")).to.eql("Y");
    expect(gppModel.getFieldValue("uspv1", "OptOutSale")).to.eql("N");
    expect(gppModel.getFieldValue("uspv1", "LspaCovered")).to.eql("N");

    expect(gppModel.getFieldValue("tcfeuv2", "Version")).to.eql(2);
    expect(gppModel.getFieldValue("tcfeuv2", "CmpId")).to.eql(880);
    expect(gppModel.getFieldValue("tcfeuv2", "CmpVersion")).to.eql(0);
    expect(gppModel.getFieldValue("tcfeuv2", "ConsentScreen")).to.eql(0);
    expect(gppModel.getFieldValue("tcfeuv2", "ConsentLanguage")).to.eql("EN");
    expect(gppModel.getFieldValue("tcfeuv2", "VendorListVersion")).to.eql(48);
    expect(gppModel.getFieldValue("tcfeuv2", "PolicyVersion")).to.eql(2);
    expect(gppModel.getFieldValue("tcfeuv2", "IsServiceSpecific")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "UseNonStandardStacks")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "PurposeOneTreatment")).to.eql(false);
    expect(gppModel.getFieldValue("tcfeuv2", "PublisherCountryCode")).to.eql("AA");
    expect(gppModel.getFieldValue("tcfeuv2", "Created")).to.eql(utcDateTime);
    expect(gppModel.getFieldValue("tcfeuv2", "LastUpdated")).to.eql(utcDateTime);

    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.CMP_ID)).to.eql(50);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.CMP_VERSION)).to.eql(2);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.VENDOR_LIST_VERSION)).to.eql(413);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.USE_NON_STANDARD_STACKS)).to.eql(true);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.SPECIAL_FEATURE_EXPRESS_CONSENT)).to.eql([
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
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.VENDOR_EXPRESS_CONSENT)).to.eql([12, 24, 48]);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.VENDOR_IMPLIED_CONSENT)).to.eql([18, 30]);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.PUB_PURPOSES_EXPRESS_CONSENT)).to.eql([
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
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.PUB_PURPOSES_IMPLIED_CONSENT)).to.eql([
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
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.NUM_CUSTOM_PURPOSES)).to.eql(3);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.CUSTOM_PURPOSES_EXPRESS_CONSENT)).to.eql([
      false,
      true,
      false,
    ]);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.CUSTOM_PURPOSES_IMPLIED_CONSENT)).to.eql([true, false, true]);
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.CREATED)).to.eql(new Date("2022-01-01T00:00:00Z"));
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.LAST_UPDATED)).to.eql(new Date("2022-01-01T00:00:00Z"));

    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.CONSENT_LANGUAGE)).to.eql("EN");
    expect(gppModel.getFieldValue("tcfcav1", TcfCaV1Field.SEGMENT_TYPE)).to.eql(3);
  });

  it("should encode tcfeuv2 vendor consents [28]", (): void => {
    let gppModel = new GppModel();
    gppModel.setFieldValue("tcfeuv2", "VendorConsents", [28]);
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBABMA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAOAAAABAAAAA.QAAA.IAAA");
  });

  it("should encode tcfeuv2 vendor consents [29]", (): void => {
    let gppModel = new GppModel();
    gppModel.setFieldValue("tcfeuv2", "VendorConsents", [29]);
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBABMA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAOwAQAOgAAAA.QAAA.IAAA");
  });

  it("should encode tcfeuv2 vendor consents [1, 173, 722]", (): void => {
    let gppModel = new GppModel();
    gppModel.setFieldValue("tcfeuv2", "VendorConsents", [1, 173, 722]);
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBABMA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAFpQAwAAgCtAWkAAAAAAA.QAAA.IAAA");
  });

  it("should decode tcfeuv2 vendor consents [28]", (): void => {
    let gppString = "DBABMA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAOAAAABAAAAA.QAAA.IAAA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getFieldValue("tcfeuv2", "VendorConsents")).to.eql([28]);
  });

  it("should decode tcfeuv2 vendor consents [29]", (): void => {
    let gppString = "DBABMA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAOwAQAOgAAAA.QAAA.IAAA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getFieldValue("tcfeuv2", "VendorConsents")).to.eql([29]);
  });

  it("should decode tcfeuv2 vendor consents [1, 173, 722]", (): void => {
    let gppString = "DBABMA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAFpQAwAAgCtAWkAAAAAAA.QAAA.IAAA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getFieldValue("tcfeuv2", "VendorConsents")).to.eql([1, 173, 722]);
  });

  it("should decode and encode consistently", (): void => {
    let fromObjectModel = new GppModel();
    fromObjectModel.setFieldValue("tcfeuv2", "PurposeConsents", [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
    ]);
    fromObjectModel.setFieldValue("tcfeuv2", "VendorConsents", [32, 128, 81, 210, 755, 21, 173, 238]);

    expect(fromObjectModel.encode()).to.eql(fromObjectModel.encode());

    let decodedModel = new GppModel(fromObjectModel.encode());

    expect(decodedModel.getFieldValue("tcfeuv2", "PurposeConsents")).to.eql([
      true,
      true,
      true,
      true,
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
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);

    expect(decodedModel.getFieldValue("tcfeuv2", "VendorConsents")).to.eql([21, 32, 81, 128, 173, 210, 238, 755]);
  });

  it("should let us decode a section string, and encode correctly", (): void => {
    const gppModel = new GppModel();

    gppModel.decodeSectionById(6, "1YNN")

    const gppString = gppModel.encode();

    expect(gppString).to.eql("DBABTA~1YNN")
  })
});
