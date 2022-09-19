import { GvlMapItem } from "./GvlMapItem.js";

export interface Feature extends GvlMapItem {
  description: string;
  descriptionLegal: string;
}
