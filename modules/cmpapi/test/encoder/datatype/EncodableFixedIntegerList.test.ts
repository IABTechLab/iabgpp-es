import { expect } from "chai";
import { EncodableFixedIntegerList } from "../../../src/encoder/datatype/EncodableFixedIntegerList";

describe("datatype.EncodableFixedBitfield", (): void => {
  it("should substring '10001' from index 1 length 4 to '1000'", (): void => {
    expect(new EncodableFixedIntegerList(2, 2).substring("10001", 0)).to.eql("1000");
  });

  it("should substring '01110' from index 1 length 4 to '1110'", (): void => {
    expect(new EncodableFixedIntegerList(2, 2).substring("01110", 1)).to.eql("1110");
  });
});
