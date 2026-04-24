import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { ShieldCheck, PlusCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function SubmissionPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('opinion');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    if (supabase) {
      try {
        const { error } = await supabase.from('pending_review').insert([
          {
            title,
            content,
            category,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);
        
        if (error) throw error;
        
        setSubmitSuccess(true);
        setTitle('');
        setContent('');
      } catch (err: any) {
        setError(err.message || 'Failed to submit article.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Simulate API call to save to a "pending_review" table if no Supabase keys
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setTitle('');
        setContent('');
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="border-b-4 border-black pb-8 mb-12">
        <h1 className="font-display font-black text-5xl tracking-tighter uppercase mb-4">Contributor Portal</h1>
        <p className="font-sans text-xl font-bold text-gray-600">Submit your work to The Sovereign Post. All submissions undergo editorial review before publishing.</p>
      </div>

      {submitSuccess ? (
        <div className="bg-gray-100 border-l-8 border-[var(--color-sovereign-red)] p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[var(--color-sovereign-red)] rounded-full p-2 text-white">
              <ShieldCheck size={32} />
            </div>
            <h2 className="font-display font-black text-3xl uppercase tracking-tighter">Draft Submitted</h2>
          </div>
          <p className="font-sans font-medium text-lg">Your article has been securely saved to the editorial queue. Our team will review it shortly. If it goes viral, you're eligible for our 20% AdSense tier!</p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="mt-6 flex items-center gap-2 font-bold uppercase tracking-widest text-sm hover:text-[var(--color-sovereign-red)] transition-colors"
          >
            <PlusCircle size={16} /> Submit Another Piece
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label htmlFor="title" className="block font-bold uppercase tracking-widest text-sm text-gray-700">Headline</label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g., The Unstoppable Rise of Multi-Club Ownership..."
              className="w-full font-display font-bold text-3xl p-4 border-2 border-black focus:outline-none focus:border-[var(--color-sovereign-red)] focus:ring-1 focus:ring-[var(--color-sovereign-red)]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block font-bold uppercase tracking-widest text-sm text-gray-700">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-1/2 p-3 border-2 border-black font-bold uppercase text-sm tracking-widest focus:outline-none focus:border-[var(--color-sovereign-red)]"
            >
              <option value="global">Global Politics</option>
              <option value="industry">Industry</option>
              <option value="sports">Sports</option>
              <option value="opinion">Opinion</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <label htmlFor="content" className="block font-bold uppercase tracking-widest text-sm text-gray-700">Body Content (Markdown)</label>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Supports basic markdown formatting</span>
            </div>
            <textarea
              id="content"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              placeholder="Write your article here using Markdown..."
              className="w-full font-sans p-4 border-2 border-black focus:outline-none focus:border-[var(--color-sovereign-red)] focus:ring-1 focus:ring-[var(--color-sovereign-red)] leading-relaxed resize-y"
            />
          </div>

          <div className="bg-gray-50 border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center">
             <ShieldCheck size={24} className="text-gray-400 mb-2" />
             <p className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-1">Editorial Standard</p>
             <p className="text-sm font-medium text-gray-600">Your content must be original. Plagiarism and low-effort AI generation will result in an automatic rejection to protect our monetization standing.</p>
          </div>

          {!supabase && (
            <div className="bg-yellow-50 border-2 border-yellow-400 p-4 flex gap-3 text-yellow-800 text-sm font-medium">
              <AlertCircle size={20} className="flex-shrink-0" />
              <div>
                <strong>Preview Mode:</strong> Supabase environment variables are missing. This submission will be simulated.
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border-2 border-[var(--color-sovereign-red)] p-4 flex gap-3 text-red-800 text-sm font-medium">
              <AlertCircle size={20} className="flex-shrink-0" />
              <div>
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[var(--color-sovereign-red)] text-white font-black uppercase tracking-widest px-8 py-4 text-lg hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSubmitting ? 'Submitting to Queue...' : 'Submit to Editorial'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
