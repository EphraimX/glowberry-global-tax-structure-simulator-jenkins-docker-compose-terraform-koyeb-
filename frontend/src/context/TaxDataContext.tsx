import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Country, TaxStrategy, TaxRoute } from '../types/taxTypes';
import { taxData } from '../data/taxData';

interface TaxDataContextType {
  countries: Country[];
  strategies: TaxStrategy[];
  selectedCountries: Country[];
  income: number;
  effectiveTaxRate: number;
  taxSaved: number;
  setSelectedCountries: (countries: Country[]) => void;
  addCountryToRoute: (country: Country) => void;
  removeCountryFromRoute: (index: number) => void;
  setIncome: (amount: number) => void;
  calculateTaxes: () => void;
  selectedRoute: TaxRoute | null;
  setSelectedRoute: (route: TaxRoute | null) => void;
}

const TaxDataContext = createContext<TaxDataContextType | undefined>(undefined);

export const TaxDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>(taxData.countries);
  const [strategies, setStrategies] = useState<TaxStrategy[]>(taxData.strategies);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [income, setIncome] = useState<number>(1000000);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(0);
  const [taxSaved, setTaxSaved] = useState<number>(0);
  const [selectedRoute, setSelectedRoute] = useState<TaxRoute | null>(null);

  const addCountryToRoute = (country: Country) => {
    setSelectedCountries([...selectedCountries, country]);
  };

  const removeCountryFromRoute = (index: number) => {
    const newRoute = [...selectedCountries];
    newRoute.splice(index, 1);
    setSelectedCountries(newRoute);
  };

  const calculateTaxes = () => {
    if (selectedCountries.length === 0) {
      setEffectiveTaxRate(0);
      setTaxSaved(0);
      return;
    }

    // Simple calculation for MVP - in real app would be more complex
    let remainingIncome = income;
    let totalTax = 0;

    // Calculate the tax through the chain of countries
    for (let i = 0; i < selectedCountries.length; i++) {
      const country = selectedCountries[i];
      const taxAmount = remainingIncome * (country.corporateTaxRate / 100);
      totalTax += taxAmount;
      remainingIncome -= taxAmount;
    }

    // Calculate effective tax rate
    const effectiveRate = (totalTax / income) * 100;
    setEffectiveTaxRate(effectiveRate);

    // Calculate tax saved compared to highest tax rate country
    const highestTaxRate = Math.max(...countries.map(c => c.corporateTaxRate));
    const taxWithoutOptimization = income * (highestTaxRate / 100);
    setTaxSaved(taxWithoutOptimization - totalTax);
  };

  // Calculate taxes whenever relevant inputs change
  useEffect(() => {
    calculateTaxes();
  }, [selectedCountries, income]);

  const value = {
    countries,
    strategies,
    selectedCountries,
    income,
    effectiveTaxRate,
    taxSaved,
    setSelectedCountries,
    addCountryToRoute,
    removeCountryFromRoute,
    setIncome,
    calculateTaxes,
    selectedRoute,
    setSelectedRoute
  };

  return <TaxDataContext.Provider value={value}>{children}</TaxDataContext.Provider>;
};

export const useTaxData = () => {
  const context = useContext(TaxDataContext);
  if (context === undefined) {
    throw new Error('useTaxData must be used within a TaxDataProvider');
  }
  return context;
};