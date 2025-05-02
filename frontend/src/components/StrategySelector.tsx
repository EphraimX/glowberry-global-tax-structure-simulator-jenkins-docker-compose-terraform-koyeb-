import React from 'react';
import { LightbulbIcon, Info } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';

const StrategySelector: React.FC = () => {
  const { strategies, setSelectedCountries } = useTaxData();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy-800">Common Tax Strategies</h3>
        <button 
          className="text-xs flex items-center text-slate-500 hover:text-navy-800"
        >
          <Info className="h-4 w-4 mr-1" />
          Learn more
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {strategies.map((strategy) => (
          <div 
            key={strategy.id}
            className="border border-slate-200 rounded-md p-4 hover:border-emerald-300 hover:bg-emerald-50 transition-colors cursor-pointer"
            onClick={() => setSelectedCountries(strategy.countries)}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <LightbulbIcon className="h-5 w-5 text-gold-500" />
              </div>
              <div>
                <h4 className="font-medium text-navy-800">{strategy.name}</h4>
                <p className="mt-1 text-sm text-slate-600">{strategy.description}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {strategy.countries.map((country, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center text-xs bg-slate-100 px-2 py-1 rounded"
                    >
                      <span className="mr-1">{country.flag}</span>
                      {country.code}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StrategySelector;