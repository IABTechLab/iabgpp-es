import { expect } from "chai";
import { EncodableFixedInteger } from "../../../src/encoder/datatype/EncodableFixedInteger";

describe("datatype.EncodableFixedInteger", (): void => {
  it("should substring '10001' from index 1 length 3 to '000'", (): void => {
    expect(new EncodableFixedInteger(3).substring("10001", 1)).to.eql("000");
  });

  it("should substring '01110' from index 1 length 3 to '111'", (): void => {
    expect(new EncodableFixedInteger(3).substring("01110", 1)).to.eql("111");
  });
});
