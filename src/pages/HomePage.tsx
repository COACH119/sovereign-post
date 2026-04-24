import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ARTICLES } from '../lib/mockData';
import { AdSlot } from '../components/AdSlot';
import { SEOHead } from '../components/SEOHead';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { format } from 'date-fns';
import { Lock, Crown, TrendingUp, ChevronRight } from 'lucide-react';

export function HomePage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredArticles = useMemo(() => {
    if (!categoryFilter) return ARTICLES;
    return ARTICLES.filter(a => a.category.toLowerCase() === categoryFilter.toLowerCase());
  }, [categoryFilter]);

  const featuredArticle = filteredArticles[0];
  const sideArticles = filteredArticles.slice(1, 4);
  const regularArticles = filteredArticles.slice(4);

  return (
    <div className="bg-[var(--color-sovereign-white)] w-full">
      <SEOHead 
        title={categoryFilter ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} News` : 'The Sovereign Post | High-Impact Journalism'} 
        description="A high-performance modern multi-author platform designed for high-impact journalism: Global Politics, Sports, Industry, and Opinion."
      />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Category Header */}
        <div className="mb-10 flex items-end justify-between border-b-[8px] border-black pb-4">
          <h1 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter text-black">
            {categoryFilter || 'Top Intelligence'}
          </h1>
          {categoryFilter && (
            <Link to="/" className="font-black uppercase tracking-widest text-sm hover:text-[var(--color-sovereign-red)] transition-colors mb-2 text-black flex items-center gap-1">
              Clear Filter <span className="text-[var(--color-sovereign-red)]">&times;</span>
            </Link>
          )}
        </div>

        {/* Hero Section: 2/3 Main, 1/3 Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredArticle && (
            <article className="lg:col-span-2 group relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-black overflow-hidden flex flex-col min-h-[600px] lg:min-h-[700px] hover:shadow-[12px_12px_0px_0px_var(--color-sovereign-red)] transition-all">
              <img 
                src={featuredArticle.imageUrl} 
                alt={featuredArticle.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:via-black/30 transition-all duration-700 z-10 w-full"></div>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex gap-2 z-20">
                {featuredArticle.isPremium && (
                   <span className="bg-white border-2 border-black px-2 py-1 flex items-center gap-1 font-black uppercase tracking-widest text-[10px] text-[var(--color-sovereign-red)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Lock size={12} /> The Vault
                   </span>
                )}
                {featuredArticle.isSponsored && (
                  <span className="bg-[var(--color-sovereign-red)] text-white border-2 border-black px-2 py-1 flex items-center gap-1 font-black uppercase tracking-widest text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Crown size={12} /> Partner
                  </span>
                )}
              </div>
              
              <div className="relative z-10 flex flex-col justify-end flex-grow p-6 md:p-10 mt-auto transform transition-transform duration-500 group-hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-[var(--color-sovereign-red)] text-white px-3 py-1 font-black uppercase tracking-widest text-xs border-2 border-transparent">
                    {featuredArticle.category}
                  </span>
                  <span className="font-black text-gray-300 uppercase tracking-widest text-xs drop-shadow-md">
                    {format(new Date(featuredArticle.publishedAt), 'MMM dd, yyyy')}
                  </span>
                </div>
                <Link to={`/article/${featuredArticle.id}`} className="block">
                  <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-6 text-white group-hover:text-[var(--color-sovereign-red)] transition-colors uppercase drop-shadow-lg">
                    {featuredArticle.title}
                  </h2>
                </Link>
                <p className="font-sans text-xl md:text-2xl text-gray-200 font-medium leading-relaxed mb-8 max-w-3xl drop-shadow-md">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="flex items-center justify-between border-t-2 border-gray-600/50 pt-6">
                  <span className="font-black uppercase tracking-widest text-xs text-gray-300">By {featuredArticle.author}</span>
                  <Link 
                    to={`/article/${featuredArticle.id}`}
                    className="flex items-center gap-2 font-black uppercase tracking-widest text-sm text-[var(--color-sovereign-red)] bg-white hover:bg-[var(--color-sovereign-red)] hover:text-white px-4 py-2 border-2 border-transparent hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 transition-all"
                  >
                    Read Analysis <ChevronRight size={16} strokeWidth={3} />
                  </Link>
                </div>
              </div>
            </article>
          )}

          {/* Side Articles */}
          <div className="flex flex-col gap-6">
            <h3 className="font-display font-black text-2xl uppercase tracking-tighter border-b-4 border-black pb-2 text-black">Editors Picks</h3>
            {sideArticles.map((article) => (
              <article key={article.id} className="group border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--color-sovereign-red)] transition-all flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-black text-[var(--color-sovereign-red)] uppercase tracking-widest text-[10px]">
                    {article.category}
                  </span>
                  {article.isPremium && <Lock size={10} className="text-gray-500" />}
                </div>
                <Link to={`/article/${article.id}`} className="mb-3 block">
                  <h4 className="font-display font-black text-2xl leading-tight uppercase tracking-tighter group-hover:text-[var(--color-sovereign-red)] transition-colors text-black">
                    {article.title}
                  </h4>
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-gray-600 text-[10px] uppercase tracking-widest block w-max">By {article.author}</span>
                  <span className="font-bold text-gray-400 text-[10px] uppercase tracking-widest block">{Math.ceil(article.wordCount / 225)} Min</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Invisible Ad Zone */}
        <AdSlot id="home-leaderboard" height={150} className="mb-16" label="Partner Program" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Article Feed */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <h3 className="font-display font-black text-4xl uppercase tracking-tighter border-b-4 border-[var(--color-sovereign-red)] pb-2 text-black mb-4">Latest Dispatches</h3>
            {regularArticles.map((article) => (
              <article key={article.id} className="group grid grid-cols-1 md:grid-cols-5 gap-6 border-b-2 border-gray-200 pb-10 relative">
                <div className="md:col-span-2 border-2 border-black overflow-hidden bg-gray-100 flex items-center justify-center relative">
                  {article.isPremium && (
                    <div className="absolute top-2 left-2 bg-white border-2 border-black px-2 py-0.5 z-10 flex items-center gap-1">
                      <Lock size={10} className="text-[var(--color-sovereign-red)]" />
                    </div>
                  )}
                  {article.isSponsored && (
                    <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 z-10 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                      <Crown size={10} className="text-[var(--color-sovereign-white)]" /> Partner
                    </div>
                  )}
                  <Link to={`/article/${article.id}`} className="w-full h-full block">
                    <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0" />
                  </Link>
                </div>
                <div className="md:col-span-3 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[var(--color-sovereign-red)] font-black uppercase tracking-widest text-[10px]">
                      {article.category}
                    </span>
                    <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px] gap-1 flex">
                      &bull; {format(new Date(article.publishedAt), 'MMM dd')}
                    </span>
                  </div>
                  <Link to={`/article/${article.id}`}>
                    <h3 className="font-display font-black uppercase text-2xl md:text-3xl leading-none tracking-tighter mb-4 group-hover:text-[var(--color-sovereign-red)] transition-colors text-black">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="font-sans text-gray-700 font-medium mb-4 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold uppercase tracking-widest text-[10px] text-gray-900 border-t-2 border-black pt-2 block w-max mt-2">By {article.author}</span>
                  </div>
                </div>
              </article>
            ))}

            {regularArticles.length === 0 && (
              <div className="py-20 text-center border-4 border-dashed border-gray-300">
                <p className="font-bold text-2xl text-gray-500 uppercase tracking-widest">No additional dispatches found.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-2">The Vault</h3>
                <p className="font-sans text-sm font-bold text-gray-600 mb-6">Gain full access to our global intelligence network. Ad-free reading, premium analysis, and direct author Q&As.</p>
                <button className="w-full bg-[var(--color-sovereign-red)] text-white font-black uppercase tracking-widest py-3 hover:bg-black transition-colors border-2 border-transparent">
                  Unlock Access
                </button>
            </div>
            <NewsletterSignup />
            <AdSlot id="sidebar-sticky" height={600} className="sticky top-28 border-4 border-gray-100" />
          </aside>
        </div>
      </div>

      {/* Open Ledger: Contributor Call to Action */}
      <section className="bg-[var(--color-sovereign-red)] text-white py-16 mt-8 text-center border-t-8 border-black w-full">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter mb-4">Have a Story that Shapes the World?</h2>
          <p className="font-bold text-lg mb-8 opacity-90 font-sans tracking-widest leading-relaxed">JOIN OUR NETWORK OF CONTRIBUTORS AND EARN REVENUE FROM YOUR VOICE.</p>
          <Link to="/submit" className="inline-block bg-[var(--color-sovereign-black)] text-white px-10 py-5 text-lg font-black uppercase tracking-widest hover:bg-white hover:text-[var(--color-sovereign-black)] transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1">
            Apply to Write
          </Link>
        </div>
      </section>
    </div>
  );
}
