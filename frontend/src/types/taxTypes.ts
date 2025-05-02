export interface Country {
  name: string;
  code: string;
  flag: string;
  region: string;
  corporateTaxRate: number;
  specialRegimes: boolean;
}

export interface TaxRoute {
  id: string;
  name: string;
  countries: Country[];
  effectiveTaxRate: number;
}

export interface TaxStrategy {
  id: string;
  name: string;
  description: string;
  countries: Country[];
}