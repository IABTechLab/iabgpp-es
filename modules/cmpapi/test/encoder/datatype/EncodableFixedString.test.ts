import { expect } from "chai";
import { EncodableFixedString } from "../../../src/encoder/datatype/EncodableFixedString";

describe("datatype.EncodableFixedString", (): void => {
  it("should substring '10000000000001' from index 1 length 2 to '000000000000'", (): void => {
    expect(new EncodableFixedString(2).substring("10000000000001", 1)).to.eql("000000000000");
  });

  it("should substring '01111111111110' from index 1 length 2 to '111111111111'", (): void => {
    expect(new EncodableFixedString(2).substring("01111111111110", 1)).to.eql("111111111111");
  });
});
