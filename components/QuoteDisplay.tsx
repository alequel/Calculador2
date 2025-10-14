
import React from 'react';
import type { Quote } from '../types';

interface QuoteDisplayProps {
  quote: Quote | null;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quote }) => {
  const QuoteRow: React.FC<{ label: string; value: string; isMuted?: boolean }> = ({ label, value, isMuted = false }) => (
    <div className={`flex justify-between items-center py-3 ${isMuted ? 'text-brand-muted' : 'text-brand-text'}`}>
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card sticky top-8">
      <h2 className="text-2xl font-bold text-brand-dark mb-1">Price Quote</h2>
      <p className="text-sm text-brand-muted mb-6">Your estimated cost is updated live.</p>
      
      <div className="space-y-1 divide-y divide-gray-100">
        {!quote ? (
          <div className="text-center py-16">
            <p className="text-brand-muted">Select a service to see your quote.</p>
          </div>
        ) : (
          <>
            <QuoteRow label="Base Generation Cost" value={formatCurrency(quote.baseGenerationCost)} />
            
            {quote.addOns.length > 0 && (
              <div className="pt-3">
                <span className="text-sm font-medium text-brand-text">Add-ons</span>
                {quote.addOns.map(item => (
                   <QuoteRow key={item.name} label={item.name} value={formatCurrency(item.cost)} isMuted />
                ))}
              </div>
            )}
            
            <div className="!mt-4 pt-4 border-t-2 border-gray-200">
              <QuoteRow label="Subtotal" value={formatCurrency(quote.subtotal)} />
              {quote.rushSurcharge > 0 && (
                 <QuoteRow label="Rush Order Surcharge" value={formatCurrency(quote.rushSurcharge)} isMuted />
              )}
            </div>

            <div className="!mt-4 pt-4 border-t-2 border-gray-200">
              <div className="flex justify-between items-center text-xl font-bold text-brand-dark">
                <span>Final Total</span>
                <span>{formatCurrency(quote.total)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuoteDisplay;
