import { JsonHttpClient } from "./gvl/client/JsonHttpClient.js";
import { GVLError } from "./gvl/error/GVLError.js";
import { ByPurposeVendorMap } from "./gvl/gvlmodel/ByPurposeVendorMap.js";
import { ConsentLanguages } from "./gvl/gvlmodel/ConsentLanguages.js";
import { DataCategory } from "./gvl/gvlmodel/DataCategory.js";
import { Declarations } from "./gvl/gvlmodel/Declarations.js";
import { Feature } from "./gvl/gvlmodel/Feature.js";
import { IDSetMap } from "./gvl/gvlmodel/IDSetMap.js";
import { IntMap } from "./gvl/gvlmodel/IntMap.js";
import { Purpose } from "./gvl/gvlmodel/Purpose.js";
import { Stack } from "./gvl/gvlmodel/Stack.js";
import { Vendor } from "./gvl/gvlmodel/Vendor.js";
import { VendorList } from "./gvl/gvlmodel/VendorList.js";

type PurposeOrFeature = "purpose" | "feature";
type PurposeSubType = "consent" | "legInt" | "flexible";

export class GVLUrlConfig {
  /**
   * baseUrl - Entities using the vendor-list.json are required by the iab to
   * host their own copy of it to reduce the load on the iab's infrastructure
   * so a 'base' url must be set to be put together with the versioning scheme
   * of the filenames.
   *
   * @param {string} url - the base url to load the vendor-list.json from.  This is
   * broken out from the filename because it follows a different scheme for
   * latest file vs versioned files.
   *
   * ](https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/TCFv2/IAB%20Tech%20Lab%20-%20Consent%20string%20and%20vendor%20list%20formats%20v2.md#caching-the-global-vendor-list)
   */
  public baseUrl: string;

  /**
   * @param {string} - the latest is assumed to be vendor-list.json because
   * that is what the iab uses, but it could be different... if you want
   */
  public version: string | number;

  /**
   * @param {string} - the latest is assumed to be vendor-list.json because
   * that is what the iab uses, but it could be different... if you want
   */
  public latestFilename: string;

  /**
   * @param {string} - the versioned name is assumed to be
   * vendor-list-v[VERSION].json where [VERSION] will be replaced with the
   * specified version.  But it could be different... if you want just make
   * sure to include the [VERSION] macro if you have a numbering scheme, it's a
   * simple string substitution.
   *
   * eg.
   * ```javascript
   * GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
   * GVL.versionedFilename = "vendorlist?getVersion=[VERSION]";
   * ```
   */

  public versionedFilename: string;

  /**
   * @param {string} - Translations of the names and descriptions for Purposes,
   * Special Purposes, Features, and Special Features to non-English languages
   * are contained in a file where attributes containing English content
   * (except vendor declaration information) are translated.  The iab publishes
   * one following the scheme below where the LANG is the iso639-1 language
   * code.  For a list of available translations
   * [please go here](https://register.consensu.org/Translation).
   *
   * eg.
   * ```javascript
   * GVL.baseUrl = "http://www.mydomain.com/iabcmp/";
   * GVL.languageFilename = "purposes?getPurposes=[LANG]";
   * ```
   */
  public languageFilename: string;
}

/**
 * class with utilities for managing the global vendor list.  Will use JSON to
 * fetch the vendor list from specified url and will serialize it into this
 * object and provide accessors.  Provides ways to group vendors on the list by
 * purpose and feature.
 */
export class GVL implements VendorList {
  vendors: IntMap<Vendor>;
  public static DEFAULT_LANGUAGE = "EN";

  public readonly consentLanguages: ConsentLanguages = new ConsentLanguages();
  public gvlSpecificationVersion: number;
  public vendorListVersion: number;
  public tcfPolicyVersion: number;
  public lastUpdated: string | Date;
  public purposes: IntMap<Purpose>;
  public specialPurposes: IntMap<Purpose>;
  public features: IntMap<Feature>;
  public specialFeatures: IntMap<Feature>;
  public stacks: IntMap<Stack>;
  public dataCategories?: IntMap<DataCategory>;
  public language: string = GVL.DEFAULT_LANGUAGE;

