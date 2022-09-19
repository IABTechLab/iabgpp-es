import { Base64UrlEncoder } from "../../../../src/encoder/datatype/encoder/Base64UrlEncoder";
import { expect } from "chai";

describe("encoder.Base64UrlEncoder", (): void => {
  it("should encode '0000110000010000000000010011' to DBABMA", (): void => {
    expect(Base64UrlEncoder.encode("0000110000010000000000010011")).to.eql("DBABMA");
  });

  it("should encode '000011000001000000000010001101011' to DBACNYA", (): void => {
    expect(Base64UrlEncoder.encode("000011000001000000000010001101011")).to.eql("DBACNYA");
  });

  it("should encode '00001100000100000000000110001111' to DBABjw", (): void => {
    expect(Base64UrlEncoder.encode("00001100000100000000000110001111")).to.eql("DBABjw");
  });

  it("should decode DBABMA to '000011000001000000000001001100000000'", (): void => {
    expect(Base64UrlEncoder.decode("DBABMA")).to.eql("000011000001000000000001001100000000");
  });

  it("should decode DBACNYA to '000011000001000000000010001101011000000000'", (): void => {
    expect(Base64UrlEncoder.decode("DBACNYA")).to.eql("000011000001000000000010001101011000000000");
  });

  it("should decode DBABjw to '000011000001000000000001100011110000'", (): void => {
    expect(Base64UrlEncoder.decode("DBABjw")).to.eql("000011000001000000000001100011110000");
  });
});
