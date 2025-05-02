import React, { useState } from 'react';
import { X, Plus, ArrowRight } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';
import { Country } from '../types/taxTypes';

const CountrySelector: React.FC = () => {
  const { countries, selectedCountries, addCountryToRoute, removeCountryFromRoute } = useTaxData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter(
    country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-navy-800 mb-4">
        Create Your Tax Route
      </h3>
      
      {/* Selected countries route visualization */}
      {selectedCountries.length > 0 ? (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-600 mb-2">Current Tax Route:</h4>
          <div className="flex flex-wrap items-center gap-2">
            {selectedCountries.map((country, index) => (
              <React.Fragment key={country.code}>
                <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded">
                  <span className="mr-1">{country.flag}</span>
                  <span className="mr-2 font-medium">{country.name}</span>
                  <span className="text-xs bg-slate-200 px-1.5 py-0.5 rounded mr-2">
                    {country.corporateTaxRate}%
                  </span>
                  <button 
                    onClick={() => removeCountryFromRoute(index)}
                    className="text-slate-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {index < selectedCountries.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-slate-400 mx-1" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-md text-center">
          <p className="text-slate-600">Start by selecting countries for your tax route</p>
        </div>
      )}

      {/* Country search */}
      <div className="mb-4">
        <label htmlFor="countrySearch" className="block text-sm font-medium text-slate-700 mb-1">
          Search Countries
        </label>
        <input
          type="text"
          id="countrySearch"
          placeholder="Search by name or code..."
          className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        {filteredCountries.map((country) => (
          <CountryCard 
            key={country.code} 
            country={country} 
            onSelect={() => addCountryToRoute(country)}
            isSelected={selectedCountries.some(c => c.code === country.code)}
          />
        ))}
      </div>
    </div>
  );
};

interface CountryCardProps {
  country: Country;
  onSelect: () => void;
  isSelected: boolean;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onSelect, isSelected }) => {
  return (
    <div className={`
      p-3 rounded-md border cursor-pointer transition-all
      ${isSelected 
        ? 'border-emerald-500 bg-emerald-50' 
        : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300'}
    `}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <span className="text-xl mr-2">{country.flag}</span>
            <span className="font-medium">{country.name}</span>
          </div>
          <div className="mt-1 text-sm text-slate-600">{country.region}</div>
        </div>
        
        <button 
          onClick={onSelect}
          disabled={isSelected}
          className={`
            rounded-full p-1
            ${isSelected 
              ? 'bg-emerald-100 text-emerald-600 cursor-not-allowed' 
              : 'bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600'}
          `}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      
      <div className="mt-2 flex justify-between text-sm">
        <span>Corporate Tax:</span>
        <span className="font-semibold">{country.corporateTaxRate}%</span>
      </div>
      
      {country.specialRegimes && (
        <div className="mt-1">
          <span className="inline-block px-2 py-0.5 text-xs bg-gold-100 text-gold-800 rounded">
            Special Tax Regime
          </span>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;