import { expect } from "chai";
import { TcfEuV2 } from "../../../src/encoder/section/TcfEuV2";

describe("manifest.section.TcfEuV2", (): void => {
  it("encode defaults", (): void => {
    let tcfEuV2 = new TcfEuV2();
    expect(tcfEuV2.encode()).to.eql("CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA");
  });

  it("encode with service specific", (): void => {
    let tcfEuV2 = new TcfEuV2();
    tcfEuV2.setFieldValue("IsServiceSpecific", true);
    tcfEuV2.setFieldValue("Created", new Date("2022-01-01T00:00:00Z"));
    tcfEuV2.setFieldValue("LastUpdated", new Date("2022-01-01T00:00:00Z"));
    expect(tcfEuV2.encode()).to.eql("CPSG_8APSG_8AAAAAAENAACgAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA");
  });

  it("decode defaults", (): void => {
    let tcfEuV2 = new TcfEuV2("CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA");
    expect(tcfEuV2.getFieldValue("Version")).to.eql(2);
    expect(tcfEuV2.getFieldValue("Created")).to.eql(new Date("1970-01-01T00:00:00Z"));
    expect(tcfEuV2.getFieldValue("LastUpdated")).to.eql(new Date("1970-01-01T00:00:00Z"));
    expect(tcfEuV2.getFieldValue("CmpId")).to.eql(0);
    expect(tcfEuV2.getFieldValue("CmpVersion")).to.eql(0);
    expect(tcfEuV2.getFieldValue("ConsentScreen")).to.eql(0);
    expect(tcfEuV2.getFieldValue("ConsentLanguage")).to.eql("EN");
    expect(tcfEuV2.getFieldValue("VendorListVersion")).to.eql(0);
    expect(tcfEuV2.getFieldValue("PolicyVersion")).to.eql(2);
    expect(tcfEuV2.getFieldValue("IsServiceSpecific")).to.eql(false);
    expect(tcfEuV2.getFieldValue("UseNonStandardStacks")).to.eql(false);
    expect(tcfEuV2.getFieldValue("SpecialFeatureOptins")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeConsents")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeLegitimateInterests")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeOneTreatment")).to.eql(false);
    expect(tcfEuV2.getFieldValue("PublisherCountryCode")).to.eql("AA");
    expect(tcfEuV2.getFieldValue("VendorConsents")).to.eql([]);
    expect(tcfEuV2.getFieldValue("VendorLegitimateInterests")).to.eql([]);
    expect(tcfEuV2.getFieldValue("PublisherRestrictions")).to.eql([]);
    expect(tcfEuV2.getFieldValue("PublisherPurposesSegmentType")).to.eql(3);
    expect(tcfEuV2.getFieldValue("PublisherConsents")).to.eql([]);
    expect(tcfEuV2.getFieldValue("PublisherLegitimateInterests")).to.eql([]);
    expect(tcfEuV2.getFieldValue("NumCustomPurposes")).to.eql(0);
    expect(tcfEuV2.getFieldValue("PublisherCustomConsents")).to.eql([]);
    expect(tcfEuV2.getFieldValue("PublisherCustomLegitimateInterests")).to.eql([]);
    expect(tcfEuV2.getFieldValue("VendorsAllowedSegmentType")).to.eql(2);
    expect(tcfEuV2.getFieldValue("VendorsAllowed")).to.eql([]);
    expect(tcfEuV2.getFieldValue("VendorsDisclosedSegmentType")).to.eql(1);
    expect(tcfEuV2.getFieldValue("VendorsDisclosed")).to.eql([]);
  });

  it("decode service specific", (): void => {
    let tcfEuV2 = new TcfEuV2("CPSG_8APSG_8AAAAAAENAACgAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA");
    expect(tcfEuV2.getFieldValue("Version")).to.eql(2);
    expect(tcfEuV2.getFieldValue("Created")).to.eql(new Date("2022-01-01T00:00:00Z"));
    expect(tcfEuV2.getFieldValue("LastUpdated")).to.eql(new Date("2022-01-01T00:00:00Z"));
    expect(tcfEuV2.getFieldValue("CmpId")).to.eql(0);
    expect(tcfEuV2.getFieldValue("CmpVersion")).to.eql(0);
    expect(tcfEuV2.getFieldValue("ConsentScreen")).to.eql(0);
    expect(tcfEuV2.getFieldValue("ConsentLanguage")).to.eql("EN");
    expect(tcfEuV2.getFieldValue("VendorListVersion")).to.eql(0);
    expect(tcfEuV2.getFieldValue("PolicyVersion")).to.eql(2);
    expect(tcfEuV2.getFieldValue("IsServiceSpecific")).to.eql(true);
    expect(tcfEuV2.getFieldValue("UseNonStandardStacks")).to.eql(false);
    expect(tcfEuV2.getFieldValue("SpecialFeatureOptins")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeConsents")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeLegitimateInterests")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeOneTreatment")).to.eql(false);
    expect(tcfEuV2.getFieldValue("PublisherCountryCode")).to.eql("AA");
    expect(tcfEuV2.getFieldValue("VendorConsents")).to.eql([]);
    expect(tcfEuV2.getFieldValue("VendorLegitimateInterests")).to.eql([]);
    expect(tcfEuV2.getFieldValue("PublisherRestrictions")).to.eql([]);
    expect(tcfEuV2.getFieldValue("PublisherPurposesSegmentType")).to.eql(3);
    expect(tcfEuV2.getFieldValue("PublisherConsents")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PublisherLegitimateInterests")).to.eql([
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
    expect(tcfEuV2.getFieldValue("NumCustomPurposes")).to.eql(0);
    expect(tcfEuV2.getFieldValue("PublisherCustomConsents")).to.eql([]);
    expect(tcfEuV2.getFieldValue("PublisherCustomLegitimateInterests")).to.eql([]);
    expect(tcfEuV2.getFieldValue("VendorsAllowedSegmentType")).to.eql(2);
    expect(tcfEuV2.getFieldValue("VendorsAllowed")).to.eql([]);
    expect(tcfEuV2.getFieldValue("VendorsDisclosedSegmentType")).to.eql(1);
    expect(tcfEuV2.getFieldValue("VendorsDisclosed")).to.eql([]);
  });

  it("decode", (): void => {
    let tcfEuV2 = new TcfEuV2(
      "CPcqBNJPcqBNJNwAAAENAwCAAAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAA.QGLtV_T9fb2vj-_Z99_tkeYwf95y3p-wzhheMs-8NyZeH_B4Wv2MyvBX4JiQKGRgksjLBAQdtHGlcTQgBwIlViTLMYk2MjzNKJrJEilsbO2dYGD9Pn8HT3ZCY70-vv__7v3ff_3g.IGLtV_T9fb2vj-_Z99_tkeYwf95y3p-wzhheMs-8NyZeH_B4Wv2MyvBX4JiQKGRgksjLBAQdtHGlcTQgBwIlViTLMYk2MjzNKJrJEilsbO2dYGD9Pn8HT3ZCY70-vv__7v3ff_3g"
    );

    expect(tcfEuV2.getFieldValue("Version")).to.eql(2);
    expect(tcfEuV2.getFieldValue("CmpId")).to.eql(880);
    expect(tcfEuV2.getFieldValue("CmpVersion")).to.eql(0);
    expect(tcfEuV2.getFieldValue("ConsentScreen")).to.eql(0);
    expect(tcfEuV2.getFieldValue("ConsentLanguage")).to.eql("EN");
    expect(tcfEuV2.getFieldValue("VendorListVersion")).to.eql(48);
    expect(tcfEuV2.getFieldValue("PolicyVersion")).to.eql(2);
    expect(tcfEuV2.getFieldValue("IsServiceSpecific")).to.eql(false);
    expect(tcfEuV2.getFieldValue("UseNonStandardStacks")).to.eql(false);
    expect(tcfEuV2.getFieldValue("PurposeOneTreatment")).to.eql(false);
    expect(tcfEuV2.getFieldValue("PublisherCountryCode")).to.eql("AA");

    expect(tcfEuV2.getFieldValue("PublisherPurposesSegmentType")).to.eql(3);

    expect(tcfEuV2.getFieldValue("VendorsAllowedSegmentType")).to.eql(2);
    let vendorsAllowed = tcfEuV2.getFieldValue("VendorsAllowed");
    expect(vendorsAllowed.length).to.eql(434);
    expect(vendorsAllowed[0]).to.eql(1);
    expect(vendorsAllowed[1]).to.eql(2);
    expect(vendorsAllowed[2]).to.eql(4);
    expect(vendorsAllowed[3]).to.eql(6);
    expect(vendorsAllowed[4]).to.eql(8);
    expect(vendorsAllowed[5]).to.eql(10);
    expect(vendorsAllowed[6]).to.eql(11);
    expect(vendorsAllowed[7]).to.eql(12);
    expect(vendorsAllowed[8]).to.eql(13);
    expect(vendorsAllowed[9]).to.eql(14);
    expect(vendorsAllowed[vendorsAllowed.length - 9]).to.eql(782);
    expect(vendorsAllowed[vendorsAllowed.length - 8]).to.eql(783);
    expect(vendorsAllowed[vendorsAllowed.length - 7]).to.eql(784);
    expect(vendorsAllowed[vendorsAllowed.length - 6]).to.eql(785);
    expect(vendorsAllowed[vendorsAllowed.length - 5]).to.eql(786);
    expect(vendorsAllowed[vendorsAllowed.length - 4]).to.eql(788);
    expect(vendorsAllowed[vendorsAllowed.length - 3]).to.eql(789);
    expect(vendorsAllowed[vendorsAllowed.length - 2]).to.eql(790);
    expect(vendorsAllowed[vendorsAllowed.length - 1]).to.eql(791);

    expect(tcfEuV2.getFieldValue("VendorsDisclosedSegmentType")).to.eql(1);
    let vendorsDisclosed = tcfEuV2.getFieldValue("VendorsDisclosed");
    expect(vendorsDisclosed.length).to.eql(434);
    expect(vendorsDisclosed[0]).to.eql(1);
    expect(vendorsDisclosed[1]).to.eql(2);
    expect(vendorsDisclosed[2]).to.eql(4);
    expect(vendorsDisclosed[3]).to.eql(6);
    expect(vendorsDisclosed[4]).to.eql(8);
    expect(vendorsDisclosed[5]).to.eql(10);
    expect(vendorsDisclosed[6]).to.eql(11);
    expect(vendorsDisclosed[7]).to.eql(12);
    expect(vendorsDisclosed[8]).to.eql(13);
    expect(vendorsDisclosed[9]).to.eql(14);
    expect(vendorsDisclosed[vendorsDisclosed.length - 9]).to.eql(782);
    expect(vendorsDisclosed[vendorsDisclosed.length - 8]).to.eql(783);
    expect(vendorsDisclosed[vendorsDisclosed.length - 7]).to.eql(784);
    expect(vendorsDisclosed[vendorsDisclosed.length - 6]).to.eql(785);
    expect(vendorsDisclosed[vendorsDisclosed.length - 5]).to.eql(786);
    expect(vendorsDisclosed[vendorsDisclosed.length - 4]).to.eql(788);
    expect(vendorsDisclosed[vendorsDisclosed.length - 3]).to.eql(789);
    expect(vendorsDisclosed[vendorsDisclosed.length - 2]).to.eql(790);
    expect(vendorsDisclosed[vendorsDisclosed.length - 1]).to.eql(791);
  });
});
