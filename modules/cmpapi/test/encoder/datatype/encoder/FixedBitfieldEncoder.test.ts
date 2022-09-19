import { FixedBitfieldEncoder } from "../../../../src/encoder/datatype/encoder/FixedBitfieldEncoder";
import { expect } from "chai";

describe("encoder.FixedBitfieldEncoder", (): void => {
  it("should encode [] to ''", (): void => {
    expect(FixedBitfieldEncoder.encode([], 2)).to.eql("00");
  });

  it("should encode [0] to '0'", (): void => {
    expect(FixedBitfieldEncoder.encode([0], 1)).to.eql("0");
  });

  it("should encode [1] '1'", (): void => {
    expect(FixedBitfieldEncoder.encode([1], 1)).to.eql("1");
  });

  it("should encode [0, 0] to '00'", (): void => {
    expect(FixedBitfieldEncoder.encode([0, 0], 2)).to.eql("00");
  });

  it("should encode [0, 1] to '01'", (): void => {
    expect(FixedBitfieldEncoder.encode([0, 1], 2)).to.eql("01");
  });

  it("should encode [1, 0] to '10'", (): void => {
    expect(FixedBitfieldEncoder.encode([1, 0], 2)).to.eql("10");
  });

  it("should encode [1, 1] to '11'", (): void => {
    expect(FixedBitfieldEncoder.encode([1, 1], 2)).to.eql("11");
  });

  it("should decode '' to []", (): void => {
    expect(FixedBitfieldEncoder.decode("")).to.eql([]);
  });

  it("should decode '0' string to [0]", (): void => {
    expect(FixedBitfieldEncoder.decode("0")).to.eql([0]);
  });

  it("should decode '1' string to 1", (): void => {
    expect(FixedBitfieldEncoder.decode("1")).to.eql([1]);
  });

  it("should decode '00' string to [0, 0]", (): void => {
    expect(FixedBitfieldEncoder.decode("00")).to.eql([0, 0]);
  });

  it("should decode '01' string to [0, 1]]", (): void => {
    expect(FixedBitfieldEncoder.decode("01")).to.eql([0, 1]);
  });

  it("should decode '10' string to [1, 0]", (): void => {
    expect(FixedBitfieldEncoder.decode("10")).to.eql([1, 0]);
  });

  it("should decode '11' string to [1, 1]", (): void => {
    expect(FixedBitfieldEncoder.decode("11")).to.eql([1, 1]);
  });

  it("should decode '2' to error", (): void => {
    expect(() => {
      FixedBitfieldEncoder.decode("2");
    }).to.throw();
  });
});
