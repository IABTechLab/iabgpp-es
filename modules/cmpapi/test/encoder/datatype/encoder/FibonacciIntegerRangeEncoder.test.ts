import { FibonacciIntegerRangeEncoder } from "../../../../src/encoder/datatype/encoder/FibonacciIntegerRangeEncoder";
import { expect } from "chai";

describe("encoder.FibonacciIntegerRangeEncoder", (): void => {
  it("should encode [] to '000000000000'", (): void => {
    expect(FibonacciIntegerRangeEncoder.encode([])).to.eql("000000000000");
  });

  it("should encode [2] to '0000000000010011'", (): void => {
    expect(FibonacciIntegerRangeEncoder.encode([2])).to.eql("0000000000010011");
  });

  it("should encode [2,3,4,5,6] to '00000000000110111011'", (): void => {
    expect(FibonacciIntegerRangeEncoder.encode([2, 3, 4, 5, 6])).to.eql("00000000000110111011");
  });

  it("should encode [2,5,6,7] to '000000000010001110011011'", (): void => {
    expect(FibonacciIntegerRangeEncoder.encode([2, 5, 6, 7])).to.eql("000000000010001110011011");
  });

  it("should encode [6,7,2,5] to '000000000010001110011011'", (): void => {
    expect(FibonacciIntegerRangeEncoder.encode([6, 7, 2, 5])).to.eql("000000000010001110011011");
  });

  it("should encode [3,5,6,7,8] to '0000000000100001110110011'", (): void => {
    expect(FibonacciIntegerRangeEncoder.encode([3, 5, 6, 7, 8])).to.eql("0000000000100001110110011");
  });

  it("should decode '000000000000' to []", (): void => {
    expect(FibonacciIntegerRangeEncoder.decode("000000000000")).to.eql([]);
  });

  it("should decode '0000000000010011' to [2]", (): void => {
    expect(FibonacciIntegerRangeEncoder.decode("0000000000010011")).to.eql([2]);
  });

  it("should decode '00000000000110111011' to [2,3,4,5,6]", (): void => {
    expect(FibonacciIntegerRangeEncoder.decode("00000000000110111011")).to.eql([2, 3, 4, 5, 6]);
  });

  it("should decode '000000000010001110011011' to [2,5,6,7]", (): void => {
    expect(FibonacciIntegerRangeEncoder.decode("000000000010001110011011")).to.eql([2, 5, 6, 7]);
  });

  it("should decode '0000000000100001110110011' to [3,5,6,7,8]", (): void => {
    expect(FibonacciIntegerRangeEncoder.decode("0000000000100001110110011")).to.eql([3, 5, 6, 7, 8]);
  });

  it("should decode '0011' to error", (): void => {
    expect(() => {
      FibonacciIntegerRangeEncoder.decode("0011");
    }).to.throw();
  });

  it("should decode '000000000002' to error", (): void => {
    expect(() => {
      FibonacciIntegerRangeEncoder.decode("000000000002");
    }).to.throw();
  });
});
