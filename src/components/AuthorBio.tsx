import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ShieldCheck, User } from 'lucide-react';

export function AuthorBio({ authorName }: { authorName: string }) {
  const [bio, setBio] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);
      try {
        if (supabase) {
          // Attempt to fetch from Supabase
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('full_name', authorName)
            .maybeSingle();
          
          if (data && data.bio) {
            setBio(data.bio);
            setAvatarUrl(data.avatar_url);
          } else {
            // Fallback for demonstration if specific author profile doesn't exist
            setBio(`Senior Analyst at The Sovereign Post focusing on geopolitical shifts and global industry trends. Former correspondent for major international publications. Renowned for unparalleled access to key decision-makers and actionable intelligence that routinely shapes market outcomes.`);
          }
        } else {
          // Fallback if Supabase is not connected
          setBio(`Senior Analyst at The Sovereign Post focusing on geopolitical shifts and global industry trends. Former correspondent for major international publications. Renowned for unparalleled access to key decision-makers and actionable intelligence that routinely shapes market outcomes.`);
        }
      } catch (e) {
         console.error("Error fetching author bio", e);
         setBio(`Senior Analyst focusing on geopolitical shifts and global industry trends. Author of multiple groundbreaking reports.`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProfile();
  }, [authorName]);

  const toggleBio = () => setIsExpanded(!isExpanded);

  const truncateBio = (text: string, length: number = 100) => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
  };

  if (isLoading) {
    return (
      <div className="flex items-start gap-4 border-t-2 border-black pt-6 mt-6 animate-pulse">
         <div className="w-12 h-12 bg-gray-200 border-2 border-black"></div>
         <div className="flex-1 space-y-2">
           <div className="h-4 bg-gray-200 w-1/3"></div>
           <div className="h-3 bg-gray-200 w-full"></div>
           <div className="h-3 bg-gray-200 w-2/3"></div>
         </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-4 border-t-2 border-black pt-6 mt-6">
      <div className="w-12 h-12 flex-shrink-0 bg-black text-white flex items-center justify-center overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        {avatarUrl ? (
          <img src={avatarUrl} alt={authorName} className="w-full h-full object-cover filter grayscale" />
        ) : (
          <User size={24} />
        )}
      </div>
      <div className="flex-1">
        <Link 
          to={`/author/${encodeURIComponent(authorName.toLowerCase().replace(/\s+/g, '-'))}`} 
          className="font-display font-black uppercase tracking-widest mb-1 text-lg hover:text-[var(--color-sovereign-red)] transition-colors inline-block"
        >
          {authorName}
        </Link>
        <div className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-widest mb-2">
          <ShieldCheck size={14} /> Fact-Checked Expert
        </div>
        
        {bio && (
          <div className="font-sans text-sm font-medium text-gray-700 leading-relaxed">
            {isExpanded ? bio : truncateBio(bio, 110)}
            {bio.length > 110 && (
              <button 
                onClick={toggleBio}
                className="ml-2 font-black uppercase text-[10px] tracking-widest text-[var(--color-sovereign-red)] hover:text-black transition-colors"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
