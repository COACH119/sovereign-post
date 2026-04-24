import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { LiveTicker } from '../components/LiveTicker';

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[var(--color-sovereign-black)] selection:text-white bg-[var(--color-sovereign-white)]">
      <ReadingProgressBar />
      <LiveTicker />
      
      <header className="container mx-auto px-4 py-8 border-b-8 border-[var(--color-sovereign-black)] bg-white relative">
        <div className="mb-4">
          <Link to="/" className="block relative group">
            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-center uppercase tracking-tighter italic leading-[0.85] w-full break-words">
              THE SOVEREIGN <span className="text-[var(--color-sovereign-red)]">POST</span>
            </h1>
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row justify-between items-center mt-6 border-t-[3px] border-black pt-4 font-bold uppercase text-[10px] md:text-xs tracking-widest gap-4">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 items-center w-full lg:w-auto">
             <span>Nairobi, Kenya • April 2026</span>
             <span className="hidden md:inline">|</span>
             <span className="text-[var(--color-sovereign-red)] text-center">Shaping the World Daily</span>
          </div>
          
          <nav className="flex flex-wrap justify-center items-center gap-4 md:gap-6 w-full lg:w-auto mt-2 lg:mt-0">
            {['Politics', 'Global', 'Industry', 'Sports'].map(cat => (
              <Link 
                key={cat} 
                to={`/?category=${cat.toLowerCase()}`}
                className="hover:text-[var(--color-sovereign-red)] transition-colors"
              >
                {cat}
              </Link>
            ))}
            <Link 
              to="/submit"
              className="text-[var(--color-sovereign-red)] hover:text-black transition-colors"
            >
              Write for Us
            </Link>
            <Link 
              to="/editorial"
              className="px-2 py-1 bg-black text-white hover:bg-[var(--color-sovereign-red)] transition-colors"
            >
              Editorial
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="h-12 border-t-4 border-black bg-white flex items-center px-4 md:px-8 justify-between mt-auto sticky bottom-0 z-50">
        <div className="flex gap-6 text-[10px] font-black uppercase overflow-hidden whitespace-nowrap">
          <div className="hidden sm:block">Latest: <span className="text-[var(--color-sovereign-red)]">China expands battery ban</span></div>
          <div className="hidden md:block">Trend: <span className="text-gray-500">NBA Broadcast Rights</span></div>
          <div className="sm:hidden block">The Sovereign Post Network</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-black uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="hidden sm:inline">Edge Network Active (42ms)</span>
            <span className="sm:hidden inline">Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
