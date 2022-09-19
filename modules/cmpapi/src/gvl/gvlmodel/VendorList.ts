import { Declarations } from "./Declarations.js";
import { IntMap } from "./IntMap.js";
import { Vendor } from "./Vendor.js";

export interface VendorList extends Declarations {
  lastUpdated: string | Date;
  gvlSpecificationVersion: number;
  vendorListVersion: number;
  tcfPolicyVersion: number;
  vendors: IntMap<Vendor>;
}
