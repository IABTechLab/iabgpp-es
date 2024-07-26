import { expect } from "chai";
import { TcfEuV2 } from "../../../src/encoder/section/TcfEuV2";
import { TcfEuV2Field } from "../../../src/encoder/field/TcfEuV2Field";

describe("manifest.section.TcfEuV2", (): void => {
  it("encode defaults", (): void => {
    let tcfEuV2 = new TcfEuV2();
    tcfEuV2.setFieldValue(TcfEuV2Field.CREATED, new Date("2022-01-01T00:00:00Z"));
    tcfEuV2.setFieldValue(TcfEuV2Field.LAST_UPDATED, new Date("2022-01-01T00:00:00Z"));
    expect(tcfEuV2.encode()).to.eql("CPSG_8APSG_8AAAAAAENAACAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA");
  });

  it("encode with service specific", (): void => {
    let tcfEuV2 = new TcfEuV2();
    tcfEuV2.setFieldValue("IsServiceSpecific", true);
    tcfEuV2.setFieldValue("Created", new Date("2022-01-01T00:00:00Z"));
    tcfEuV2.setFieldValue("LastUpdated", new Date("2022-01-01T00:00:00Z"));
    expect(tcfEuV2.encode()).to.eql("CPSG_8APSG_8AAAAAAENAACgAAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAAA");
  });

  it("decode defaults", (): void => {
    let tcfEuV2 = new TcfEuV2("CAAAAAAAAAAAAAAAAAENAACAAAAAAAAAAAAAAAAAAAAA.QAAA.IAAA");
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

  it("decode service specific", (): void => {
    let tcfEuV2 = new TcfEuV2("CPSG_8APSG_8AAAAAAENAACgAAAAAAAAAAAAAAAAAAAA.YAAAAAAAAAAA");
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

  it("decode 2", (): void => {
    let tcfEuV2 = new TcfEuV2(
      "CPi8wgAPi8wgAAOACBENCuCoAP_AAEfAACiQJHNd_H__bX9n-f7_6ft0eY1f9_r37uQzDhfNk-8F3L_W_LwX_2E7NF36tq4KmR4ku1LBIUNtHMnUDUmxaokVrzHsak2cpzNKJ_BkknsZe2dYGF9vm5tj-QKZ7_5_d3f52T_9_9v-39z33913v3d93-_13LjdV5_9H_v9fR_b8_Kf9_5-_4v8_____3_e______8AEEggCTDVuIAuxLHAm0DCKBECMKwkKoFABBQDC0QGADg4KdlYBPrCBAAgFAEYEQIcAUYEAgAAAgCQiACQIsEAAAIgEAAIAEQiEABAwCCgAsDAIAAQDQMUQoABAkIMiAiKUwICIEggJbKhBKC6Q0wgCrLACgkRsFAAiAAAUgACAsHAMESAlYsECTFG-QAjBCgFEqFaAGGgAwABBI4RABgACCRwqADAAEEjgA"
    );

    expect(tcfEuV2.getFieldValue("Version")).to.eql(2);
    expect(tcfEuV2.getFieldValue("CmpId")).to.eql(14);
    expect(tcfEuV2.getFieldValue("CmpVersion")).to.eql(2);
    expect(tcfEuV2.getFieldValue("ConsentScreen")).to.eql(1);
    expect(tcfEuV2.getFieldValue("ConsentLanguage")).to.eql("EN");
    expect(tcfEuV2.getFieldValue("VendorListVersion")).to.eql(174);
    expect(tcfEuV2.getFieldValue("PolicyVersion")).to.eql(2);
    expect(tcfEuV2.getFieldValue("IsServiceSpecific")).to.eql(true);
    expect(tcfEuV2.getFieldValue("UseNonStandardStacks")).to.eql(false);

    expect(tcfEuV2.getFieldValue("SpecialFeatureOptins")).to.eql([
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
    ]);

    expect(tcfEuV2.getFieldValue("PurposeConsents")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeLegitimateInterests")).to.eql([
      false,
      true,
      false,
      false,
      false,
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

    expect(tcfEuV2.getFieldValue("PurposeOneTreatment")).to.eql(false);
    expect(tcfEuV2.getFieldValue("PublisherCountryCode")).to.eql("US");

    expect(tcfEuV2.getFieldValue("VendorConsents").length).to.eql(772);
    expect(tcfEuV2.getFieldValue("VendorLegitimateInterests").length).to.eql(280);
  });

  it("decode 3", (): void => {
    let tcfEuV2 = new TcfEuV2(
      "CPgA5EAPgA5EAAOACBENCuCoAP_AAEfAACiQI0Nd_H__bX9n-f7_6Pt0cY1f9_r3ruQzDhfFk-8F3L_W3LwX32E7NF36pq4KmR4ku1LBIQFtHMnUDUmxaokVrzHsak2cpyNKI7BkknsZe2dYGF9Pm5lD-QKZ7_5_d3f52T_9_9v-39z339V3v3d93-_12PjdV599H_v9fR_b8_Kf9_5-_4v8___4IQAAAAQQ_AJMNW4gC7EscCbQMIoAQIwrCQqAUAEFAMLRAYAODgpmVgEusIEACAUARgRAhxBRgQCAAACAJCIAJAiwQAIAiAQAAgARAIQAEDAIKACwMAgABANAxACgAECQgyICIpTAgIgSCAlsqEEoKpDTCAKssAKARGwUACIAABSAAICwcAwRICViwQJMUbwAw0AGAAIJHCIAMAAQSOFQAYAAgkcA"
    );

    expect(tcfEuV2.getFieldValue("Version")).to.eql(2);
    expect(tcfEuV2.getFieldValue("CmpId")).to.eql(14);
    expect(tcfEuV2.getFieldValue("CmpVersion")).to.eql(2);
    expect(tcfEuV2.getFieldValue("ConsentScreen")).to.eql(1);
    expect(tcfEuV2.getFieldValue("ConsentLanguage")).to.eql("EN");
    expect(tcfEuV2.getFieldValue("VendorListVersion")).to.eql(174);
    expect(tcfEuV2.getFieldValue("PolicyVersion")).to.eql(2);
    expect(tcfEuV2.getFieldValue("IsServiceSpecific")).to.eql(true);
    expect(tcfEuV2.getFieldValue("UseNonStandardStacks")).to.eql(false);

    expect(tcfEuV2.getFieldValue("SpecialFeatureOptins")).to.eql([
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
    ]);

    expect(tcfEuV2.getFieldValue("PurposeConsents")).to.eql([
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
    expect(tcfEuV2.getFieldValue("PurposeLegitimateInterests")).to.eql([
      false,
      true,
      false,
      false,
      false,
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

    expect(tcfEuV2.getFieldValue("PurposeOneTreatment")).to.eql(false);
    expect(tcfEuV2.getFieldValue("PublisherCountryCode")).to.eql("US");

    expect(tcfEuV2.getFieldValue("VendorConsents").length).to.eql(693);
    expect(tcfEuV2.getFieldValue("VendorLegitimateInterests").length).to.eql(254);
  });

  it("decode 4", (): void => {
    let tcfEuV2 = new TcfEuV2("COv_eg6Ov_eg6AOADBENAaCgAP_AAH_AACiQAVEUQQoAIQAqIoghAAQgAA.YAAAAAAAAAAAAAAAAAA");

    expect(tcfEuV2.getFieldValue("Version")).to.eql(2);
    expect(tcfEuV2.getFieldValue("CmpId")).to.eql(14);
    expect(tcfEuV2.getFieldValue("CmpVersion")).to.eql(3);
    expect(tcfEuV2.getFieldValue("ConsentScreen")).to.eql(1);
    expect(tcfEuV2.getFieldValue("ConsentLanguage")).to.eql("EN");
    expect(tcfEuV2.getFieldValue("VendorListVersion")).to.eql(26);
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
    expect(tcfEuV2.getFieldValue("PurposeLegitimateInterests")).to.eql([
      false,
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

    expect(tcfEuV2.getFieldValue("PurposeOneTreatment")).to.eql(false);
    expect(tcfEuV2.getFieldValue("PublisherCountryCode")).to.eql("US");

    expect(tcfEuV2.getFieldValue("VendorConsents")).to.eql([2, 6, 8, 12, 18, 23, 25, 37, 42]);
    expect(tcfEuV2.getFieldValue("VendorLegitimateInterests")).to.eql([2, 6, 8, 12, 18, 23, 37, 42]);
  });

  it("should throw Error on garbage 1", (): void => {
    expect(function () {
      new TcfEuV2("A").getFieldValue("PolicyVersion");
    }).to.throw("Unable to decode TcfEuV2CoreSegment 'A'");
  });

  it("should throw Error on garbage 2", (): void => {
    expect(function () {
      new TcfEuV2("z").getFieldValue("IsServiceSpecific");
    }).to.throw("Unable to decode TcfEuV2 segment 'z'");
  });
});
