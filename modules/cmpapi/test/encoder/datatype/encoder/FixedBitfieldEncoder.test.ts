import { FixedBitfieldEncoder } from "../../../../src/encoder/datatype/encoder/FixedBitfieldEncoder";
import { expect } from "chai";

describe("encoder.FixedBitfieldEncoder", (): void => {
  it("should encode [] to ''", (): void => {
    expect(FixedBitfieldEncoder.encode([], 2)).to.eql("00");
  });

  it("should encode [false] to '0'", (): void => {
    expect(FixedBitfieldEncoder.encode([false], 1)).to.eql("0");
  });

  it("should encode [true] '1'", (): void => {
    expect(FixedBitfieldEncoder.encode([true], 1)).to.eql("1");
  });

  it("should encode [false, false] to '00'", (): void => {
    expect(FixedBitfieldEncoder.encode([false, false], 2)).to.eql("00");
  });

  it("should encode [false, true] to '01'", (): void => {
    expect(FixedBitfieldEncoder.encode([false, true], 2)).to.eql("01");
  });

  it("should encode [true, false] to '10'", (): void => {
    expect(FixedBitfieldEncoder.encode([true, false], 2)).to.eql("10");
  });

  it("should encode [true, true] to '11'", (): void => {
    expect(FixedBitfieldEncoder.encode([true, true], 2)).to.eql("11");
  });

  it("should throw exception", (): void => {
    expect(function () {
      FixedBitfieldEncoder.encode([true, true, true], 2);
    }).to.throw();
  });

  it("should decode '' to []", (): void => {
    expect(FixedBitfieldEncoder.decode("")).to.eql([]);
  });

  it("should decode '0' string to [false]", (): void => {
    expect(FixedBitfieldEncoder.decode("0")).to.eql([false]);
  });

  it("should decode '1' string to [true]", (): void => {
    expect(FixedBitfieldEncoder.decode("1")).to.eql([true]);
  });

  it("should decode '00' string to [false, false]", (): void => {
    expect(FixedBitfieldEncoder.decode("00")).to.eql([false, false]);
  });

  it("should decode '01' string to [false, true]]", (): void => {
    expect(FixedBitfieldEncoder.decode("01")).to.eql([false, true]);
  });

  it("should decode '10' string to [true, false]", (): void => {
    expect(FixedBitfieldEncoder.decode("10")).to.eql([true, false]);
  });

  it("should decode '11' string to [true, true]", (): void => {
    expect(FixedBitfieldEncoder.decode("11")).to.eql([true, true]);
  });

  it("should decode '2' to error", (): void => {
    expect(() => {
      FixedBitfieldEncoder.decode("2");
    }).to.throw();
  });
});
