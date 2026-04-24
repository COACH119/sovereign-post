import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, PenTool } from 'lucide-react';
import { AuthorBio } from '../components/AuthorBio';

export function AuthorProfilePage() {
  const { name } = useParams<{ name: string }>();
  // Revert slugification back to name where possible, or just display the slug niceley.
  const displayTitle = name?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown Author';

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:text-[var(--color-sovereign-red)] transition-colors">
          <ArrowLeft size={16} /> Back to Front Page
        </Link>
      </div>
      
      <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row gap-8 items-start">
           <div className="w-full">
              <h1 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Author Profile</h1>
              {/* Reuse our Author Bio component to fetch real data */}
              <AuthorBio authorName={displayTitle} />
           </div>
        </div>
      </div>

      <div className="mt-16 border-t-8 border-black pt-12">
        <h2 className="font-display font-black text-3xl uppercase tracking-tighter mb-8 flex items-center gap-3">
          <PenTool className="text-[var(--color-sovereign-red)]" /> Recent Dispatch
        </h2>
        <div className="bg-gray-100 p-8 border-2 border-black text-center">
           <p className="font-bold text-gray-500 uppercase tracking-widest">More content loading...</p>
        </div>
      </div>
    </div>
  );
}
