import { expect } from "chai";
import { EncodableFibonacciIntegerRange } from "../../../src/encoder/datatype/EncodableFibonacciIntegerRange";
import { EncodableFibonacciInteger } from "../../../src/encoder/datatype";

describe("datatype.EncodableFibonacciInteger", (): void => {
  it("should substring '100111' from index 1 to '0011'", (): void => {
    expect(new EncodableFibonacciInteger(0).substring("100111", 1)).to.eql("0011");
  });
});
