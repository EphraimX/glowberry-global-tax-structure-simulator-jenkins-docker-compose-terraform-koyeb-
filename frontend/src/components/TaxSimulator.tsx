import React, { useState } from 'react';
import { useTaxData } from '../context/TaxDataContext';
import IncomeInput from './IncomeInput';
import CountrySelector from './CountrySelector';
import TaxRouteVisualizer from './TaxRouteVisualizer';
import ResultsDisplay from './ResultsDisplay';
import StrategySelector from './StrategySelector';

const TaxSimulator: React.FC = () => {
  const { selectedCountries } = useTaxData();
  const [activeTab, setActiveTab] = useState<'build' | 'visualize'>('build');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">Tax Structure Simulator</h2>
        <p className="text-slate-600">
          Model how multinational corporations optimize tax liabilities through cross-border structures.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'build'
              ? 'text-emerald-600 border-b-2 border-emerald-600'
              : 'text-slate-600 hover:text-navy-800'
          }`}
          onClick={() => setActiveTab('build')}
        >
          Build Structure
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'visualize'
              ? 'text-emerald-600 border-b-2 border-emerald-600'
              : 'text-slate-600 hover:text-navy-800'
          }`}
          onClick={() => setActiveTab('visualize')}
          disabled={selectedCountries.length < 2}
        >
          Visualize Flow
        </button>
      </div>

      {activeTab === 'build' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <IncomeInput />
            <StrategySelector />
            <CountrySelector />
          </div>
          <div className="lg:col-span-1">
            <ResultsDisplay />
          </div>
        </div>
      ) : (
        <TaxRouteVisualizer />
      )}
    </div>
  );
};

export default TaxSimulator;