import React, { useState } from 'react';
import { cn } from '../lib/utils';

export function NewsletterSignup({ className }: { className?: string }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className={cn("border-4 border-black p-5 bg-[var(--color-sovereign-white)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]", className)}>
      <h3 className="font-display font-black uppercase text-lg leading-none mb-2">The Briefing</h3>
      <p className="font-sans text-black text-xs font-bold mb-4">
        Join 45k+ industry leaders receiving our deep-dives.
      </p>

      {subscribed ? (
        <div className="bg-black text-white font-black p-3 text-center text-xs uppercase tracking-widest">
          You're on the list.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL ADDRESS"
            className="w-full border-2 border-black p-2 text-[10px] font-bold placeholder:text-black/30 bg-white focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white font-black py-2 text-xs uppercase tracking-widest hover:bg-[var(--color-sovereign-red)] transition-colors"
          >
            Join Now
          </button>
        </form>
      )}
    </div>
  );
}
