import { AbstractBase64UrlEncoder } from "./AbstractBase64UrlEncoder.js";

export class TraditionalBase64UrlEncoder extends AbstractBase64UrlEncoder {
  private static instance: TraditionalBase64UrlEncoder = new TraditionalBase64UrlEncoder();

  private constructor() {
    super();
  }

  public static getInstance(): TraditionalBase64UrlEncoder {
    return this.instance;
  }

  // Overriden
  protected pad(bitString: string): string {
    while (bitString.length % 24 > 0) {
      bitString += "0";
    }
    return bitString;
  }
}
