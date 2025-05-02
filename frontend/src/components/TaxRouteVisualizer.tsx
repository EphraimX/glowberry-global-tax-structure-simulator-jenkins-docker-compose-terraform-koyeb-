import React, { useEffect, useRef } from 'react';
import { ArrowRight, DollarSign } from 'lucide-react';
import { useTaxData } from '../context/TaxDataContext';
import { formatCurrency, formatPercentage } from '../utils/formatters';

const TaxRouteVisualizer: React.FC = () => {
  const { selectedCountries, income, effectiveTaxRate } = useTaxData();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation for money flow visualization
  useEffect(() => {
    if (!canvasRef.current || selectedCountries.length < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw flow lines (simplified version)
    const drawFlowLines = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerY = canvas.height / 2;
      const stepX = canvas.width / (selectedCountries.length + 1);

      // Draw connecting lines
      ctx.beginPath();
      ctx.moveTo(stepX, centerY);
      for (let i = 1; i < selectedCountries.length; i++) {
        ctx.lineTo((i + 1) * stepX, centerY);
      }
      ctx.strokeStyle = '#059669'; // emerald-600
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw animated money particles
      const time = Date.now() / 1000;
      for (let i = 0; i < selectedCountries.length - 1; i++) {
        const x = stepX + i * stepX + (stepX * (time % 1));
        const y = centerY;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#059669';
        ctx.fill();
      }

      requestAnimationFrame(drawFlowLines);
    };

    const animation = requestAnimationFrame(drawFlowLines);
    return () => cancelAnimationFrame(animation);
  }, [selectedCountries]);

  // Tax calculations for each step
  const calculateStepTaxes = () => {
    if (selectedCountries.length === 0) return [];

    const steps = [];
    let remainingIncome = income;
    let totalTaxPaid = 0;

    for (let i = 0; i < selectedCountries.length; i++) {
      const country = selectedCountries[i];
      const taxRate = country.corporateTaxRate / 100;
      const taxAmount = remainingIncome * taxRate;
      
      totalTaxPaid += taxAmount;
      remainingIncome -= taxAmount;
      
      const effectiveRateSoFar = (totalTaxPaid / income) * 100;
      
      steps.push({
        country,
        incomingAmount: i === 0 ? income : steps[i - 1].remainingAmount,
        taxAmount,
        remainingAmount: remainingIncome,
        effectiveRateSoFar
      });
    }

    return steps;
  };

  const taxSteps = calculateStepTaxes();

  if (selectedCountries.length < 2) {
    return (
      <div className="bg-white p-6 rounded-lg shadow border border-slate-200 text-center py-12">
        <h3 className="text-lg font-medium text-slate-800 mb-2">
          Please select at least two countries
        </h3>
        <p className="text-slate-600">
          To visualize a tax route, you need to select two or more countries.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-navy-800 mb-4">
        Tax Flow Visualization
      </h3>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-sm font-medium text-slate-700">Starting Income:</span>
            <span className="ml-2 text-lg font-semibold text-navy-800">
              {formatCurrency(income)}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-slate-700">Effective Tax Rate:</span>
            <span className="ml-2 text-lg font-semibold text-emerald-600">
              {formatPercentage(effectiveTaxRate)}
            </span>
          </div>
        </div>
        
        {/* Canvas for animated visualization */}
        <div className="relative h-16 my-4">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full absolute top-0 left-0"
          ></canvas>
          <div className="flex justify-between relative z-10">
            {selectedCountries.map((country, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center shadow-sm border border-slate-200">
                  <span className="text-lg">{country.flag}</span>
                </div>
                <span className="text-xs font-medium mt-1">{country.code}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Detailed tax calculation steps */}
      <div className="mt-8">
        <h4 className="text-sm font-semibold uppercase text-slate-500 mb-3">
          Step-by-Step Tax Calculation
        </h4>
        
        <div className="space-y-4">
          {taxSteps.map((step, index) => (
            <div key={index} className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">{step.country.flag}</span>
                <span className="font-medium text-navy-800">{step.country.name}</span>
                <span className="ml-2 px-2 py-0.5 bg-slate-200 rounded text-xs">
                  Tax Rate: {step.country.corporateTaxRate}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="text-xs text-slate-500">Incoming Amount</div>
                  <div className="font-medium">{formatCurrency(step.incomingAmount)}</div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500">Tax Paid</div>
                  <div className="font-medium text-red-600">
                    {formatCurrency(step.taxAmount)}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500">Remaining After Tax</div>
                  <div className="font-medium text-emerald-600">
                    {formatCurrency(step.remainingAmount)}
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-slate-500">Effective Rate So Far</div>
                  <div className="font-medium">
                    {formatPercentage(step.effectiveRateSoFar)}
                  </div>
                </div>
              </div>
              
              {index < taxSteps.length - 1 && (
                <div className="flex justify-center my-2">
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-md">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
            <span className="font-medium text-emerald-800">Final Tax Summary</span>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-xs text-emerald-700">Starting Amount</div>
              <div className="font-medium">{formatCurrency(income)}</div>
            </div>
            <div>
              <div className="text-xs text-emerald-700">Final Amount</div>
              <div className="font-medium">
                {formatCurrency(taxSteps[taxSteps.length - 1]?.remainingAmount || 0)}
              </div>
            </div>
            <div>
              <div className="text-xs text-emerald-700">Total Tax Paid</div>
              <div className="font-medium text-red-600">
                {formatCurrency(income - (taxSteps[taxSteps.length - 1]?.remainingAmount || 0))}
              </div>
            </div>
            <div>
              <div className="text-xs text-emerald-700">Effective Tax Rate</div>
              <div className="font-medium text-navy-800">{formatPercentage(effectiveTaxRate)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxRouteVisualizer;