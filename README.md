<div align="center">

# CryptoWire

**AI-curated crypto and blockchain news aggregator with trending stories and market sentiment.**

[![Tech Stack](https://skillicons.dev/icons?i=nextjs,typescript,tailwind,github&theme=dark&perline=4)](https://skillicons.dev)

![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=for-the-badge)
![CryptoCompare-API-orange](https://img.shields.io/badge/CryptoCompare--API--orange)

[![GitHub](https://img.shields.io/badge/Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RivaldiDev/crypto-news-hub)
[![Vercel](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://crypto-news-hub-zeta.vercel.app)

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [API](#api) · [Getting Started](#getting-started) · [Architecture](#architecture)

</div>

---

## Overview

AI-curated crypto and blockchain news aggregator with trending stories and market sentiment.

Built with **Next.js 16** (App Router, TypeScript), **shadcn/ui** component library, **Tailwind CSS**, and **Framer Motion** for animations. All data is fetched client-side from free public APIs — no API keys required, no backend server.

This project was developed using AI Agent tools (**Claude Code**, **Hermes Agent**) as part of the **Xiaomi MiMo 100T Token Creator** program.

## Features

| Area | What it does |
| --- | --- |
| **News Aggregation** | Latest crypto news from 50+ sources, sorted by popularity. |
| **Hero Section** | Featured headline article with source and read time. |
| **Trending Stories** | Ranked trending sidebar with numbered entries. |
| **Sentiment Gauge** | Market sentiment visualization with color-coded zones. |
| **UI/UX** | Orange/amber dark theme with category filtering and card grid layout. |

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI Components** | shadcn/ui (Radix + Tailwind) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **API** | CryptoCompare API (Free, No API Key) |
| **Deployment** | Vercel |

## API

This project uses **CryptoCompare API** — completely free, no authentication required.

| Endpoint | Purpose |
| --- | --- |
| Free tier | No rate limiting for reasonable usage |
| No API key | Direct fetch from browser |
| CORS | Enabled for client-side requests |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/RivaldiDev/crypto-news-hub.git
cd crypto-news-hub

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main dashboard page (client component)
│   └── globals.css       # Tailwind CSS globals
├── components/
│   └── ui/               # shadcn/ui components (Card, Badge, etc.)
└── lib/
    └── utils.ts          # Utility functions (cn helper)
```

## Deployment

This project is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Deploy to Vercel
npx vercel --prod
```

---

<div align="center">

**Built with AI Agent tools** · Xiaomi MiMo 100T Token Creator Program

![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>
