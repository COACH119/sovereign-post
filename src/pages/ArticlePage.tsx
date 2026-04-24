import React, { useMemo, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ARTICLES } from '../lib/mockData';
import { AdSlot } from '../components/AdSlot';
import { SEOHead } from '../components/SEOHead';
import { SocialShare } from '../components/SocialShare';
import { AudioPlayer } from '../components/AudioPlayer';
import { TipJar } from '../components/TipJar';
import { CheckCircle, ShieldCheck, Lock, Sparkles, Loader2 } from 'lucide-react';
import { AuthorBio } from '../components/AuthorBio';
import { generateTLDR, TLDRResult } from '../lib/ai';

const renderMarkdown = (text: string) => {
  const elements: React.ReactNode[] = [];
  const paragraphs = text.split('\n\n');
  
  let pCount = 0;
  
  paragraphs.forEach((paragraph, i) => {
    const trimmed = paragraph.trim();
    if (!trimmed) return;
    
    if (trimmed.startsWith('###')) {
      elements.push(<h3 key={`h3-${i}`} className="font-display font-black text-3xl mt-12 mb-6 tracking-tighter uppercase">{trimmed.replace('###', '').trim()}</h3>);
    } else if (trimmed.startsWith('##')) {
      elements.push(<h2 key={`h2-${i}`} className="font-display font-black text-4xl mt-16 mb-8 uppercase tracking-tighter">{trimmed.replace('##', '').trim()}</h2>);
    } else {
      pCount++;
      elements.push(<p key={`p-${i}`} className="font-sans text-xl text-black leading-relaxed mb-6 font-medium">{trimmed}</p>);
      
      // Inject ads dynamically after 1st and 4th paragraph
      if (pCount === 1) {
        elements.push(<AdSlot key={`ad-1-${i}`} id={`article-in-feed-${i}`} height={250} className="my-12 clear-both" label="Partner Program Advertisement" />);
      }
      if (pCount === 4) {
        elements.push(<AdSlot key={`ad-4-${i}`} id={`article-in-feed-${i}`} height={250} className="my-12 clear-both" label="Partner Program Advertisement" />);
      }
    }
  });

  return elements;
};

