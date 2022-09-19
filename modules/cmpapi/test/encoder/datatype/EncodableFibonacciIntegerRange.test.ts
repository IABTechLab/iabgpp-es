import { expect } from "chai";
import { EncodableFibonacciIntegerRange } from "../../../src/encoder/datatype/EncodableFibonacciIntegerRange";

describe("datatype.EncodableFibonacciIntegerRange", (): void => {
  it("should substring '100000000001000011101100110' from index 1 to '0000000000100001110110011'", (): void => {
    expect(new EncodableFibonacciIntegerRange().substring("100000000001000011101100110", 1)).to.eql(
      "0000000000100001110110011"
    );
  });
});
