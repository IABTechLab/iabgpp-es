export class RangeEntry {
  private key: number;
  private type: number;
  private ids: number[];

  constructor(key: number, type: number, ids: number[]) {
    this.key = key;
    this.type = type;
    this.ids = ids;
  }

  public getKey(): number {
    return this.key;
  }

  public setKey(key: number): void {
    this.key = key;
  }

  public getType(): number {
    return this.type;
  }

  public setType(type: number): void {
    this.type = type;
  }

  public getIds(): number[] {
    return this.ids;
  }

  public setIds(ids: number[]): void {
    this.ids = ids;
  }
}
