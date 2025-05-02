import React from 'react';
import { DollarSign } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';
import { formatCurrency } from '../utils/formatters';

const IncomeInput: React.FC = () => {
  const { income, setIncome } = useTaxData();

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setIncome(value ? parseInt(value) : 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-navy-800 mb-4">Global Income</h3>
      
      <div className="mb-4">
        <label htmlFor="income" className="block text-sm font-medium text-slate-700 mb-1">
          Annual Corporate Income
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            name="income"
            id="income"
            className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-slate-300 rounded-md"
            placeholder="0.00"
            value={formatCurrency(income, false)}
            onChange={handleIncomeChange}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-500 sm:text-sm">USD</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <button
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded text-sm transition-colors"
          onClick={() => setIncome(1000000)}
        >
          $1M
        </button>
        <button
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded text-sm transition-colors"
          onClick={() => setIncome(10000000)}
        >
          $10M
        </button>
        <button
          className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded text-sm transition-colors"
          onClick={() => setIncome(100000000)}
        >
          $100M
        </button>
      </div>
    </div>
  );
};

export default IncomeInput;