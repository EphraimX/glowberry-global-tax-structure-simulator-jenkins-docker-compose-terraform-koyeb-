import React from 'react';
import { TrendingDown, DollarSign, Percent } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const ResultsDisplay: React.FC = () => {
  const { selectedCountries, income, effectiveTaxRate, taxSaved } = useTaxData();

  // Find the highest tax rate country in the dataset for comparison
  const { countries } = useTaxData();
  const highestTaxCountry = [...countries].sort((a, b) => b.corporateTaxRate - a.corporateTaxRate)[0];
  const highestTaxRate = highestTaxCountry?.corporateTaxRate || 0;
  
  const taxWithoutOptimization = income * (highestTaxRate / 100);
  const taxAfterOptimization = income * (effectiveTaxRate / 100);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 sticky top-4">
      <h3 className="text-lg font-semibold text-navy-800 mb-4">Tax Optimization Results</h3>
      
      {selectedCountries.length === 0 ? (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-md text-center">
          <p className="text-slate-600">Select countries to see tax calculations</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
              <div className="flex items-center text-navy-800">
                <Percent className="h-5 w-5 mr-2 text-emerald-600" />
                <span className="font-medium">Effective Tax Rate</span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold text-emerald-600">
                  {formatPercentage(effectiveTaxRate)}
                </span>
                <div className="mt-1 text-sm text-slate-600">
                  vs {formatPercentage(highestTaxRate)} without optimization
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
              <div className="flex items-center text-navy-800">
                <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                <span className="font-medium">Tax Amount</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(taxAfterOptimization)}
                </span>
                <div className="mt-1 text-sm text-slate-600">
                  vs {formatCurrency(taxWithoutOptimization)} without optimization
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-emerald-50 rounded-md border border-emerald-200">
              <div className="flex items-center text-emerald-800">
                <TrendingDown className="h-5 w-5 mr-2 text-emerald-600" />
                <span className="font-medium">Tax Savings</span>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-emerald-600">
                  {formatCurrency(taxSaved)}
                </span>
                <div className="mt-1 text-sm text-emerald-700">
                  {formatPercentage((taxSaved / taxWithoutOptimization) * 100)} reduction
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-slate-500">
            <p>
              This simulation is based on corporate income tax rates and doesn't account for all 
              tax considerations like VAT, withholding taxes, or industry-specific regulations.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsDisplay;