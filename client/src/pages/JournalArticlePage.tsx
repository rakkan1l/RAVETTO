import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { JournalPost } from '../types';
import { ArrowLeft } from 'lucide-react';

interface JournalArticlePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const JournalArticlePage: React.FC<JournalArticlePageProps> = ({ slug, onNavigate }) => {
  const [post, setPost] = useState<JournalPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticle() {
      try {
        setIsLoading(true);
        const data = await api.getJournalArticle(slug);
        setPost(data);
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticle();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] py-32 text-center text-xs uppercase tracking-widest text-ravetto-muted font-mono">
        Loading essay from the archive...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] py-32 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-ravetto-text">Article Not Found</h2>
        <button
          onClick={() => onNavigate('/journal')}
          className="text-xs uppercase tracking-widest text-ravetto-teal underline"
        >
          Return to Journal
        </button>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24 text-left">
      <div className="max-w-[880px] mx-auto px-6 sm:px-12 space-y-10">
        {/* Back Link */}
        <div>
          <button
            onClick={() => onNavigate('/journal')}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ravetto-muted hover:text-ravetto-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Journal Archive</span>
          </button>
        </div>

        {/* Header */}
        <div className="space-y-4 pb-8 border-b border-ravetto-border">
          <span className="font-mono text-xs uppercase tracking-widest text-ravetto-teal block">
            {post.readTime} &bull; Published by {post.author}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-ravetto-muted leading-relaxed font-sans pt-2">
            {post.excerpt}
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-[16/10] bg-ravetto-offwhite-paper border border-ravetto-border overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Editorial Body Content */}
        <div className="prose prose-stone max-w-none text-xs sm:text-sm text-ravetto-text/90 leading-loose space-y-6 font-sans">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom Editorial Stamp */}
        <div className="pt-12 border-t border-ravetto-border flex justify-between items-center text-xs uppercase tracking-widest text-ravetto-muted">
          <span>RAVETTO ATELIER ARCHIVE</span>
          <button
            onClick={() => onNavigate('/shop')}
            className="text-ravetto-teal hover:underline font-medium"
          >
            Explore the Collection &rarr;
          </button>
        </div>
      </div>
    </article>
  );
};