export function ArticlePage() {
  const { id } = useParams();
  const article = useMemo(() => ARTICLES.find(a => a.id === id), [id]);

  const [isAiSummaryEnabled, setIsAiSummaryEnabled] = useState(false);
  const [generatingSummary, setGeneratingSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<TLDRResult | null>(null);

  const handleToggleSummary = async () => {
    if (!isAiSummaryEnabled && !generatedSummary && article) {
      setGeneratingSummary(true);
      setIsAiSummaryEnabled(true);
      const res = await generateTLDR(article.content);
      if (res) {
        setGeneratedSummary(res);
      } else {
        // Fallback or leave it empty, but user can see we tried.
        setGeneratedSummary({ takeaways: article.tldr || ["No summary available."], readingTimeMin: Math.ceil(article.wordCount / 225) });
      }
      setGeneratingSummary(false);
    } else {
      setIsAiSummaryEnabled(!isAiSummaryEnabled);
    }
  };

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);
  }, [article]);

  if (!article) return <Navigate to="/" replace />;

  const readingTime = generatedSummary ? generatedSummary.readingTimeMin : Math.ceil(article.wordCount / 225);
  const formattedDate = format(new Date(article.publishedAt), 'MMM dd, yyyy');
  const formattedVerifiedDate = article.lastVerified ? format(new Date(article.lastVerified), 'MMMM dd, yyyy - HH:mm') : '';

  return (
    <article className="max-w-[1400px] mx-auto bg-white">
      <SEOHead 
        title={article.title}
        description={article.excerpt}
        type={article.category === 'opinion' ? 'OpinionNewsArticle' : 'NewsArticle'}
        imageUrl={article.imageUrl}
        authorName={article.author}
        publishedAt={article.publishedAt}
      />
      
      <header className="px-4 lg:px-8 pt-12 pb-20 border-b-8 border-black flex flex-col md:flex-row gap-12 lg:gap-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-sovereign-white)] -z-10 transform origin-top-right -skew-x-12 opacity-20"></div>
        
        <div className="md:w-1/2 flex flex-col justify-center">
          <div className="flex flex-col gap-4 mb-8 w-full max-w-sm">
            <div className="flex items-center gap-4">
              <Link to={`/?category=${article.category}`} className="px-2 py-0.5 border-2 border-black bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-[var(--color-sovereign-red)] transition-colors">
                {article.category}
              </Link>
              {article.isPremium && (
                <span className="px-2 py-0.5 border-2 border-transparent bg-white text-black font-black uppercase text-[10px] tracking-widest flex items-center gap-1">
                  <Lock size={12} /> The Vault
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 w-full">
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 tracking-tighter uppercase">{readingTime} Min Read</span>
                <div className="h-[2px] flex-1 bg-black opacity-10"></div>
                <span className="text-[10px] font-bold uppercase opacity-50 block w-max">Published {formattedDate}</span>
              </div>
              {article.lastVerified && (
                <div className="flex justify-end w-full">
                   <span className="text-[10px] font-black uppercase text-[var(--color-sovereign-red)] tracking-widest bg-gray-100 px-2 py-0.5 border border-gray-300">
                     <ShieldCheck size={10} className="inline mr-1 -mt-0.5" />
                     Last Verified {formattedVerifiedDate}
                   </span>
                </div>
              )}
            </div>
          </div>
          
          <h1 className="font-display font-black text-[54px] md:text-[84px] leading-[0.85] tracking-tighter mb-8 uppercase">
            {article.title}
          </h1>
          
          <p className="font-sans text-xl md:text-2xl text-black font-bold leading-tight mb-12 border-l-8 border-[var(--color-sovereign-red)] pl-6 py-2">
            {article.excerpt}
          </p>
          
          <AuthorBio authorName={article.author} />
        </div>

        <div className="md:w-1/2 border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] h-[400px] md:h-auto min-h-[500px] relative group">
          <img 
            src={article.imageUrl} alt={article.title} 
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" 
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-20 flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        <aside className="hidden lg:block w-24 flex-shrink-0">
          <div className="sticky top-28"><SocialShare /></div>
        </aside>

        <div className="flex-1 max-w-3xl">
          <div className="lg:hidden mb-12 border-b-2 border-black pb-8"><SocialShare className="flex-row items-center border-none" /></div>

          <div className="flex justify-between items-center mb-8">
            <AudioPlayer />
            <button
              onClick={handleToggleSummary}
              className={`flex items-center gap-2 px-4 py-2 border-2 border-black font-black uppercase tracking-widest text-xs transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] ${isAiSummaryEnabled ? 'bg-[var(--color-sovereign-red)] text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              <Sparkles size={16} />
              {isAiSummaryEnabled ? 'Hide AI Summary' : 'Generate AI TL;DR'}
            </button>
          </div>

          {isAiSummaryEnabled && (
            <div className="mb-16 border-4 border-[var(--color-sovereign-red)] p-6 bg-[var(--color-sovereign-gray)] shadow-[8px_8px_0px_0px_rgba(215,38,56,1)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-[var(--color-sovereign-red)] rounded-full animate-pulse"></div>
                <h3 className="font-black uppercase tracking-widest text-sm text-[var(--color-sovereign-red)]">Gemini Executive Summary</h3>
              </div>
              {generatingSummary ? (
                <div className="flex items-center gap-3 text-gray-600 font-bold py-6">
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing context & extracting insights...
                </div>
              ) : generatedSummary ? (
                <>
                  <p className="font-bold text-sm mb-4 bg-[var(--color-sovereign-red)] text-white inline-block px-2 py-1 uppercase tracking-widest">
                    Estimated Time: {generatedSummary.readingTimeMin} Min
                  </p>
                  <ul className="space-y-3">
                    {generatedSummary.takeaways.map((point, idx) => (
                      <li key={idx} className="flex gap-3">
                        <CheckCircle className="text-[var(--color-sovereign-red)] flex-shrink-0 mt-1" size={20} />
                        <span className="font-bold text-gray-800">{point}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          )}

          <div className="prose prose-xl prose-black max-w-none relative">
            {renderMarkdown(article.content)}
            
            {article.isPremium && (
              <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white via-white/90 to-transparent flex flex-col justify-end items-center pb-8 z-10 text-center px-4">
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl text-center flex flex-col items-center">
                  <Lock size={32} className="mx-auto mb-4 text-[var(--color-sovereign-red)]" />
                  <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-4">Unlock The Vault</h3>
                  <p className="font-bold text-sm mb-6">You've reached the end of the free preview. Access our deepest industry intel and geopolitical analysis for $15/month.</p>
                  <button className="w-full py-4 bg-black text-white font-black uppercase tracking-widest transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 hover:bg-[var(--color-sovereign-red)]">
                    Subscribe Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-20">
            <details className="group border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12">
              <summary className="flex justify-between items-center font-black uppercase tracking-widest p-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden outline-none text-xl hover:text-[var(--color-sovereign-red)] transition-colors">
                <span className="flex items-center gap-3">
                  <ShieldCheck size={28} /> Sources & Citations
                </span>
                <span className="text-3xl font-normal transition duration-300 group-open:rotate-45">+</span>
              </summary>
              <div className="p-6 pt-0 mt-2 border-t-4 border-dashed border-gray-200">
                <div className="pt-6">
                  {article.sources && article.sources.length > 0 ? (
                    <ul className="space-y-4">
                      {article.sources.map((source, idx) => (
                        <li key={idx} className="flex gap-3 text-base font-bold">
                          <span className="text-[var(--color-sovereign-red)] leading-tight">[{idx + 1}]</span>
                          <a href={source.url} className="hover:underline hover:text-[var(--color-sovereign-red)] uppercase tracking-widest text-gray-800 leading-tight block">{source.name}</a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">No external sources cited.</p>
                  )}
                </div>
              </div>
            </details>
            
            <TipJar />
          </div>

          <section className="mt-16 p-8 bg-[var(--color-sovereign-black)] text-white text-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-4">Have a story that will shape the world?</h3>
            <p className="mb-6 text-gray-400 font-bold uppercase tracking-widest text-sm">Join our network of world-class analysts and start writing today.</p>
            <Link to="/submit" className="inline-block bg-[var(--color-sovereign-red)] hover:bg-black text-white font-black uppercase tracking-widest py-3 px-8 transition-colors border-2 border-transparent hover:border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-y-1">
              APPLY TO WRITE
            </Link>
          </section>
        </div>

        <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-12">
          {relatedArticles.length > 0 && (
            <div className="border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
              <h3 className="font-black uppercase text-lg leading-none mb-6 text-[var(--color-sovereign-red)]">Related Intelligence</h3>
              <div className="flex flex-col gap-6">
                {relatedArticles.map(rel => (
                  <Link key={rel.id} to={`/article/${rel.id}`} className="group block border-b-2 border-gray-100 pb-4 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">
                      {format(new Date(rel.publishedAt), 'MMM dd')}
                    </span>
                    <h4 className="font-display font-black text-xl leading-tight group-hover:text-[var(--color-sovereign-red)] transition-colors uppercase">
                      {rel.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="sticky top-28">
            <AdSlot id="article-sidebar" width={300} height={600} label="Premium Advertisement" />
          </div>
        </aside>
      </div>
    </article>
  );
}
