import { GppModel } from "../src/encoder/GppModel";
import { expect } from "chai";
import { HeaderV1Field } from "../src/encoder/field/HeaderV1Field";

let utcDateTime = new Date("2022-01-01T00:00:00Z");

describe("manifest.GppModel", (): void => {
  it("should encode empty sections to only a header", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBAA");

    expect(gppModel.getSectionIds()).to.eql([]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);
  });

  it("should default all sections", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("uspnatv1")).to.eql(false);
    expect(gppModel.hasSection("uspcav1")).to.eql(false);
    expect(gppModel.hasSection("uspvav1")).to.eql(false);
    expect(gppModel.hasSection("uspcov1")).to.eql(false);
    expect(gppModel.hasSection("usputv1")).to.eql(false);
    expect(gppModel.hasSection("uspctv1")).to.eql(false);

    gppModel.setFieldValue("tcfeuv2", "Version", 2);
    gppModel.setFieldValue("tcfeuv2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfeuv2", "LastUpdated", utcDateTime);
    gppModel.setFieldValue("tcfcav2", "Version", 2);
    gppModel.setFieldValue("tcfcav2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfcav2", "LastUpdated", utcDateTime);
    gppModel.setFieldValue("uspv1", "Version", 1);
    gppModel.setFieldValue("uspnatv1", "Version", 1);
    gppModel.setFieldValue("uspcav1", "Version", 1);
    gppModel.setFieldValue("uspvav1", "Version", 1);
    gppModel.setFieldValue("uspcov1", "Version", 1);
    gppModel.setFieldValue("usputv1", "Version", 1);
    gppModel.setFieldValue("uspctv1", "Version", 1);

    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(true);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("uspnatv1")).to.eql(true);
    expect(gppModel.hasSection("uspcav1")).to.eql(true);
    expect(gppModel.hasSection("uspvav1")).to.eql(true);
    expect(gppModel.hasSection("uspcov1")).to.eql(true);
    expect(gppModel.hasSection("usputv1")).to.eql(true);
    expect(gppModel.hasSection("uspctv1")).to.eql(true);

    let gppString = gppModel.encode();
    expect(gppString).to.eql(
      "DBACOaw~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAA.YAAAAAAAAAA~1---~BAAAAAAAAAA.QA~BAAAAAAA.QA~BAAAAAA~BAAAAAA.QA~BAAAAAAA~BAAAAAAA.QA"
    );
  });

  it("should encode uspv1 section", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    gppModel.setFieldValue("uspv1", "Notice", "Y");
    gppModel.setFieldValue("uspv1", "OptOutSale", "N");
    gppModel.setFieldValue("uspv1", "LspaCovered", "N");

    expect(gppModel.getSectionIds()).to.eql([6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

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
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

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
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBABMA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA");

    expect(gppString.split("~").length).to.eql(2);

    expect(gppModel.getSectionIds()).to.eql([2]);
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);
  });

  it("should encode uspv1 and tcfeuv2 sections", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

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
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    gppModel.setFieldValue("uspv1", "Notice", "Y");
    gppModel.setFieldValue("uspv1", "OptOutSale", "N");
    gppModel.setFieldValue("uspv1", "LspaCovered", "N");

    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    let gppString = gppModel.encode();
    expect(gppString).to.eql("DBACNYA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~1YNN");

    expect(gppString.split("~").length).to.eql(3);

    expect(gppModel.getSectionIds()).to.eql([2, 6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);
  });

  it("should encode uspv1 and tcfeuv2 and tcfcav2 sections", (): void => {
    let gppModel = new GppModel();
    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

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
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    gppModel.setFieldValue("uspv1", "Notice", "Y");
    gppModel.setFieldValue("uspv1", "OptOutSale", "N");
    gppModel.setFieldValue("uspv1", "LspaCovered", "N");

    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    expect(gppModel.getSectionIds()).to.eql([2, 6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

    gppModel.setFieldValue("tcfcav2", "CmpId", 880);
    gppModel.setFieldValue("tcfcav2", "CmpVersion", 0);
    gppModel.setFieldValue("tcfcav2", "ConsentScreen", 0);
    gppModel.setFieldValue("tcfcav2", "ConsentLanguage", "EN");
    gppModel.setFieldValue("tcfcav2", "VendorListVersion", 48);
    gppModel.setFieldValue("tcfcav2", "TcfPolicyVersion", 2);
    gppModel.setFieldValue("tcfcav2", "UseNonStandardStacks", false);
    gppModel.setFieldValue("tcfcav2", "Created", utcDateTime);
    gppModel.setFieldValue("tcfcav2", "LastUpdated", utcDateTime);

    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(true);

    let gppString = gppModel.encode();
    expect(gppString).to.eql(
      "DBACOeA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAA.YAAAAAAAAAA~1YNN"
    );

    expect(gppString.split("~").length).to.eql(4);
  });

  it("should decode header only", (): void => {
    let gppString = "DBAA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.hasSection("uspv1")).to.eql(false);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);
  });

  it("should decode defaults from all sections", (): void => {
    let gppString =
      "DBACOaw~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAA.YAAAAAAAAAA~1---~BAAAAAAAAAA.QA~BAAAAAAA.QA~BAAAAAA~BAAAAAA.QA~BAAAAAAA~BAAAAAAA.QA";
    let gppModel = new GppModel(gppString);

    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(true);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("uspnatv1")).to.eql(true);
    expect(gppModel.hasSection("uspcav1")).to.eql(true);
    expect(gppModel.hasSection("uspvav1")).to.eql(true);
    expect(gppModel.hasSection("uspcov1")).to.eql(true);
    expect(gppModel.hasSection("usputv1")).to.eql(true);
    expect(gppModel.hasSection("uspctv1")).to.eql(true);
  });

  it("should decode uspv1 section", (): void => {
    let gppString = "DBABTA~1YNN";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getSectionIds()).to.eql([6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(false);
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

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
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

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
    expect(gppModel.hasSection("tcfcav2")).to.eql(false);

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

  it("should decode uspv1 and tcfeuv2 and tcfcav2 sections", (): void => {
    let gppString =
      "DBACOeA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA~CPSG_8APSG_8ANwAAAENAwCAAAAAAAAAAAAAAA.YAAAAAAAAAA~1YNN";
    let gppModel = new GppModel(gppString);

    expect(gppModel.getSectionIds()).to.eql([2, 5, 6]);
    expect(gppModel.hasSection("uspv1")).to.eql(true);
    expect(gppModel.hasSection("tcfeuv2")).to.eql(true);
    expect(gppModel.hasSection("tcfcav2")).to.eql(true);

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

    expect(gppModel.getFieldValue("tcfcav2", "Version")).to.eql(2);
    expect(gppModel.getFieldValue("tcfcav2", "CmpId")).to.eql(880);
    expect(gppModel.getFieldValue("tcfcav2", "CmpVersion")).to.eql(0);
    expect(gppModel.getFieldValue("tcfcav2", "ConsentScreen")).to.eql(0);
    expect(gppModel.getFieldValue("tcfcav2", "ConsentLanguage")).to.eql("EN");
    expect(gppModel.getFieldValue("tcfcav2", "VendorListVersion")).to.eql(48);
    expect(gppModel.getFieldValue("tcfcav2", "TcfPolicyVersion")).to.eql(2);
    expect(gppModel.getFieldValue("tcfcav2", "UseNonStandardStacks")).to.eql(false);
    expect(gppModel.getFieldValue("tcfcav2", "Created")).to.eql(utcDateTime);
    expect(gppModel.getFieldValue("tcfcav2", "LastUpdated")).to.eql(utcDateTime);
  });
});
