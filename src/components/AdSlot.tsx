import React from 'react';
import { cn } from '../lib/utils';

interface AdSlotProps {
  id: string;
  key?: string | number;
  width?: number | string;
  height?: number | string;
  className?: string;
  label?: string;
}

export function AdSlot({ id, width = '100%', height = 250, className, label = "Advertisement" }: AdSlotProps) {
  return (
    <div
      id={`ad-slot-${id}`}
      className={cn(
        "relative flex flex-col items-center justify-center bg-zinc-200 border-2 border-dashed border-zinc-400 my-8 overflow-hidden",
        className
      )}
      style={{
        minWidth: width,
        minHeight: height,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
    >
      <div className="absolute top-1 left-1 text-[9px] uppercase font-bold text-zinc-500 w-full px-2">ADVERTISEMENT</div>
      <div className="text-zinc-400 font-bold uppercase tracking-widest text-center px-4">
        Slot Reserved:<br/>{width}x{height}
      </div>
      {/* Google AdSense Script would be injected here in production */}
    </div>
  );
}
