import { BooleanEncoder } from "../../../../src/encoder/datatype/encoder/BooleanEncoder";
import { expect } from "chai";

describe("encoder.BooleanEncoder", (): void => {
  it("should encode false to '0'", (): void => {
    expect(BooleanEncoder.encode(false)).to.eql("0");
  });

  it("should encode true '1'", (): void => {
    expect(BooleanEncoder.encode(true)).to.eql("1");
  });

  it("should decode '0' string to false", (): void => {
    expect(BooleanEncoder.decode("0")).to.eql(false);
  });

  it("should decode '1' string to true", (): void => {
    expect(BooleanEncoder.decode("1")).to.eql(true);
  });

  it("should decode '' to error", (): void => {
    expect(() => {
      BooleanEncoder.decode("");
    }).to.throw();
  });

  it("should decode '2' to error", (): void => {
    expect(() => {
      BooleanEncoder.decode("");
    }).to.throw();
  });

  it("should decode '00' to error", (): void => {
    expect(() => {
      BooleanEncoder.decode("");
    }).to.throw();
  });

  it("should decode '01' to error", (): void => {
    expect(() => {
      BooleanEncoder.decode("");
    }).to.throw();
  });

  it("should decode '10' to error", (): void => {
    expect(() => {
      BooleanEncoder.decode("");
    }).to.throw();
  });
});
