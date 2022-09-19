import { FibonacciIntegerEncoder } from "../../../../src/encoder/datatype/encoder/FibonacciIntegerEncoder";
import { expect } from "chai";

describe("encoder.FibonacciIntegerEncoder", (): void => {
  it("should encode 1 to '11'", (): void => {
    expect(FibonacciIntegerEncoder.encode(1)).to.eql("11");
  });

  it("should encode 2 to '011'", (): void => {
    expect(FibonacciIntegerEncoder.encode(2)).to.eql("011");
  });

  it("should encode 3 to '0011'", (): void => {
    expect(FibonacciIntegerEncoder.encode(3)).to.eql("0011");
  });

  it("should encode 4 to '1011'", (): void => {
    expect(FibonacciIntegerEncoder.encode(4)).to.eql("1011");
  });

  it("should encode 5 to '00011'", (): void => {
    expect(FibonacciIntegerEncoder.encode(5)).to.eql("00011");
  });

  it("should encode 6 to '10011'", (): void => {
    expect(FibonacciIntegerEncoder.encode(6)).to.eql("10011");
  });

  it("should encode 7 to '01011'", (): void => {
    expect(FibonacciIntegerEncoder.encode(7)).to.eql("01011");
  });

  it("should decode '11' to 1", (): void => {
    expect(FibonacciIntegerEncoder.decode("11")).to.eql(1);
  });

  it("should decode '011' to 2", (): void => {
    expect(FibonacciIntegerEncoder.decode("011")).to.eql(2);
  });

  it("should decode '0011' to 3", (): void => {
    expect(FibonacciIntegerEncoder.decode("0011")).to.eql(3);
  });

  it("should decode '1011' to 4", (): void => {
    expect(FibonacciIntegerEncoder.decode("1011")).to.eql(4);
  });

  it("should decode '00011' to 5", (): void => {
    expect(FibonacciIntegerEncoder.decode("00011")).to.eql(5);
  });

  it("should decode '10011' to 6", (): void => {
    expect(FibonacciIntegerEncoder.decode("10011")).to.eql(6);
  });

  it("should decode '01011' to 7", (): void => {
    expect(FibonacciIntegerEncoder.decode("01011")).to.eql(7);
  });

  it("should decode '110' to error", (): void => {
    expect(() => {
      FibonacciIntegerEncoder.decode("110");
    }).to.throw();
  });

  it("should decode '1100' to 1", (): void => {
    expect(() => {
      FibonacciIntegerEncoder.decode("1100");
    }).to.throw();
  });

  it("should decode '0110000000' to error", (): void => {
    expect(() => {
      FibonacciIntegerEncoder.decode("0110000000");
    }).to.throw();
  });
});
