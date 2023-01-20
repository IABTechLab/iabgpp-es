import { expect } from "chai";
import { EncodableFixedBitfield } from "../../../src/encoder/datatype/EncodableFixedBitfield";

describe("datatype.EncodableFixedBitfield", (): void => {
  it("should substring '10001' from index 1 length 3 to '000'", (): void => {
    expect(new EncodableFixedBitfield([false, false, false]).substring("10001", 1)).to.eql("000");
  });

  it("should substring '01110' from index 1 length 3 to '111'", (): void => {
    expect(new EncodableFixedBitfield([false, false, false]).substring("01110", 1)).to.eql("111");
  });
});
