export interface EncodableSection {
  getId(): number;

  getName(): string;

  hasField(fieldName: string): boolean;

  getFieldValue(fieldName: string): any;

  setFieldValue(fieldName: string, value: any): void;

  /**
   * @deprecated Merges all segments into one flat object. Use toSegments(), which matches the
   * array-of-segments shape defined by the GPP CMP API spec for getSection.
   */
  toObj(): any;

  /** Returns one object per segment, as defined by the GPP CMP API spec. */
  toSegments(): any[];

  encode(): string;

  decode(encodedString: string): void;

  setIsDirty(status: boolean): void;
}
