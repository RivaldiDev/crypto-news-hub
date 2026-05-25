"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: string;
  title: string;
  body: string;
  source: string;
  categories: string;
  published_on: number;
  url: string;
}

function timeAgo(ts: number) {
  const s = Math.floor(Date.now() / 1000 - ts);
  if (s < 60) return s + "s ago";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=EN&sortOrder=popular");
        const data = await res.json();
        setNews(data.Data.slice(0, 18));
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const hero = news[0];

  return (
    <div className="min-h-screen bg-[#0f0f13] text-zinc-200">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-950/15 via-[#0f0f13] to-amber-950/10" />

      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/5 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-orange-500">CryptoWire</h1>
            <p className="text-xs text-slate-500 mt-1">AI-Curated Crypto & Blockchain News | CryptoCompare API</p>
          </div>
          <div className="flex gap-2">
            {["All", "Bitcoin", "Ethereum", "DeFi", "NFTs"].map((cat) => (
              <button key={cat} className={`px-3 py-1.5 rounded-md text-xs font-medium ${cat === "All" ? "bg-orange-500/20 text-orange-400 border border-orange-400/30" : "bg-white/5 text-slate-500 hover:text-slate-300"}`}>{cat}</button>
            ))}
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/10 border-t-orange-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Fetching latest crypto news...</p>
          </div>
        ) : (
          <>
            {hero && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-6 mb-8 p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5">
                <div>
                  <Badge className="bg-orange-500/20 text-orange-400 border-0 mb-3">{hero.categories || "Breaking"}</Badge>
                  <h2 className="text-xl font-bold leading-tight mb-3">{hero.title}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{hero.body.substring(0, 200)}...</p>
                  <div className="flex gap-4 text-xs text-slate-500">
                    <span>📰 {hero.source}</span>
                    <span>🕐 {timeAgo(hero.published_on)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-zinc-800/50 rounded-xl text-4xl">📰</div>
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-4 mb-8">
              {news.slice(1, 10).map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="bg-zinc-900/50 border-white/5 hover:border-orange-500/30 transition-colors h-full">
                    <CardContent className="p-5">
                      <Badge className="bg-orange-500/10 text-orange-400 border-0 text-[10px] mb-3">{n.categories || "Crypto"}</Badge>
                      <h3 className="text-sm font-semibold leading-snug mb-2 line-clamp-2">{n.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-3">{n.body.substring(0, 120)}...</p>
                      <div className="flex justify-between text-[10px] text-slate-600">
                        <span>📰 {n.source}</span>
                        <span>{timeAgo(n.published_on)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-zinc-900/50 border-white/5">
                <CardHeader><CardTitle className="text-base">🔥 Trending Stories</CardTitle></CardHeader>
                <CardContent>
                  {news.slice(10, 16).map((n, i) => (
                    <div key={n.id} className="flex gap-3 py-3 border-b border-white/[0.03] last:border-0">
                      <span className="text-2xl font-extrabold text-orange-500 min-w-[30px]">{i + 1}</span>
                      <div>
                        <p className="text-sm font-semibold leading-snug">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{n.source} • {timeAgo(n.published_on)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-zinc-900/50 border-white/5">
                <CardHeader><CardTitle className="text-base">📊 Market Sentiment</CardTitle></CardHeader>
                <CardContent className="text-center py-8">
                  <div className="w-32 h-16 mx-auto rounded-t-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 mb-4 opacity-60" />
                  <p className="text-4xl font-extrabold text-green-400">72</p>
                  <p className="text-sm text-slate-400 mt-1">Greed</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-slate-600 border-t border-white/5">
        CryptoWire &copy; 2026 | News from CryptoCompare API (Free) | Built with Next.js + shadcn/ui
      </footer>
    </div>
  );
}
