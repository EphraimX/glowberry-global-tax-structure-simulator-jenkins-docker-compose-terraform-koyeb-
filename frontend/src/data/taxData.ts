import { Country, TaxStrategy } from '../types/taxTypes';

// Sample tax data for simulation purposes
export const taxData = {
  countries: [
    {
      name: 'United States',
      code: 'US',
      flag: '🇺🇸',
      region: 'North America',
      corporateTaxRate: 21,
      specialRegimes: false
    },
    {
      name: 'Ireland',
      code: 'IE',
      flag: '🇮🇪',
      region: 'Europe',
      corporateTaxRate: 12.5,
      specialRegimes: true
    },
    {
      name: 'Netherlands',
      code: 'NL',
      flag: '🇳🇱',
      region: 'Europe',
      corporateTaxRate: 25,
      specialRegimes: true
    },
    {
      name: 'United Kingdom',
      code: 'GB',
      flag: '🇬🇧',
      region: 'Europe',
      corporateTaxRate: 19,
      specialRegimes: false
    },
    {
      name: 'Singapore',
      code: 'SG',
      flag: '🇸🇬',
      region: 'Asia',
      corporateTaxRate: 17,
      specialRegimes: true
    },
    {
      name: 'Switzerland',
      code: 'CH',
      flag: '🇨🇭',
      region: 'Europe',
      corporateTaxRate: 14.9,
      specialRegimes: true
    },
    {
      name: 'Luxembourg',
      code: 'LU',
      flag: '🇱🇺',
      region: 'Europe',
      corporateTaxRate: 24.94,
      specialRegimes: true
    },
    {
      name: 'Hong Kong',
      code: 'HK',
      flag: '🇭🇰',
      region: 'Asia',
      corporateTaxRate: 16.5,
      specialRegimes: true
    },
    {
      name: 'Bermuda',
      code: 'BM',
      flag: '🇧🇲',
      region: 'Caribbean',
      corporateTaxRate: 0,
      specialRegimes: true
    },
    {
      name: 'Cayman Islands',
      code: 'KY',
      flag: '🇰🇾',
      region: 'Caribbean',
      corporateTaxRate: 0,
      specialRegimes: true
    },
    {
      name: 'UAE',
      code: 'AE',
      flag: '🇦🇪',
      region: 'Middle East',
      corporateTaxRate: 9,
      specialRegimes: true
    },
    {
      name: 'Mauritius',
      code: 'MU',
      flag: '🇲🇺',
      region: 'Africa',
      corporateTaxRate: 15,
      specialRegimes: true
    },
    {
      name: 'Nigeria',
      code: 'NG',
      flag: '🇳🇬',
      region: 'Africa',
      corporateTaxRate: 30,
      specialRegimes: false
    },
    {
      name: 'Germany',
      code: 'DE',
      flag: '🇩🇪',
      region: 'Europe',
      corporateTaxRate: 30,
      specialRegimes: false
    },
    {
      name: 'France',
      code: 'FR',
      flag: '🇫🇷',
      region: 'Europe',
      corporateTaxRate: 25,
      specialRegimes: false
    },
    {
      name: 'Japan',
      code: 'JP',
      flag: '🇯🇵',
      region: 'Asia',
      corporateTaxRate: 30.62,
      specialRegimes: false
    }
  ] as Country[],
  
  strategies: [
    {
      id: 'double-irish',
      name: 'Double Irish',
      description: 'A tax strategy that involves routing profits through Irish companies and using tax havens.',
      countries: [
        {
          name: 'United States',
          code: 'US',
          flag: '🇺🇸',
          region: 'North America',
          corporateTaxRate: 21,
          specialRegimes: false
        },
        {
          name: 'Ireland',
          code: 'IE',
          flag: '🇮🇪',
          region: 'Europe',
          corporateTaxRate: 12.5,
          specialRegimes: true
        },
        {
          name: 'Bermuda',
          code: 'BM',
          flag: '🇧🇲',
          region: 'Caribbean',
          corporateTaxRate: 0,
          specialRegimes: true
        }
      ]
    },
    {
      id: 'dutch-sandwich',
      name: 'Dutch Sandwich',
      description: 'A tax avoidance strategy that uses a combination of Irish and Dutch companies to shift profits to low-tax jurisdictions.',
      countries: [
        {
          name: 'United States',
          code: 'US',
          flag: '🇺🇸',
          region: 'North America',
          corporateTaxRate: 21,
          specialRegimes: false
        },
        {
          name: 'Ireland',
          code: 'IE',
          flag: '🇮🇪',
          region: 'Europe',
          corporateTaxRate: 12.5,
          specialRegimes: true
        },
        {
          name: 'Netherlands',
          code: 'NL',
          flag: '🇳🇱',
          region: 'Europe',
          corporateTaxRate: 25,
          specialRegimes: true
        },
        {
          name: 'Bermuda',
          code: 'BM',
          flag: '🇧🇲',
          region: 'Caribbean',
          corporateTaxRate: 0,
          specialRegimes: true
        }
      ]
    },
    {
      id: 'singapore-route',
      name: 'Singapore Hub',
      description: 'Using Singapore as a regional headquarters to benefit from its tax incentives and extensive treaty network.',
      countries: [
        {
          name: 'Japan',
          code: 'JP',
          flag: '🇯🇵',
          region: 'Asia',
          corporateTaxRate: 30.62,
          specialRegimes: false
        },
        {
          name: 'Singapore',
          code: 'SG',
          flag: '🇸🇬',
          region: 'Asia',
          corporateTaxRate: 17,
          specialRegimes: true
        },
        {
          name: 'Hong Kong',
          code: 'HK',
          flag: '🇭🇰',
          region: 'Asia',
          corporateTaxRate: 16.5,
          specialRegimes: true
        }
      ]
    },
    {
      id: 'mauritius-africa',
      name: 'Mauritius-Africa Route',
      description: 'Using Mauritius as a gateway for investments into African countries to benefit from tax treaties.',
      countries: [
        {
          name: 'Nigeria',
          code: 'NG',
          flag: '🇳🇬',
          region: 'Africa',
          corporateTaxRate: 30,
          specialRegimes: false
        },
        {
          name: 'Mauritius',
          code: 'MU',
          flag: '🇲🇺',
          region: 'Africa',
          corporateTaxRate: 15,
          specialRegimes: true
        },
        {
          name: 'UAE',
          code: 'AE',
          flag: '🇦🇪',
          region: 'Middle East',
          corporateTaxRate: 9,
          specialRegimes: true
        }
      ]
    }
  ] as TaxStrategy[]
};