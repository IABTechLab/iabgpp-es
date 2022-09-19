import { expect } from "chai";
import * as sinon from "sinon";
import { Gvl, GvlUrlConfig } from "../src/Gvl";
import { XMLHttpTestTools } from "./util/XMLHttpTestTools";

import vendorlistJson from "./vendorlist/vendor-list.json";
import translationJson from "./vendorlist/purposes-fr.json";

describe("Gvl", (): void => {
  const assertPopulated = (gvl: Gvl): void => {
    Object.keys(vendorlistJson).forEach((key: string): void => {
      const msg = `assertPopulated(): gvl.${key}]`;

      if (key === "lastUpdated") {
        expect((gvl[key] as Date).getTime(), msg).to.equal(new Date(vendorlistJson.lastUpdated).getTime());
      } else if (typeof vendorlistJson[key] === "object") {
        expect(gvl[key].id).to.eql(vendorlistJson[key].id);
        expect(gvl[key].name).to.eql(vendorlistJson[key].name);
        expect(gvl[key].purposes).to.eql(vendorlistJson[key].purposes);
        expect(gvl[key].legIntPurposes).to.eql(vendorlistJson[key].legIntPurposes);
        expect(gvl[key].flexiblePurposes).to.eql(vendorlistJson[key].flexiblePurposes);
        expect(gvl[key].features).to.eql(vendorlistJson[key].features);
        expect(gvl[key].specialFeatures).to.eql(vendorlistJson[key].specialFeatures);
        expect(gvl[key].policyUrl).to.eql(vendorlistJson[key].policyUrl);
        expect(gvl[key].cookieMaxAgeSeconds).to.eql(vendorlistJson[key].cookieMaxAgeSeconds);
        expect(gvl[key].usesCookies).to.eql(vendorlistJson[key].usesCookies);
        expect(gvl[key].cookieRefresh).to.eql(vendorlistJson[key].cookieRefresh);
        expect(gvl[key].usesNonCookieAccess).to.eql(vendorlistJson[key].usesNonCookieAccess);
        expect(gvl[key].deviceStorageDisclosureUrl).to.eql(vendorlistJson[key].deviceStorageDisclosureUrl);
      } else {
        expect(gvl[key], msg).to.equal(vendorlistJson[key]);
      }
    });
  };

  const assertTranslated = (gvl: Gvl, lang: string): void => {
    expect(gvl.purposes, "gvl.purposes").to.deep.equal(translationJson.purposes);
    expect(gvl.specialPurposes, "gvl.specialPurposes").to.deep.equal(translationJson.specialPurposes);
    expect(gvl.features, "gvl.features").to.deep.equal(translationJson.features);
    expect(gvl.specialFeatures, "gvl.specialFeatures").to.deep.equal(translationJson.specialFeatures);
    expect(gvl.stacks, "gvl.stacks").to.deep.equal(translationJson.stacks);
    expect(gvl.purposes, "gvl.purposes").to.not.deep.equal(vendorlistJson.purposes);
    expect(gvl.specialPurposes, "gvl.specialPurposes").to.not.deep.equal(vendorlistJson.specialPurposes);
    expect(gvl.features, "gvl.features").to.not.deep.equal(vendorlistJson.features);
    expect(gvl.specialFeatures, "gvl.specialFeatures").to.not.deep.equal(vendorlistJson.specialFeatures);
    expect(gvl.language, "gvl.language").to.equal(lang.toUpperCase());
  };

  beforeEach((): void => {
    XMLHttpTestTools.beforeEach();
  });

  it("should propogate all values with passed in json", (): void => {
    const gvl: Gvl = Gvl.fromVendorList(vendorlistJson);

    assertPopulated(gvl);
  });

  it("should get latest Gvl if nothing is passed to the constructor", async (): Promise<void> => {
    let config = new GvlUrlConfig();
    config.baseUrl = "http://sweetcmp.com/";
    let promise = Gvl.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    expect(req.method).to.equal("GET");

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    let gvl = await promise;

    assertPopulated(gvl);
  });

  it('should get latest Gvl if "LATEST" is passed to the constructor', async (): Promise<void> => {
    let config = new GvlUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    config.version = "LATEST";
    let promise = Gvl.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal("GET");
    expect(req.url).to.equal(`http://sweetcmp.com/vendor-list.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    let gvl = await promise;

    assertPopulated(gvl);
  });

  it("should get versioned Gvl if version number is passed", async (): Promise<void> => {
    let version = 22;
    let config = new GvlUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    config.version = version;
    let promise = Gvl.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal("GET");
    expect(req.url).to.equal(`http://sweetcmp.com/archives/vendor-list-v${version}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    let gvl = await promise;

    assertPopulated(gvl);
  });

  it("should get versioned Gvl if version number as string is passed", async (): Promise<void> => {
    let version = 23;
    let config = new GvlUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    config.version = version;
    let promise = Gvl.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);

    const req: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];

    expect(req.method).to.equal("GET");
    expect(req.url).to.equal(`http://sweetcmp.com/archives/vendor-list-v${version}.json`);

    req.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    let gvl = await promise;

    assertPopulated(gvl);
  });

  it("should not request language", async (): Promise<void> => {
    let config = new GvlUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    let promise = Gvl.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    const req1: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    expect(req1.method).to.equal("GET");
    req1.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    let gvl = await promise;

    assertPopulated(gvl);

    gvl.changeLanguage("EN");

    expect(XMLHttpTestTools.requests.length).to.equal(1);
  });

  it("should request language", async (): Promise<void> => {
    let config = new GvlUrlConfig();
    config.baseUrl = "http://sweetcmp.com";
    let promise = Gvl.fromUrl(config);

    expect(XMLHttpTestTools.requests.length).to.equal(1);
    const req1: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[0];
    expect(req1.method).to.equal("GET");
    req1.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(vendorlistJson));

    let gvl = await promise;

    assertPopulated(gvl);

    gvl.changeLanguage("FR");

    expect(XMLHttpTestTools.requests.length).to.equal(2);
    const req2: sinon.SinonFakeXMLHttpRequest = XMLHttpTestTools.requests[1];
    expect(req2.method).to.equal("GET");
    req2.respond(200, XMLHttpTestTools.JSON_HEADER, JSON.stringify(translationJson));
  });

  it("should narrow a group of vendors when narrowVendorsTo is called with list of ids", (): void => {
    const gvl: Gvl = Gvl.fromVendorList(vendorlistJson);
    const onlyVendorId: string = Object.keys(vendorlistJson.vendors)[0];

    gvl.narrowVendorsTo([parseInt(onlyVendorId, 10)]);
    expect(gvl.vendors[onlyVendorId]).to.deep.equal(vendorlistJson.vendors[onlyVendorId]);
    expect(Object.keys(gvl.vendors).length).to.equal(1);
    expect(gvl.vendors[Object.keys(vendorlistJson.vendors)[1]]).to.be.undefined;
  });

  it("should remove a vendor if it has a deletedDate", (): void => {
    const vendorId = "1";

    let gvl = Gvl.fromVendorList(vendorlistJson);

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
    const gvl2: Gvl = Gvl.fromVendorList(json);
    expect(gvl2.vendors[vendorId], `gvl2.vendors["${vendorId}"]`).to.be.undefined;
  });
});
