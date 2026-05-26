"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Clock,
  Newspaper,
  TrendingUp,
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  body: string;
  source: string;
  categories: string;
  published_on: number;
  url: string;
}

function timeAgo(ts: number): string {
  const s = Math.floor(Date.now() / 1000 - ts);
  if (s < 60) return s + "s ago";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

const CATEGORIES = ["All", "Bitcoin", "Ethereum", "DeFi", "NFTs", "Trading"];

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular"
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setNews(data.Data.slice(0, 18));
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Failed to fetch news. Try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const filtered =
    activeCategory === "All"
      ? news
      : news.filter((n) =>
          n.categories?.toLowerCase().includes(activeCategory.toLowerCase())
        );

  const hero = filtered[0];
  const gridNews = filtered.slice(1, 10);
  const trending = filtered.slice(10, 16);

  return (
    <div className="min-h-screen bg-[var(--background)] text-zinc-200">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-950/15 via-[var(--background)] to-amber-950/10" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-white/5 backdrop-blur-xl bg-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-orange-500">
              CryptoWire
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 hidden sm:block">
              Crypto & Blockchain News
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchNews}
            disabled={loading}
            className="gap-1.5 shrink-0"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>

        {/* Category filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-3 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={cat === activeCategory ? "default" : "ghost"}
              size="xs"
              onClick={() => setActiveCategory(cat)}
              className={
                cat === activeCategory
                  ? "bg-orange-500/20 text-orange-400 border border-orange-400/30 hover:bg-orange-500/30"
                  : "text-slate-500 hover:text-slate-300"
              }
            >
              {cat}
            </Button>
          ))}
        </div>
      </motion.header>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3"
          >
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
              <span className="text-sm text-red-300">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-orange-400" />
          </div>
        ) : (
          <>
            {/* Hero */}
            {hero && (
              <motion.a
                href={hero.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 hover:border-orange-500/20 transition-colors cursor-pointer"
              >
                <div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-0 mb-3">
                    {hero.categories || "Breaking"}
                  </Badge>
                  <h2 className="text-lg sm:text-xl font-bold leading-tight mb-3">
                    {hero.title}
                  </h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                    {hero.body.substring(0, 200)}...
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Newspaper className="h-3 w-3" /> {hero.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {timeAgo(hero.published_on)}
                    </span>
                    <span className="flex items-center gap-1 text-orange-400">
                      Read more <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center bg-zinc-800/50 rounded-xl">
                  <Newspaper className="h-16 w-16 text-orange-500/30" />
                </div>
              </motion.a>
            )}

            {/* News grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {gridNews.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={n.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card className="bg-zinc-900/50 border-white/5 hover:border-orange-500/30 transition-colors h-full cursor-pointer">
                    <CardContent className="p-5">
                      <Badge className="bg-orange-500/10 text-orange-400 border-0 text-[10px] mb-3">
                        {n.categories || "Crypto"}
                      </Badge>
                      <h3 className="text-sm font-semibold leading-snug mb-2 line-clamp-2">
                        {n.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">
                        {n.body.substring(0, 120)}...
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-slate-600">
                        <span className="flex items-center gap-1">
                          <Newspaper className="h-3 w-3" /> {n.source}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />{" "}
                          {timeAgo(n.published_on)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>

            {/* Trending */}
            {trending.length > 0 && (
              <Card className="bg-zinc-900/50 border-white/5">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-400" />
                    Trending Stories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {trending.map((n, i) => (
                    <a
                      key={n.id}
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 py-3 border-b border-white/[0.03] last:border-0 hover:bg-white/[0.02] transition-colors rounded-sm px-1"
                    >
                      <span className="text-2xl font-extrabold text-orange-500 min-w-[30px]">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold leading-snug">
                          {n.title}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                          <span>{n.source}</span>
                          <span>&middot;</span>
                          <span>{timeAgo(n.published_on)}</span>
                        </p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-slate-600 border-t border-white/5">
        CryptoWire &copy; 2026 &middot; News from CryptoCompare &middot; Built
        with Next.js + shadcn/ui
      </footer>
    </div>
  );
}