  private vendorIds: Set<number>;
  private ready = false;
  private fullVendorList: IntMap<Vendor>;
  private byPurposeVendorMap: ByPurposeVendorMap;
  private bySpecialPurposeVendorMap: IDSetMap;
  private byFeatureVendorMap: IDSetMap;
  private bySpecialFeatureVendorMap: IDSetMap;

  private baseUrl: string;
  private languageFilename = "purposes-[LANG].json";

  public static fromVendorList(vendorList: VendorList): GVL {
    let gvl = new GVL();
    gvl.populate(vendorList as Declarations);
    return gvl;
  }

  /**
   * **
   * @param {GVLConfig} - Configuration containing url configuration
   *
   * @throws {GVLError} - If the url is http[s]://vendorlist.consensu.org/...
   * this will throw an error.  IAB Europe requires that that CMPs and Vendors
   * cache their own copies of the GVL to minimize load on their
   * infrastructure.  For more information regarding caching of the
   * vendor-list.json, please see [the TCF documentation on 'Caching the Global
   * Vendor List'
   */
  public static async fromUrl(config: GVLUrlConfig): Promise<GVL> {
    let baseUrl = config.baseUrl;

    if (!baseUrl || baseUrl.length === 0) {
      throw new GVLError("Invalid baseUrl: '" + baseUrl + "'");
    }

    if (/^https?:\/\/vendorlist\.consensu\.org\//.test(baseUrl)) {
      throw new GVLError(
        "Invalid baseUrl!  You may not pull directly from vendorlist.consensu.org and must provide your own cache"
      );
    }

    // if a trailing slash was forgotten
    if (baseUrl.length > 0 && baseUrl[baseUrl.length - 1] !== "/") {
      baseUrl += "/";
    }

    let gvl = new GVL();
    gvl.baseUrl = baseUrl;

    if (config.languageFilename) {
      gvl.languageFilename = config.languageFilename;
    } else {
      gvl.languageFilename = "purposes-[LANG].json";
    }

    if ((config.version as number) > 0) {
      let versionedFilename = config.versionedFilename;
      if (!versionedFilename) {
        versionedFilename = "archives/vendor-list-v[VERSION].json";
      }
      let url = baseUrl + versionedFilename.replace("[VERSION]", String(config.version));
      gvl.populate((await JsonHttpClient.fetch(url)) as VendorList);
    } else {
      /**
       * whatever it is (or isn't)... it doesn't matter we'll just get the latest.
       */
      let latestFilename = config.latestFilename;
      if (!latestFilename) {
        latestFilename = "vendor-list.json";
      }
      let url = baseUrl + latestFilename;
      gvl.populate((await JsonHttpClient.fetch(url)) as VendorList);
    }

    return gvl;
  }

  /**
   * changeLanguage - retrieves the purpose language translation and sets the
   * internal language variable
   *
   * @param {string} lang - ISO 639-1 langauge code to change language to
   * @return {Promise<void | GVLError>} - returns the `readyPromise` and
   * resolves when this GVL is populated with the data from the language file.
   */
  public async changeLanguage(lang: string): Promise<void | GVLError> {
    const langUpper = lang.toUpperCase();

    if (this.consentLanguages.has(langUpper)) {
      if (langUpper !== this.language) {
        this.language = langUpper;

        const url = this.baseUrl + this.languageFilename.replace("[LANG]", lang);

        try {
          this.populate((await JsonHttpClient.fetch(url)) as VendorList);
        } catch (err) {
          throw new GVLError("unable to load language: " + err.message);
        }
      }
    } else {
      throw new GVLError(`unsupported language ${lang}`);
    }
  }

  /**
   * getJson - Method for getting the JSON that was downloaded to created this
   * `GVL` object
   *
   * @return {VendorList} - The basic JSON structure without the extra
   * functionality and methods of this class.
   */
  public getJson(): VendorList {
    return JSON.parse(
      JSON.stringify({
        gvlSpecificationVersion: this.gvlSpecificationVersion,
        vendorListVersion: this.vendorListVersion,
        tcfPolicyVersion: this.tcfPolicyVersion,
        lastUpdated: this.lastUpdated,
        purposes: this.purposes,
        specialPurposes: this.specialPurposes,
        features: this.features,
        specialFeatures: this.specialFeatures,
        stacks: this.stacks,
        dataCategories: this.dataCategories,
        vendors: this.fullVendorList,
      })
    );
  }

