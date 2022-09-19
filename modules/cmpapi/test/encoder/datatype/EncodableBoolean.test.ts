import { expect } from "chai";
import { EncodableBoolean } from "../../../src/encoder/datatype/EncodableBoolean";

describe("datatype.EncodableBoolean", (): void => {
  it("should substring '101' from index 1 to '0'", (): void => {
    expect(new EncodableBoolean().substring("101", 1)).to.eql("0");
  });

  it("should substring '010' from index 1 to '1'", (): void => {
    expect(new EncodableBoolean().substring("010", 1)).to.eql("1");
  });
});
