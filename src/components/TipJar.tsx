import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Zap } from 'lucide-react';

export function TipJar({ className }: { className?: string }) {
  const [selectedTip, setSelectedTip] = useState<number | null>(5);

  return (
    <div className={cn("border-4 border-black p-6 sm:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]", className)}>
      <div className="flex items-start gap-4 mb-6">
        <div className="bg-[var(--color-sovereign-white)] p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Zap size={24} />
        </div>
        <div>
          <h3 className="font-display font-black text-2xl uppercase tracking-tighter leading-none mb-2">Fund the Truth</h3>
          <p className="font-sans text-sm font-bold text-gray-600">
            Independent journalism relies on direct support. If this briefing provided value, consider a micro-payment.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {[2, 5, 20].map((amount) => (
          <button
            key={amount}
            onClick={() => setSelectedTip(amount)}
            className={cn(
              "flex-1 min-w-[80px] py-3 font-black text-xl border-2 border-black transition-all",
              selectedTip === amount 
                ? "bg-black text-white shadow-none translate-y-1" 
                : "bg-white hover:bg-[var(--color-sovereign-red)] hover:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            )}
          >
            ${amount}
          </button>
        ))}
        <button
          onClick={() => setSelectedTip(null)}
          className={cn(
            "flex-1 min-w-[80px] py-3 font-black text-lg border-2 border-black transition-all",
            selectedTip === null 
              ? "bg-black text-white shadow-none translate-y-1" 
              : "bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          )}
        >
          Other
        </button>
      </div>

      <button className="w-full bg-black text-white py-4 font-black uppercase tracking-widest text-lg hover:bg-[var(--color-sovereign-gray)] transition-colors border-2 border-black">
        Support with {selectedTip ? `$${selectedTip}` : 'Custom Amount'}
      </button>
    </div>
  );
}
