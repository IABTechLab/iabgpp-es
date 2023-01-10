import { expect } from "chai";
import { EncodableFixedString } from "../../../src/encoder/datatype/EncodableFixedString";
import { EncodableOptimizedFixedRange } from "../../../src/encoder/datatype/EncodableOptimizedFixedRange";

describe("datatype.EncodableFixedString", (): void => {
  it("should encode [12, 24, 48] to '00000000001100000000000000001000000000001000000000000000000000001'", (): void => {
    let encodableOptimizedFixedRange = new EncodableOptimizedFixedRange();
    encodableOptimizedFixedRange.setValue([12, 24, 48]);
    expect(encodableOptimizedFixedRange.encode()).to.eql(
      "00000000001100000000000000001000000000001000000000000000000000001"
    );
  });

  it("should encode [18, 30] to '00000000000111100000000000000000001000000000001'", (): void => {
    let encodableOptimizedFixedRange = new EncodableOptimizedFixedRange();
    encodableOptimizedFixedRange.setValue([18, 30]);
    expect(encodableOptimizedFixedRange.encode()).to.eql("00000000000111100000000000000000001000000000001");
  });

  it("should decode '00000000001100000000000000001000000000001000000000000000000000001' to [12, 24, 48]", (): void => {
    let encodableOptimizedFixedRange = new EncodableOptimizedFixedRange();
    encodableOptimizedFixedRange.decode("00000000001100000000000000001000000000001000000000000000000000001");
    expect(encodableOptimizedFixedRange.getValue()).to.eql([12, 24, 48]);
  });

  it("should decode '00000000000111100000000000000000001000000000001' to [18, 30]", (): void => {
    let encodableOptimizedFixedRange = new EncodableOptimizedFixedRange();
    encodableOptimizedFixedRange.decode("00000000001100000000000000001000000000001000000000000000000000001");
    expect(encodableOptimizedFixedRange.getValue()).to.eql([18, 30]);
  });
});
