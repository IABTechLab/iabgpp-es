import { expect } from "chai";
import { EncodableFixedIntegerRange } from "../../../src/encoder/datatype/EncodableFixedIntegerRange";

describe("datatype.EncodableFixedIntegerRange", (): void => {
  it("should substring '1000000000010000000000000000111000000000000010100000000000010001' from index 1 to '00000000001000000000000000011100000000000001010000000000001000'", (): void => {
    expect(
      new EncodableFixedIntegerRange().substring("1000000000010000000000000000111000000000000010100000000000010001", 1)
    ).to.eql("00000000001000000000000000011100000000000001010000000000001000");
  });
});
