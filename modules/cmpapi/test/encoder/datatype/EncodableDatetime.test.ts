import { expect } from "chai";
import { EncodableDatetime } from "../../../src/encoder/datatype/EncodableDatetime";

describe("datatype.EncodableDatetime", (): void => {
  it("should substring '10000000000000000000000000000000000001' from index 1 to '000000000000000000000000000000000000'", (): void => {
    expect(new EncodableDatetime().substring("10000000000000000000000000000000000001", 1)).to.eql(
      "000000000000000000000000000000000000"
    );
  });

  it("should substring '01111111111111111111111111111111111110' from index 1 to '111111111111111111111111111111111111'", (): void => {
    expect(new EncodableDatetime().substring("01111111111111111111111111111111111110", 1)).to.eql(
      "111111111111111111111111111111111111"
    );
  });
});
