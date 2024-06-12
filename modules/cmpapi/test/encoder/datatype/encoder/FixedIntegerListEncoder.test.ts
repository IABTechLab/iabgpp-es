import { FixedIntegerListEncoder } from "../../../../src/encoder/datatype/encoder/FixedIntegerListEncoder";
import { expect } from "chai";

describe("encoder.FixedIntegerListEncoder", (): void => {
  it("should encode [] to '0000'", (): void => {
    expect(FixedIntegerListEncoder.encode([], 2, 2)).to.eql("0000");
  });

  it("should encode [0] to '0000'", (): void => {
    expect(FixedIntegerListEncoder.encode([0], 2, 2)).to.eql("0000");
  });

  it("should encode [0, 0] to '0000'", (): void => {
    expect(FixedIntegerListEncoder.encode([0, 0], 2, 2)).to.eql("0000");
  });

  it("should encode [0, 1] to '0001'", (): void => {
    expect(FixedIntegerListEncoder.encode([0, 1], 2, 2)).to.eql("0001");
  });

  it("should encode [0, 2] to '0010'", (): void => {
    expect(FixedIntegerListEncoder.encode([0, 2], 2, 2)).to.eql("0010");
  });

  it("should encode [0, 3] to '0011'", (): void => {
    expect(FixedIntegerListEncoder.encode([0, 3], 2, 2)).to.eql("0011");
  });

  it("should encode [1, 0] to '0100'", (): void => {
    expect(FixedIntegerListEncoder.encode([1, 0], 2, 2)).to.eql("0100");
  });

  it("should encode [1, 1] to '0101'", (): void => {
    expect(FixedIntegerListEncoder.encode([1, 1], 2, 2)).to.eql("0101");
  });

  it("should encode [1, 2] to '0110'", (): void => {
    expect(FixedIntegerListEncoder.encode([1, 2], 2, 2)).to.eql("0110");
  });

  it("should encode [1, 3] to '0111'", (): void => {
    expect(FixedIntegerListEncoder.encode([1, 3], 2, 2)).to.eql("0111");
  });

  it("should encode [2, 0] to '1000'", (): void => {
    expect(FixedIntegerListEncoder.encode([2, 0], 2, 2)).to.eql("1000");
  });

  it("should encode [2, 1] to '1001'", (): void => {
    expect(FixedIntegerListEncoder.encode([2, 1], 2, 2)).to.eql("1001");
  });

  it("should encode [2, 2] to '1010'", (): void => {
    expect(FixedIntegerListEncoder.encode([2, 2], 2, 2)).to.eql("1010");
  });

  it("should encode [2, 3] to '1011'", (): void => {
    expect(FixedIntegerListEncoder.encode([2, 3], 2, 2)).to.eql("1011");
  });

  it("should encode [3, 0] to '1100'", (): void => {
    expect(FixedIntegerListEncoder.encode([3, 0], 2, 2)).to.eql("1100");
  });

  it("should encode [3, 1] to '1101'", (): void => {
    expect(FixedIntegerListEncoder.encode([3, 1], 2, 2)).to.eql("1101");
  });

  it("should encode [3, 2] to '1110'", (): void => {
    expect(FixedIntegerListEncoder.encode([3, 2], 2, 2)).to.eql("1110");
  });

  it("should encode [3, 3] to '1111'", (): void => {
    expect(FixedIntegerListEncoder.encode([3, 3], 2, 2)).to.eql("1111");
  });

  it("should throw exception", (): void => {
    expect(function () {
      FixedIntegerListEncoder.encode([3, 3], 1, 1);
    }).to.throw();
  });

  it("should decode '' to [0, 0]", (): void => {
    expect(FixedIntegerListEncoder.decode("", 2, 2)).to.eql([0, 0]);
  });

  it("should decode '0000' to [0, 0]", (): void => {
    expect(FixedIntegerListEncoder.decode("0000", 2, 2)).to.eql([0, 0]);
  });

  it("should decode '0001' to [0, 1]", (): void => {
    expect(FixedIntegerListEncoder.decode("0001", 2, 2)).to.eql([0, 1]);
  });

  it("should decode '0010' to [0, 2]", (): void => {
    expect(FixedIntegerListEncoder.decode("0010", 2, 2)).to.eql([0, 2]);
  });

  it("should decode '0011' to [0, 3]", (): void => {
    expect(FixedIntegerListEncoder.decode("0011", 2, 2)).to.eql([0, 3]);
  });

  it("should decode '0100' to [1, 0]", (): void => {
    expect(FixedIntegerListEncoder.decode("0100", 2, 2)).to.eql([1, 0]);
  });

  it("should decode '0101' to [1, 1]", (): void => {
    expect(FixedIntegerListEncoder.decode("0101", 2, 2)).to.eql([1, 1]);
  });

  it("should decode '0110' to [1, 2]", (): void => {
    expect(FixedIntegerListEncoder.decode("0110", 2, 2)).to.eql([1, 2]);
  });

  it("should decode '0111' to [1, 3]", (): void => {
    expect(FixedIntegerListEncoder.decode("0111", 2, 2)).to.eql([1, 3]);
  });

  it("should decode '1000' to [2, 0]", (): void => {
    expect(FixedIntegerListEncoder.decode("1000", 2, 2)).to.eql([2, 0]);
  });

  it("should decode '1001' to [2, 1]", (): void => {
    expect(FixedIntegerListEncoder.decode("1001", 2, 2)).to.eql([2, 1]);
  });

  it("should decode '1010' to [2, 2]", (): void => {
    expect(FixedIntegerListEncoder.decode("1010", 2, 2)).to.eql([2, 2]);
  });

  it("should decode '1011' to [2, 3]", (): void => {
    expect(FixedIntegerListEncoder.decode("1011", 2, 2)).to.eql([2, 3]);
  });

  it("should decode '1100' to [3, 0]", (): void => {
    expect(FixedIntegerListEncoder.decode("1100", 2, 2)).to.eql([3, 0]);
  });

  it("should decode '1101' to [3, 1]", (): void => {
    expect(FixedIntegerListEncoder.decode("1101", 2, 2)).to.eql([3, 1]);
  });

  it("should decode '1110' to [3, 2]", (): void => {
    expect(FixedIntegerListEncoder.decode("1110", 2, 2)).to.eql([3, 2]);
  });

  it("should decode '1111' to [3, 3]", (): void => {
    expect(FixedIntegerListEncoder.decode("1111", 2, 2)).to.eql([3, 3]);
  });

  it("should decode '2' to error", (): void => {
    expect(() => {
      FixedIntegerListEncoder.decode("2", 2, 2);
    }).to.throw();
  });

  it("should decode '111' to error", (): void => {
    expect(() => {
      FixedIntegerListEncoder.decode("111", 2, 2);
    }).to.throw();
  });
});
