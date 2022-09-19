import { GvlMapItem } from "./GvlMapItem.js";

export interface Vendor extends GvlMapItem {
  purposes: number[];
  legIntPurposes: number[];
  flexiblePurposes: number[];
  specialPurposes: number[];
  features: number[];
  specialFeatures: number[];
  policyUrl: string;
  usesCookies?: boolean;
  cookieMaxAgeSeconds?: number | null;
  cookieRefresh?: boolean;
  usesNonCookieAccess?: boolean;
  deviceStorageDisclosureUrl?: string;
  deletedDate?: Date | string;
  overflow?: {
    httpGetLimit: number;
  };
}
