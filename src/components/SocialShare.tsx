import React from 'react';
import { Twitter, Facebook, Linkedin, Link2 } from 'lucide-react';
import { cn } from '../lib/utils';

export function SocialShare({ className }: { className?: string }) {
  const shareLinks = [
    { name: 'X', icon: 'X', color: 'hover:bg-black hover:text-white', href: '#' },
    { name: 'FB', icon: 'FB', color: 'hover:bg-blue-600 hover:text-white', href: '#' },
    { name: 'LI', icon: 'LI', color: 'hover:bg-blue-700 hover:text-white', href: '#' },
  ];

  return (
    <div className={cn("flex flex-col items-center gap-8 py-12", className)}>
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className={cn(
            "w-10 h-10 border-2 border-black flex items-center justify-center font-black transition-all duration-200",
            "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white",
            link.color
          )}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </a>
      ))}
      <button
        className={cn(
          "w-10 h-10 border-2 border-black flex items-center justify-center font-black transition-all duration-200 text-black bg-white",
          "hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[var(--color-sovereign-white)]"
        )}
        aria-label="Copy Link"
        onClick={() => alert('Link copied to clipboard!')}
      >
        <Link2 size={20} />
      </button>
      <div className="flex-1 border-l-2 border-black min-h-[100px] mt-4"></div>
    </div>
  );
}
