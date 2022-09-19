export abstract class AbstractEncodableBitStringDataType<T> {
  protected value: T;

  constructor(value?: T) {
    this.value = value;
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

  abstract encode(): string;
  abstract decode(bitString: string): void;
  abstract substring(bitString: string, fromIndex: number): string;
}
