export class ConsentLanguages {
  private static readonly langSet: Set<string> = new Set([
    'AR',
    'BG',
    'BS',
    'CA',
    'CS',
    'CY',
    'DA',
    'DE',
    'EL',
    'EN',
    'ES',
    'ET',
    'EU',
    'FI',
    'FR',
    'GL',
    'HE',
    'HR',
    'HU',
    'ID',
    'IT',
    'JA',
    'KA',
    'KO',
    'LT',
    'LV',
    'MK',
    'MS',
    'MT',
    'NL',
    'NO',
    'PL',
    'PT-BR',
    'PT-PT',
    'RO',
    'RU',
    'SK',
    'SL',
    'SQ',
    'SR-LATN',
    'SR-CYRL',
    'SV',
    'SW',
    'TH',
    'TL',
    'TR',
    'UK',
    'VI',
    'ZH',
  ]);

  public has(key: string): boolean {
    return ConsentLanguages.langSet.has(key);
  }

  public forEach(callback: (key: string) => void): void {
    ConsentLanguages.langSet.forEach(callback);
  }

  public get size(): number {
    return ConsentLanguages.langSet.size;
  }
}
