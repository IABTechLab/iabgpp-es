import { FixedStringEncoder } from "../../../../src/encoder/datatype/encoder/FixedStringEncoder";
import { expect } from "chai";

describe("encoder.FixedStringEncoder", (): void => {
  it("should encode 'AB' to '000000000001'", (): void => {
    expect(FixedStringEncoder.encode("AB", 2)).to.eql("000000000001");
  });

  it("should encode true 'a'", (): void => {
    expect(FixedStringEncoder.encode("a", 2)).to.eql("100000111111");
  });

  it("should encode '1' to error", (): void => {
    expect(() => {
      FixedStringEncoder.encode("1", 2);
    }).to.throw();
  });

  it("should decode '000000000001' string to 'AB'", (): void => {
    expect(FixedStringEncoder.decode("000000000001")).to.eql("AB");
  });

  it("should decode '100000111111' string to 'a'", (): void => {
    expect(FixedStringEncoder.decode("100000111111")).to.eql("a");
  });

  it("should decode '2' to error", (): void => {
    expect(() => {
      FixedStringEncoder.decode("2");
    }).to.throw();
  });
});
