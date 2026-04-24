import React from 'react';

export function LiveTicker() {
  const newsItems = [
    { tag: "LIVE", text: "Global Markets: Tech stocks surge 4% in morning trade" },
    { tag: "POLITICS", text: "New policy shift expected in Nairobi City Hall" },
    { tag: "SPORTS", text: "Premier League transfer window closes in 2 hours" },
    { tag: "TRENDING", text: "The Sports Betting Revolution in Kenya" },
    { tag: "FINANCE", text: "Crypto Regulations: What the Industry Fears" },
  ];

  // Repeat enough times to fill any screen and allow seamless -50% translation
  const scrollingItems = [...newsItems, ...newsItems, ...newsItems, ...newsItems];

  return (
    <div className="bg-[var(--color-sovereign-black)] text-[var(--color-sovereign-white)] py-2 overflow-hidden border-b-2 border-[var(--color-sovereign-red)] flex items-center relative h-12">
      <div className="bg-[var(--color-sovereign-red)] px-4 py-2 z-20 font-bold italic absolute left-0 h-full flex items-center shadow-[4px_0px_10px_0px_rgba(0,0,0,0.5)]">
        <span className="animate-pulse">LATEST</span>
      </div>
      {/* Placed a left margin that clears the 'LATEST' box */}
      <div className="flex whitespace-nowrap animate-ticker-scroll hover:[animation-play-state:paused] w-max pl-28">
        {scrollingItems.map((item, i) => (
          <span key={i} className="mx-8 flex items-center space-x-3">
            <span className="text-[var(--color-sovereign-red)] font-black underline">{item.tag}</span>
            <span className="font-medium text-sm tracking-wide uppercase">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
