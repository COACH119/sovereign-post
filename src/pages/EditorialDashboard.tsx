import React, { useState } from 'react';
import { ShieldCheck, Edit, CheckSquare, XSquare, Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

// Mock data to demonstrate the UI if Supabase is not connected yet
const MOCK_SUBMISSIONS = [
  { id: '1', title: 'The European Battery Mandate', author: 'guest_482', category: 'industry', status: 'pending', date: '2026-04-24T12:00:00Z' },
  { id: '2', title: 'Why Football Analytics is Failing Us', author: 'tactics_nerd', category: 'sports', status: 'pending', date: '2026-04-23T15:30:00Z' }
];

export function EditorialDashboard() {
  const [isAdmin, setIsAdmin] = useState(true); // In a real app, verify via Supabase Auth
  
  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 text-center">
        <Lock size={48} className="mx-auto mb-6 text-[var(--color-sovereign-red)]" />
        <h1 className="font-display font-black text-4xl uppercase mb-4">Restricted Access</h1>
        <p className="font-sans font-bold">You must be logged in as an Editor to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div className="border-b-4 border-black pb-8 mb-12 flex justify-between items-end">
        <div>
          <h1 className="font-display font-black text-5xl tracking-tighter uppercase mb-4 flex items-center gap-4">
            Editorial Desk <ShieldCheck className="text-[var(--color-sovereign-red)]" size={40} />
          </h1>
          <p className="font-sans text-xl font-bold text-gray-600">Review, edit, and approve community submissions.</p>
        </div>
        <div className="hidden md:block text-right">
          <p className="font-black text-3xl">2</p>
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-sovereign-red)]">Pending Review</p>
        </div>
      </div>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white font-black uppercase tracking-widest text-sm">
              <th className="p-4 border-b-4 border-black">Headline</th>
              <th className="p-4 border-b-4 border-black hidden md:table-cell">Category</th>
              <th className="p-4 border-b-4 border-black hidden sm:table-cell">Author ID</th>
              <th className="p-4 border-b-4 border-black text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_SUBMISSIONS.map((sub) => (
              <tr key={sub.id} className="border-b-2 border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <p className="font-display font-black text-xl leading-tight mb-1">{sub.title}</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest sm:hidden">{sub.author}</p>
                </td>
                <td className="p-4 hidden md:table-cell text-sm font-bold uppercase tracking-widest text-gray-600">
                  {sub.category}
                </td>
                <td className="p-4 hidden sm:table-cell text-sm font-medium">
                  {sub.author}
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 border-2 border-black hover:bg-[var(--color-sovereign-gray)] transition-colors" title="Edit">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 border-2 border-black hover:bg-green-400 hover:text-black transition-colors" title="Approve">
                      <CheckSquare size={18} />
                    </button>
                    <button className="p-2 border-2 border-black hover:bg-[var(--color-sovereign-red)] hover:text-white transition-colors" title="Reject">
                      <XSquare size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {MOCK_SUBMISSIONS.length === 0 && (
          <div className="p-12 text-center text-gray-500 font-bold">
            No pending submissions found.
          </div>
        )}
      </div>
      
      {!supabase && (
         <p className="mt-6 text-sm font-bold text-gray-500 border-l-4 border-[var(--color-sovereign-red)] pl-3">
           Currently showing mock data. Connect Supabase by setting your environment variables in AI Studio to sync live drafts.
         </p>
      )}
    </div>
  );
}
