export abstract class AbstractEncodableBitStringDataType<T> {
  // this if for backwards compatibility with the newer fields
  protected hardFailIfMissing: boolean;
  protected value: T;

  constructor(hardFailIfMising: boolean = true) {
    this.hardFailIfMissing = hardFailIfMising;
  }

  public hasValue(): boolean {
    return this.value !== undefined && this.value !== null;
  }

  public getValue(): T {
    return this.value;
  }

  public setValue(value: T) {
    this.value = value;
  }

  public getHardFailIfMissing(): boolean {
    return this.hardFailIfMissing;
  }

  abstract encode(): string;
  abstract decode(bitString: string): void;
  abstract substring(bitString: string, fromIndex: number): string;
}
