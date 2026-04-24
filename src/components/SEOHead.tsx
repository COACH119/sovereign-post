import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  type?: 'WebSite' | 'NewsArticle' | 'OpinionNewsArticle';
  url?: string;
  imageUrl?: string;
  authorName?: string;
  publishedAt?: string;
}

export function SEOHead({
  title,
  description,
  type = 'WebSite',
  url = 'https://journalight.com',
  imageUrl = 'https://journalight.com/og-image.jpg',
  authorName,
  publishedAt
}: SEOHeadProps) {
  
  const siteName = "Journalight";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  const schemaOrgJSONLD: Record<string, any> = {
    '@context': 'http://schema.org',
    '@type': type,
    name: fullTitle,
    headline: fullTitle,
    description: description,
    url: url,
    image: imageUrl,
    publisher: {
      '@type': 'Organization',
      name: siteName,
    },
  };

  if ((type === 'NewsArticle' || type === 'OpinionNewsArticle') && authorName) {
    schemaOrgJSONLD.author = {
      '@type': 'Person',
      name: authorName,
    };
  }

  if (publishedAt) {
    schemaOrgJSONLD.datePublished = publishedAt;
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:type" content={type === 'WebSite' ? 'website' : 'article'} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* JSON-LD Component */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
