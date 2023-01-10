import { AbstractBase64UrlEncoder } from "./AbstractBase64UrlEncoder.js";

export class CompressedBase64UrlEncoder extends AbstractBase64UrlEncoder {
  // Overriden
  protected pad(bitString: string): string {
    while (bitString.length % 8 > 0) {
      bitString += "0";
    }
    while (bitString.length % 6 > 0) {
      bitString += "0";
    }
    return bitString;
  }
}
