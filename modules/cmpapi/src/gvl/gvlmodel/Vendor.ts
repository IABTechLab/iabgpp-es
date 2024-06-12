import { GVLMapItem } from "./GVLMapItem.js";
import { DataRetention } from "./DataRetention.js";
import { VendorUrl } from "./VendorUrl.js";

export interface Vendor extends GVLMapItem {
  purposes: number[];
  legIntPurposes?: number[];
  impConsPurposes?: number[]; // canada has added impConsPurposes in lieu of europe's legIntPurposes
  flexiblePurposes: number[];
  specialPurposes: number[];
  features: number[];
  specialFeatures: number[];
  policyUrl?: string;
  usesCookies?: boolean;
  cookieMaxAgeSeconds?: number | null;
  cookieRefresh?: boolean;
  usesNonCookieAccess?: boolean;
  deviceStorageDisclosureUrl?: string;
  deletedDate?: Date | string;
  overflow?: {
    httpGetLimit: number;
  };
  dataRetention?: DataRetention;
  urls?: VendorUrl[];
  dataDeclaration?: number[];
}
