import { TraditionalBase64UrlEncoder } from "../../../../src/encoder/datatype/encoder/TraditionalBase64UrlEncoder";
import { expect } from "chai";

describe("encoder.Base64UrlEncoder", (): void => {
  it("should encode '0000110000010000000000010011' to DBABMAAA", (): void => {
    expect(new TraditionalBase64UrlEncoder().encode("0000110000010000000000010011")).to.eql("DBABMAAA");
  });

  it("should encode '000011000001000000000010001101011' to DBACNYAA", (): void => {
    expect(new TraditionalBase64UrlEncoder().encode("000011000001000000000010001101011")).to.eql("DBACNYAA");
  });

  it("should encode '00001100000100000000000110001111' to DBABjwAA", (): void => {
    expect(new TraditionalBase64UrlEncoder().encode("00001100000100000000000110001111")).to.eql("DBABjwAA");
  });

  it("should decode DBABMAAA to '000011000001000000000001001100000000000000000000'", (): void => {
    expect(new TraditionalBase64UrlEncoder().decode("DBABMAAA")).to.eql(
      "000011000001000000000001001100000000000000000000"
    );
  });

  it("should decode DBACNYAA to '000011000001000000000010001101011000000000000000'", (): void => {
    expect(new TraditionalBase64UrlEncoder().decode("DBACNYAA")).to.eql(
      "000011000001000000000010001101011000000000000000"
    );
  });

  it("should decode DBABjwAA to '000011000001000000000001100011110000000000000000'", (): void => {
    expect(new TraditionalBase64UrlEncoder().decode("DBABjwAA")).to.eql(
      "000011000001000000000001100011110000000000000000"
    );
  });
});
