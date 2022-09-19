import { GvlMapItem } from "./GvlMapItem.js";

export interface Stack extends GvlMapItem {
  purposes: number[];
  specialFeatures: number[];
  description: string;
}
