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
  Zap,
} from "lucide-react";

/* ─── Palette ─── */
const C = {
  indigo: "#29335c",
  paprika: "#e4572e",
  orange: "#f3a712",
  olive: "#a8c686",
  steel: "#669bbc",
  white: "#ffffff",
};

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
    <div className="min-h-screen" style={{ background: C.indigo }}>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(ellipse at top left, ${C.orange}08 0%, ${C.indigo} 50%)`,
        }}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-white/[0.08] backdrop-blur-xl"
        style={{ background: `${C.indigo}e6` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2.5">
            <Zap className="h-6 w-6" style={{ color: C.orange }} />
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span style={{ color: C.orange }}>Crypto</span>
                <span style={{ color: C.white }}>Wire</span>
              </h1>
              <p
                className="text-[10px] tracking-wide uppercase -mt-0.5 hidden sm:block"
                style={{ color: C.steel }}
              >
                Blockchain News Feed
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchNews}
            disabled={loading}
            className="gap-1.5 shrink-0 border-white/[0.1] text-white hover:bg-white/[0.06]"
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
                  ? "bg-[#f3a712]/15 text-[#f3a712] border border-[#f3a712]/25 hover:bg-[#f3a712]/25"
                  : "text-[#669bbc] hover:text-white hover:bg-white/[0.05]"
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
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: C.orange }} />
            <p className="text-sm" style={{ color: C.steel }}>
              Fetching latest stories…
            </p>
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-5 sm:p-6 rounded-2xl glass hover:border-[#f3a712]/20 transition-colors cursor-pointer"
              >
                <div>
                  <Badge
                    className="bg-[#e4572e]/15 text-[#e4572e] border-0 mb-3"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {hero.categories || "Breaking"}
                  </Badge>
                  <h2
                    className="text-lg sm:text-xl font-bold leading-tight mb-3 text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {hero.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: C.steel }}
                  >
                    {hero.body.substring(0, 200)}…
                  </p>
                  <div
                    className="flex items-center gap-4 text-xs"
                    style={{ color: C.steel }}
                  >
                    <span className="flex items-center gap-1">
                      <Newspaper className="h-3 w-3" /> {hero.source}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {timeAgo(hero.published_on)}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ color: C.orange }}
                    >
                      Read more <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center rounded-xl bg-white/[0.03]">
                  <Newspaper
                    className="h-16 w-16"
                    style={{ color: `${C.orange}30` }}
                  />
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
                  <Card className="glass border-white/[0.06] hover:border-[#f3a712]/20 transition-colors h-full cursor-pointer">
                    <CardContent className="p-5">
                      <Badge className="bg-[#a8c686]/15 text-[#a8c686] border-0 text-[10px] mb-3">
                        {n.categories || "Crypto"}
                      </Badge>
                      <h3
                        className="text-sm font-semibold leading-snug mb-2 line-clamp-2 text-white"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {n.title}
                      </h3>
                      <p
                        className="text-xs leading-relaxed line-clamp-3 mb-3"
                        style={{ color: C.steel }}
                      >
                        {n.body.substring(0, 120)}…
                      </p>
                      <div
                        className="flex justify-between items-center text-[10px]"
                        style={{ color: `${C.steel}99` }}
                      >
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
              <Card className="glass border-white/[0.06]">
                <CardHeader>
                  <CardTitle
                    className="text-base flex items-center gap-2 text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    <TrendingUp className="h-4 w-4" style={{ color: C.orange }} />
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
                      className="flex gap-3 py-3 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors rounded-sm px-1"
                    >
                      <span
                        className="text-2xl font-extrabold min-w-[30px]"
                        style={{ color: C.orange }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p
                          className="text-sm font-semibold leading-snug text-white"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {n.title}
                        </p>
                        <p
                          className="text-[11px] mt-1 flex items-center gap-2"
                          style={{ color: C.steel }}
                        >
                          <span>{n.source}</span>
                          <span>·</span>
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
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <div
            className="flex items-center gap-2 text-xs"
            style={{ color: C.steel }}
          >
            <span
              className="font-semibold text-white/60"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              CryptoWire
            </span>
            <span>·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <a
            href="https://github.com/RivaldiDev"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs hover:text-white transition-colors"
            style={{ color: C.steel }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            RivaldiDev
          </a>
        </div>
      </footer>
    </div>
  );
}
