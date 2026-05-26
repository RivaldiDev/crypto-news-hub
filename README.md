<div align="center">

# CryptoWire

**AI-curated cryptocurrency and blockchain news aggregator.**

[![Tech Stack](https://skillicons.dev/icons?i=nextjs,typescript,tailwind,github&theme=dark&perline=4)](https://skillicons.dev)

![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=for-the-badge)

[![GitHub](https://img.shields.io/badge/Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RivaldiDev/crypto-news-hub)

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started)

</div>

---

## Overview

Crypto news aggregator fetching top stories from CryptoCompare API. Features category filtering, hero article spotlight, grid layout, and trending section.

Built with **Next.js 16** (App Router, TypeScript), **shadcn/ui**, **Tailwind CSS 4**, and **Framer Motion**.

## Features

| Area | What it does |
| --- | --- |
| **News Feed** | Top 18 crypto news articles with title, body preview, source, and timestamp. |
| **Category Filters** | Filter by All, Bitcoin, Ethereum, DeFi, NFTs, Trading. |
| **Hero Article** | Spotlight on the top story with full preview. |
| **Trending Section** | Numbered trending stories list. |
| **Clickable Cards** | All news items link to original articles. |
| **Error Handling** | API error detection with retry button. |
| **Responsive** | Mobile-first grid layout. |

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI Components** | shadcn/ui (Radix + Tailwind) |
| **Styling** | Tailwind CSS 4 with CSS variables |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **API** | CryptoCompare News API (free) |

## Getting Started

```bash
git clone https://github.com/RivaldiDev/crypto-news-hub.git
cd crypto-news-hub
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # News feed with hero, grid, trending
│   └── globals.css         # Tailwind + dark theme tokens
├── components/
│   └── ui/                 # shadcn/ui primitives
└── lib/
    └── utils.ts            # cn() helper
```

---

<div align="center">

![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>
