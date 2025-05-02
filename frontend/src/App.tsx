import React from 'react';
import { Globe } from 'lucide-react';
import TaxSimulator from './components/TaxSimulator';
import { TaxDataProvider } from './context/TaxDataContext';

function App() {
  return (
    <TaxDataProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-emerald-400" />
              <h1 className="text-2xl font-bold">Glowberry</h1>
            </div>
            <div className="text-sm font-medium">
              Global Tax Structure Simulator
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <TaxSimulator />
        </main>

        {/* Footer */}
        <footer className="bg-navy-900 text-slate-300 p-4 mt-auto">
          <div className="container mx-auto text-center text-sm">
            <p>
              Glowberry Tax Simulator © {new Date().getFullYear()} | 
              <span className="text-xs text-slate-400 ml-2">
                For educational purposes only. Not financial advice.
              </span>
            </p>
          </div>
        </footer>
      </div>
    </TaxDataProvider>
  );
}

export default App;