import { expect } from "chai";
import * as sinon from "sinon";
import { GVL, GVLUrlConfig } from "../src/GVL";
import { XMLHttpTestTools } from "./util/XMLHttpTestTools";
import { ConsentLanguages } from "../src/gvl/gvlmodel/ConsentLanguages";

import vendorlistJsonV2_2 from "./vendorlist/v2.2/vendor-list.json" assert { type: "json" };
import translationJson from "./vendorlist/v2/purposes-fr.json" assert { type: "json" };

describe("GVL", (): void => {
  const assertPopulatedV2_2 = (gvl: GVL): void => {
    expect(gvl.gvlSpecificationVersion, "gvl.gvlSpecificationVersion").to.deep.equal(
      vendorlistJsonV2_2.gvlSpecificationVersion
    );
    expect(gvl.vendorListVersion, "gvl.vendorListVersion").to.deep.equal(vendorlistJsonV2_2.vendorListVersion);
    expect(gvl.tcfPolicyVersion, "gvl.tcfPolicyVersion").to.deep.equal(vendorlistJsonV2_2.tcfPolicyVersion);
    expect(gvl.purposes, "gvl.purposes").to.deep.equal(vendorlistJsonV2_2.purposes);
    expect(gvl.specialPurposes, "gvl.specialPurposes").to.deep.equal(vendorlistJsonV2_2.specialPurposes);
    expect(gvl.features, "gvl.features").to.deep.equal(vendorlistJsonV2_2.features);
    expect(gvl.specialFeatures, "gvl.specialFeatures").to.deep.equal(vendorlistJsonV2_2.specialFeatures);

    for (let [vendorId, vendor] of Object.entries(vendorlistJsonV2_2.vendors)) {
      if (!vendor["deletedDate"]) {
        expect(gvl.vendors[vendorId]).to.deep.equal(vendor);
      } else {
        expect(gvl.vendors[vendorId] === undefined).to.equal(true);
      }
    }
  };

  const assertTranslated = (gvl: GVL, lang: string): void => {
    expect(gvl.purposes, "gvl.purposes").to.deep.equal(translationJson.purposes);
    expect(gvl.specialPurposes, "gvl.specialPurposes").to.deep.equal(translationJson.specialPurposes);
    expect(gvl.features, "gvl.features").to.deep.equal(translationJson.features);
    expect(gvl.specialFeatures, "gvl.specialFeatures").to.deep.equal(translationJson.specialFeatures);
    expect(gvl.stacks, "gvl.stacks").to.deep.equal(translationJson.stacks);
    expect(gvl.purposes, "gvl.purposes").to.not.deep.equal(vendorlistJsonV2_2.purposes);
    expect(gvl.specialPurposes, "gvl.specialPurposes").to.not.deep.equal(vendorlistJsonV2_2.specialPurposes);
    expect(gvl.features, "gvl.features").to.not.deep.equal(vendorlistJsonV2_2.features);
    expect(gvl.specialFeatures, "gvl.specialFeatures").to.not.deep.equal(vendorlistJsonV2_2.specialFeatures);
    expect(gvl.language, "gvl.language").to.equal(lang.toUpperCase());
  };

  beforeEach((): void => {
    XMLHttpTestTools.beforeEach();
  });

  it("should propogate all values with passed in json V2.2", (): void => {
    const gvl: GVL = GVL.fromVendorList(vendorlistJsonV2_2);

    assertPopulatedV2_2(gvl);
  });

  it("should get latest GVL if nothing is passed to the constructor V2.2", async (): Promise<void> => {
    let config = new GVLUrlConfig();
    config.baseUrl = "http://sweetcmp.com/";
    let promise = GVL.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    expect(req.method).to.equal("GET");

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJsonV2_2));

    let gvl = await promise;

    assertPopulatedV2_2(gvl);
  });

  it('should get latest GVL if "LATEST" is passed to the constructor V2.2', async (): Promise<void> => {
    let config = new GVLUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    config.version = "LATEST";
    let promise = GVL.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal("GET");
    expect(req.url).to.equal(`http://sweetcmp.com/vendor-list.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJsonV2_2));

    let gvl = await promise;

    assertPopulatedV2_2(gvl);
  });

  it("should get versioned GVL if version number is passed V2.2", async (): Promise<void> => {
    let version = 22;
    let config = new GVLUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    config.version = version;
    let promise = GVL.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal("GET");
    expect(req.url).to.equal(`http://sweetcmp.com/archives/vendor-list-v${version}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJsonV2_2));

    let gvl = await promise;

    assertPopulatedV2_2(gvl);
  });

  it("should get versioned GVL if version number as string is passed V2.2", async (): Promise<void> => {
    let version = 23;
    let config = new GVLUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    config.version = version;
    let promise = GVL.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal("GET");
    expect(req.url).to.equal(`http://sweetcmp.com/archives/vendor-list-v${version}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJsonV2_2));

    let gvl = await promise;

    assertPopulatedV2_2(gvl);
  });

  it("should not request language V2.2", async (): Promise<void> => {
    let config = new GVLUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    let promise = GVL.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    const req1: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    expect(req1.method).to.equal("GET");
    req1.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJsonV2_2));

    let gvl = await promise;

    assertPopulatedV2_2(gvl);

    gvl.changeLanguage("EN");

    expect(XMLHttpTestTools.requests.length).to.equal(1);
  });

  it("should request language V2.2", async (): Promise<void> => {
    let config = new GVLUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    let promise = GVL.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    const req1: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    expect(req1.method).to.equal("GET");
    req1.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJsonV2_2));

    let gvl = await promise;

    assertPopulatedV2_2(gvl);

    gvl.changeLanguage("FR");

    expect(XMLHttpTestTools.requests.length).to.equal(2);
    const req2: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[1];
    expect(req2.method).to.equal("GET");
    req2.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));
  });

  it("should narrow a group of vendors when narrowVendorsTo is called with list of ids V2.2", (): void => {
    const gvl: GVL = GVL.fromVendorList(vendorlistJsonV2_2);
    const onlyVendorId: string = Object.keys(vendorlistJsonV2_2.vendors)[0];

    gvl.narrowVendorsTo([parseInt(onlyVendorId, 10)]);
    expect(gvl.vendors[onlyVendorId]).to.deep.equal(vendorlistJsonV2_2.vendors[onlyVendorId]);
    expect(Object.keys(gvl.vendors).length).to.equal(1);
    expect(gvl.vendors[Object.keys(vendorlistJsonV2_2.vendors)[1]]).to.be.undefined;
  });

  it("should remove a vendor if it has a deletedDate V2.2", (): void => {
    const vendorId = "1";

    let gvl = GVL.fromVendorList(vendorlistJsonV2_2);

    const json = gvl.getJson();
    json.vendors[vendorId] = {
      id: +vendorId,
      name: "Fake Vendor with ID 1",
      purposes: [1, 2, 3, 4],
      legIntPurposes: [7, 9, 10],
      flexiblePurposes: [2],
      deletedDate: "2020-01-28T00:00:00Z",
      specialPurposes: [],
      features: [2],
      specialFeatures: [],
      policyUrl: "http://www.fakevendor.com/privacy-policy/",
      usesCookies: true,
      cookieMaxAgeSeconds: 1000,
      cookieRefresh: true,
      usesNonCookieAccess: false,
    };

    expect(json.vendors[vendorId], `json.vendors["${vendorId}"]`).not.to.be.undefined;
    const gvl2: GVL = GVL.fromVendorList(json);
    expect(gvl2.vendors[vendorId], `gvl2.vendors["${vendorId}"]`).to.be.undefined;
  });

  it("number of language translations should match", (): void => {
    const langSet =  new ConsentLanguages(); 
    expect(langSet.size).equal(49);
    expect(langSet.has("VI")).equal(true);
  });

});
