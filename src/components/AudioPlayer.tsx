import React, { useState } from 'react';
import { Play, Pause, Volume2, Headphones } from 'lucide-react';
import { cn } from '../lib/utils';

export function AudioPlayer({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={cn("border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center p-3 gap-4", className)}>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 flex-shrink-0 bg-[var(--color-sovereign-white)] border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
      >
        {isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}
      </button>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
          <Headphones size={14} className="text-[var(--color-sovereign-gray)]" />
          <span className="text-[10px] font-black uppercase tracking-widest">AI Executive Voiceover</span>
        </div>
        <div className="h-2 w-full bg-gray-200 border border-black relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[var(--color-sovereign-red)] transition-all duration-1000 ease-linear"
            style={{ width: isPlaying ? '100%' : '0%' }}
          />
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all">
        <Volume2 size={20} />
      </button>
    </div>
  );
}
