import { FixedIntegerRangeEncoder } from "../../../../src/encoder/datatype/encoder/FixedIntegerRangeEncoder";
import { expect } from "chai";

describe("encoder.FixedIntegerRangeEncoder", (): void => {
  it("should encode [] to '000000000000'", (): void => {
    expect(FixedIntegerRangeEncoder.encode([])).to.eql("000000000000");
  });

  it("should encode [2] to '00000000000100000000000000010'", (): void => {
    expect(FixedIntegerRangeEncoder.encode([2])).to.eql("00000000000100000000000000010");
  });

  it("should encode [2,3,4,5,6] to '000000000001100000000000000100000000000000110'", (): void => {
    expect(FixedIntegerRangeEncoder.encode([2, 3, 4, 5, 6])).to.eql("000000000001100000000000000100000000000000110");
  });

  it("should encode [2,5,6,7] to '00000000001000000000000000010100000000000001010000000000000111'", (): void => {
    expect(FixedIntegerRangeEncoder.encode([2, 5, 6, 7])).to.eql(
      "00000000001000000000000000010100000000000001010000000000000111"
    );
  });

  it("should encode [5,2,7,6] to '00000000001000000000000000010100000000000001010000000000000111'", (): void => {
    expect(FixedIntegerRangeEncoder.encode([5, 2, 7, 6])).to.eql(
      "00000000001000000000000000010100000000000001010000000000000111"
    );
  });

  it("should encode [3,5,6,7,8] to '00000000001000000000000000011100000000000001010000000000001000'", (): void => {
    expect(FixedIntegerRangeEncoder.encode([3, 5, 6, 7, 8])).to.eql(
      "00000000001000000000000000011100000000000001010000000000001000"
    );
  });

  it("should decode '000000000000' to []", (): void => {
    expect(FixedIntegerRangeEncoder.decode("000000000000")).to.eql([]);
  });

  it("should decode '00000000000100000000000000010' to [2]", (): void => {
    expect(FixedIntegerRangeEncoder.decode("00000000000100000000000000010")).to.eql([2]);
  });

  it("should decode '000000000001100000000000000100000000000000110' to [2,3,4,5,6]", (): void => {
    expect(FixedIntegerRangeEncoder.decode("000000000001100000000000000100000000000000110")).to.eql([2, 3, 4, 5, 6]);
  });

  it("should decode '00000000001000000000000000010100000000000001010000000000000111' to [2,5,6,7]", (): void => {
    expect(FixedIntegerRangeEncoder.decode("00000000001000000000000000010100000000000001010000000000000111")).to.eql([
      2, 5, 6, 7,
    ]);
  });

  it("should decode '00000000001000000000000000011100000000000001010000000000001000' to [3,5,6,7,8]", (): void => {
    expect(FixedIntegerRangeEncoder.decode("00000000001000000000000000011100000000000001010000000000001000")).to.eql([
      3, 5, 6, 7, 8,
    ]);
  });

  it("should decode '0011' to error", (): void => {
    expect(() => {
      FixedIntegerRangeEncoder.decode("0011");
    }).to.throw();
  });

  it("should decode '000000000002' to error", (): void => {
    expect(() => {
      FixedIntegerRangeEncoder.decode("000000000002");
    }).to.throw();
  });
});