  private isVendorList(gvlObject: object): gvlObject is VendorList {
    return gvlObject !== undefined && (gvlObject as VendorList).vendors !== undefined;
  }

  private populate(gvlObject: Declarations): void {
    /**
     * these are populated regardless of whether it's a Declarations file or
     * a VendorList
     */
    this.purposes = gvlObject.purposes;
    this.specialPurposes = gvlObject.specialPurposes;
    this.features = gvlObject.features;
    this.specialFeatures = gvlObject.specialFeatures;
    this.stacks = gvlObject.stacks;
    this.dataCategories = gvlObject.dataCategories;

    if (this.isVendorList(gvlObject)) {
      this.gvlSpecificationVersion = gvlObject.gvlSpecificationVersion;
      this.tcfPolicyVersion = gvlObject.tcfPolicyVersion;
      this.vendorListVersion = gvlObject.vendorListVersion;
      this.lastUpdated = gvlObject.lastUpdated;

      if (typeof this.lastUpdated === "string") {
        this.lastUpdated = new Date(this.lastUpdated);
      }

      this.vendors = gvlObject.vendors;
      this.fullVendorList = gvlObject.vendors;
      this.mapVendors();
      this.ready = true;
    }
  }

  private mapVendors(vendorIds?: number[]): void {
    // create new instances of the maps
    this.byPurposeVendorMap = {};
    this.bySpecialPurposeVendorMap = {};
    this.byFeatureVendorMap = {};
    this.bySpecialFeatureVendorMap = {};

    // initializes data structure for purpose map
    Object.keys(this.purposes).forEach((purposeId: string): void => {
      this.byPurposeVendorMap[purposeId] = {
        legInt: new Set<number>(),
        impCons: new Set<number>(),
        consent: new Set<number>(),
        flexible: new Set<number>(),
      };
    });

    // initializes data structure for special purpose map
    Object.keys(this.specialPurposes).forEach((purposeId: string): void => {
      this.bySpecialPurposeVendorMap[purposeId] = new Set<number>();
    });

    // initializes data structure for feature map
    Object.keys(this.features).forEach((featureId: string): void => {
      this.byFeatureVendorMap[featureId] = new Set<number>();
    });

    // initializes data structure for feature map
    Object.keys(this.specialFeatures).forEach((featureId: string): void => {
      this.bySpecialFeatureVendorMap[featureId] = new Set<number>();
    });

    if (!Array.isArray(vendorIds)) {
      vendorIds = Object.keys(this.fullVendorList).map((vId: string) => +vId);
    }

    this.vendorIds = new Set(vendorIds);

    // assigns vendor ids to their respective maps
    this.vendors = vendorIds.reduce((vendors: {}, vendorId: number): {} => {
      const vendor: Vendor = this.vendors[String(vendorId)];

      if (vendor && vendor.deletedDate === undefined) {
        vendor.purposes.forEach((purposeId: number): void => {
          const purpGroup = this.byPurposeVendorMap[String(purposeId)];

          purpGroup.consent.add(vendorId);
        });

        vendor.specialPurposes.forEach((purposeId: number): void => {
          this.bySpecialPurposeVendorMap[String(purposeId)].add(vendorId);
        });

        if (vendor.legIntPurposes) {
          vendor.legIntPurposes.forEach((purposeId: number): void => {
            this.byPurposeVendorMap[String(purposeId)].legInt.add(vendorId);
          });
        }

        // canada has added impConsPurposes in lieu of europe's legIntPurposes
        if (vendor.impConsPurposes) {
          vendor.impConsPurposes.forEach((purposeId: number): void => {
            this.byPurposeVendorMap[String(purposeId)].impCons.add(vendorId);
          });
        }

        // could not be there
        if (vendor.flexiblePurposes) {
          vendor.flexiblePurposes.forEach((purposeId: number): void => {
            this.byPurposeVendorMap[String(purposeId)].flexible.add(vendorId);
          });
        }

        vendor.features.forEach((featureId: number): void => {
          this.byFeatureVendorMap[String(featureId)].add(vendorId);
        });

        vendor.specialFeatures.forEach((featureId: number): void => {
          this.bySpecialFeatureVendorMap[String(featureId)].add(vendorId);
        });

        vendors[vendorId] = vendor;
      }

      return vendors;
    }, {});
  }

