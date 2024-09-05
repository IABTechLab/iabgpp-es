import { FixedIntegerEncoder } from "../../../../src/encoder/datatype/encoder/FixedIntegerEncoder";
import { expect } from "chai";

describe("encoder.FixedIntegerEncoder", (): void => {
  it("should encode 0 to '1'", (): void => {
    expect(FixedIntegerEncoder.encode(0, 1)).to.eql("0");
  });

  it("should encode 0 padded 6 to '000000'", (): void => {
    expect(FixedIntegerEncoder.encode(0, 6)).to.eql("000000");
  });

  it("should encode 1 padded 1 to '1'", (): void => {
    expect(FixedIntegerEncoder.encode(1, 1)).to.eql("1");
  });

  it("should encode 1 padded 4 to '0001'", (): void => {
    expect(FixedIntegerEncoder.encode(1, 4)).to.eql("0001");
  });

  it("should encode 7 padded 8 to '00000111'", (): void => {
    expect(FixedIntegerEncoder.encode(7, 8)).to.eql("00000111");
  });

  it("should throw exception", (): void => {
    expect(function () {
      FixedIntegerEncoder.encode(8, 1);
    }).to.throw();
  });

  it("should decode '' to 0", (): void => {
    expect(FixedIntegerEncoder.decode("")).to.eql(0);
  });

  it("should decode '0' to 0", (): void => {
    expect(FixedIntegerEncoder.decode("0")).to.eql(0);
  });

  it("should decode '000000' to 0", (): void => {
    expect(FixedIntegerEncoder.decode("000000")).to.eql(0);
  });

  it("should decode '1' to 1", (): void => {
    expect(FixedIntegerEncoder.decode("1")).to.eql(1);
  });

  it("should decode '000001' to 1", (): void => {
    expect(FixedIntegerEncoder.decode("000001")).to.eql(1);
  });

  it("should decode '1000' string to 8", (): void => {
    expect(FixedIntegerEncoder.decode("1000")).to.eql(8);
  });

  it("should decode '0000001000' string to 8", (): void => {
    expect(FixedIntegerEncoder.decode("0000001000")).to.eql(8);
  });
});
