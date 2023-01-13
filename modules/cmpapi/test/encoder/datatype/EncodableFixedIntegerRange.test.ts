import { expect } from "chai";
import { EncodableFixedIntegerRange } from "../../../src/encoder/datatype/EncodableFixedIntegerRange";

describe("datatype.EncodableFixedIntegerRange", (): void => {
  it("should substring '1000000000010000000000000000111000000000000010100000000000010001' from index 1 to '00000000001000000000000000011100000000000001010000000000001000'", (): void => {
    expect(
      new EncodableFixedIntegerRange().substring("1000000000010000000000000000111000000000000010100000000000010001", 1)
    ).to.eql("00000000001000000000000000011100000000000001010000000000001000");
  });

  it("should substring '000010001111010010000110111111111100000000001111010010000110111111111100000000000000000000000000000000000000000100001101000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000001110110000000000010000000000001110100000000000000000000000000000' from index 230 to '00000000000100000000000011101'", (): void => {
    expect(
      new EncodableFixedIntegerRange().substring(
        "000010001111010010000110111111111100000000001111010010000110111111111100000000000000000000000000000000000000000100001101000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000001110110000000000010000000000001110100000000000000000000000000000",
        230
      )
    ).to.eql("00000000000100000000000011101");
  });

  it("should encode [28] to  '00000000000100000000000011100'", (): void => {
    let encodableFixedIntegerRange = new EncodableFixedIntegerRange();
    encodableFixedIntegerRange.setValue([28]);
    expect(encodableFixedIntegerRange.encode()).to.eql("00000000000100000000000011100");
  });

  it("should encode [29] to  '00000000000100000000000011101'", (): void => {
    let encodableFixedIntegerRange = new EncodableFixedIntegerRange();
    encodableFixedIntegerRange.setValue([29]);
    expect(encodableFixedIntegerRange.encode()).to.eql("00000000000100000000000011101");
  });

  it("should decode '00000000000100000000000011100' to [28]", (): void => {
    let encodableFixedIntegerRange = new EncodableFixedIntegerRange();
    encodableFixedIntegerRange.decode("00000000000100000000000011100");
    expect(encodableFixedIntegerRange.getValue()).to.eql([28]);
  });

  it("should decode '00000000000100000000000011100' to [29]", (): void => {
    let encodableFixedIntegerRange = new EncodableFixedIntegerRange();
    encodableFixedIntegerRange.decode("00000000000100000000000011101");
    expect(encodableFixedIntegerRange.getValue()).to.eql([29]);
  });
});
