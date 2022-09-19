import { DatetimeEncoder } from "../../../../src/encoder/datatype/encoder/DatetimeEncoder";
import { expect } from "chai";

describe("encoder.DatetimeEncoder", (): void => {
  it("should encode and decode back to original value", (): void => {
    let date1 = new Date();
    let date2 = DatetimeEncoder.decode(DatetimeEncoder.encode(date1));
    expect(Math.round(date1.getTime() / 100) * 100).to.eql(date2.getTime());
  });
});
