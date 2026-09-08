import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { JournalPost } from '../types';
import { ArrowRight } from 'lucide-react';

interface JournalListPageProps {
  onNavigate: (path: string) => void;
}

export const JournalListPage: React.FC<JournalListPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadJournal() {
      try {
        setIsLoading(true);
        const data = await api.getJournal();
        setPosts(data);
      } catch (err) {
        console.error('Failed to load journal:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadJournal();
  }, []);

  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 text-left">
        {/* Header */}
        <div className="pb-16 border-b border-ravetto-border">
          <span className="micro-caps text-ravetto-teal block mb-2">
            The Atelier Gazette
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="font-editorial text-4xl sm:text-6xl font-medium tracking-tight text-ravetto-text">
              Journal
            </h1>
            <p className="text-xs uppercase tracking-[0.16em] text-ravetto-muted max-w-sm leading-relaxed">
              Essays on fiber science, structural drape, pattern cutting, and the discipline of essentialism.
            </p>
          </div>
        </div>

        {/* Featured First Article */}
        {posts.length > 0 && (
          <div
            onClick={() => onNavigate(`/journal/${posts[0].slug}`)}
            className="py-16 border-b border-ravetto-border grid grid-cols-1 lg:grid-cols-12 gap-10 items-center cursor-pointer group"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] bg-ravetto-offwhite-paper overflow-hidden">
              <img
                src={posts[0].coverImage}
                alt={posts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs text-ravetto-teal uppercase tracking-widest block">
                {posts[0].readTime} &bull; Editorial
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl font-medium text-ravetto-text group-hover:text-ravetto-teal transition-colors leading-tight">
                {posts[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-ravetto-muted leading-relaxed font-sans">
                {posts[0].excerpt}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.16em] font-medium text-ravetto-teal group-hover:underline">
                  <span>Read Piece</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="pt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.slice(1).map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate(`/journal/${post.slug}`)}
              className="space-y-4 cursor-pointer group"
            >
              <div className="relative aspect-[16/10] bg-ravetto-offwhite-paper overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-ravetto-teal uppercase tracking-widest block">
                  {post.readTime} &bull; Atelier Story
                </span>
                <h3 className="font-editorial text-xl sm:text-2xl font-medium text-ravetto-text group-hover:text-ravetto-teal transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-ravetto-muted leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