  private getFilteredVendors(
    purposeOrFeature: PurposeOrFeature,
    id: number,
    subType?: PurposeSubType,
    special?: boolean
  ): IntMap<Vendor> {
    const properPurposeOrFeature: string = purposeOrFeature.charAt(0).toUpperCase() + purposeOrFeature.slice(1);
    let vendorSet: Set<number>;
    const retr: IntMap<Vendor> = {};

    if (purposeOrFeature === "purpose" && subType) {
      vendorSet = this["by" + properPurposeOrFeature + "VendorMap"][String(id)][subType];
    } else {
      vendorSet = this["by" + (special ? "Special" : "") + properPurposeOrFeature + "VendorMap"][String(id)];
    }

    vendorSet.forEach((vendorId: number): void => {
      retr[String(vendorId)] = this.vendors[String(vendorId)];
    });

    return retr;
  }

  /**
   * getVendorsWithConsentPurpose
   *
   * @param {number} purposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the consent purpose id
   */
  public getVendorsWithConsentPurpose(purposeId: number): IntMap<Vendor> {
    return this.getFilteredVendors("purpose", purposeId, "consent");
  }

  /**
   * getVendorsWithLegIntPurpose
   *
   * @param {number} purposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the legInt (Legitimate Interest) purpose id
   */
  public getVendorsWithLegIntPurpose(purposeId: number): IntMap<Vendor> {
    return this.getFilteredVendors("purpose", purposeId, "legInt");
  }

  /**
   * getVendorsWithFlexiblePurpose
   *
   * @param {number} purposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the flexible purpose id
   */
  public getVendorsWithFlexiblePurpose(purposeId: number): IntMap<Vendor> {
    return this.getFilteredVendors("purpose", purposeId, "flexible");
  }

  /**
   * getVendorsWithSpecialPurpose
   *
   * @param {number} specialPurposeId
   * @return {IntMap<Vendor>} - list of vendors that have declared the special purpose id
   */
  public getVendorsWithSpecialPurpose(specialPurposeId: number): IntMap<Vendor> {
    return this.getFilteredVendors("purpose", specialPurposeId, undefined, true);
  }

  /**
   * getVendorsWithFeature
   *
   * @param {number} featureId
   * @return {IntMap<Vendor>} - list of vendors that have declared the feature id
   */
  public getVendorsWithFeature(featureId: number): IntMap<Vendor> {
    return this.getFilteredVendors("feature", featureId);
  }

  /**
   * getVendorsWithSpecialFeature
   *
   * @param {number} specialFeatureId
   * @return {IntMap<Vendor>} - list of vendors that have declared the special feature id
   */
  public getVendorsWithSpecialFeature(specialFeatureId: number): IntMap<Vendor> {
    return this.getFilteredVendors("feature", specialFeatureId, undefined, true);
  }

  /**
   * narrowVendorsTo - narrows vendors represented in this GVL to the list of ids passed in
   *
   * @param {number[]} vendorIds - list of ids to narrow this GVL to
   * @return {void}
   */
  public narrowVendorsTo(vendorIds: number[]): void {
    this.mapVendors(vendorIds);
  }

  /**
   * isReady - Whether or not this instance is ready to be used.  This will be
   * immediately and synchronously true if a vendorlist object is passed into
   * the constructor or once the JSON vendorllist is retrieved.
   *
   * @return {boolean} whether or not the instance is ready to be interacted
   * with and all the data is populated
   */
  public get isReady(): boolean {
    return this.ready;
  }

  public static isInstanceOf(questionableInstance: unknown): questionableInstance is GVL {
    const isSo = typeof questionableInstance === "object";
    return isSo && typeof (questionableInstance as GVL).narrowVendorsTo === "function";
  }
}
