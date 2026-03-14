# 🧰 Toolbox.ai

> **1,000+ Free Online Tools** — Calculators, Converters, Generators & More

A production-ready Next.js 14 SEO website with 949+ working tools across 10 categories, built for Google traffic and AdSense monetization.

---

## 🚀 Quick Start

```bash
# Clone or unzip the project
cd toolbox-ai

# Install dependencies
npm install

# Run development server
npm run dev
# → Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
toolbox-ai/
├── src/
│   ├── app/                          # Next.js 14 App Router pages
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout (SEO metadata)
│   │   ├── globals.css               # Tailwind CSS
│   │   ├── sitemap.ts                # Auto-generated sitemap.xml
│   │   ├── robots.ts                 # robots.txt
│   │   ├── tools/[slug]/page.tsx     # Individual tool pages (SSG)
│   │   ├── category/[slug]/page.tsx  # Category pages (SSG)
│   │   ├── search/page.tsx           # Search results
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── disclaimer/page.tsx
│   │   └── api/
│   │       ├── calculate/route.ts    # Tool calculation API
│   │       └── search/route.ts       # Search API
│   ├── components/
│   │   ├── Layout.tsx                # Header + Footer
│   │   ├── SearchBar.tsx             # Live search with dropdown
│   │   ├── ToolCard.tsx              # Tool grid card
│   │   ├── ToolEngine.tsx            # Interactive tool UI
│   │   └── AdBlock.tsx               # Ad placement blocks
│   ├── lib/
│   │   ├── tools.ts                  # Tool data access layer
│   │   ├── toolRunner.ts             # Engine dispatcher (all 949+ tools)
│   │   └── engines/
│   │       ├── finance.ts            # Finance formulas
│   │       ├── construction.ts       # Construction calculations
│   │       ├── converters.ts         # Unit conversion logic
│   │       ├── health.ts             # Health & fitness engines
│   │       ├── text.ts               # Text/dev/generator engines
│   │       ├── math.ts               # Math engines
│   │       ├── everyday.ts           # Everyday life tools
│   │       └── index.ts              # Engine exports
│   └── data/
│       ├── types.ts                  # TypeScript interfaces
│       ├── categories.ts             # Category definitions
│       ├── tools.json                # All 949+ tool definitions
│       └── tools/                    # Individual category JSON files
└── public/
    └── ads.txt                       # AdSense authorization file
```

---

## 🔧 Adding New Tools

### Step 1: Add a tool entry to `src/data/tools.json`

```json
{
  "id": "my-new-tool",
  "name": "My New Tool",
  "slug": "my-new-tool",
  "category": "finance-tools",
  "subcategory": "calculators",
  "short_description": "A brief description of what this tool does.",
  "long_description": "More detailed explanation...",
  "how_it_works": "Explain the formula or logic...",
  "example": "For example, if you enter X, the result is Y...",
  "keywords": ["keyword1", "keyword2"],
  "popular": false,
  "inputs": [
    {
      "key": "amount",
      "label": "Amount",
      "type": "number",
      "placeholder": "1000",
      "unit": "$"
    }
  ],
  "engine": "my_engine_name",
  "faq": [
    {
      "question": "What does this tool do?",
      "answer": "It calculates..."
    }
  ],
  "related_tools": ["loan-calculator", "mortgage-calculator"],
  "seo_title": "My New Tool — Free Online Calculator",
  "seo_description": "Use our free My New Tool to..."
}
```

### Step 2: Add the engine function to `src/lib/toolRunner.ts`

```typescript
case 'my_engine_name':
  return { result: n('amount') * 2 };
```

That's it! The tool page is auto-generated at `/tools/my-new-tool`.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set production domain
vercel --prod
```

### Deploy to Other Hosts

```bash
npm run build
# Outputs to .next/ folder
# Use any Node.js hosting (Railway, Render, DigitalOcean, etc.)
```

---

## 💰 Monetization Setup

### Google AdSense

1. Apply at [adsense.google.com](https://adsense.google.com)
2. After approval, update `public/ads.txt`:
   ```
   google.com, pub-XXXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. In `src/components/AdBlock.tsx`, replace the placeholder `<div>` with your AdSense `<ins>` tags
4. Add the AdSense script to `src/app/layout.tsx`

### Ad Placement Blocks
Ad blocks are already placed at key positions on every page:
- Near top of tool page (leaderboard)
- Below tool results (rectangle)
- Above FAQ section (leaderboard)
- Sidebar (sidebar rectangle)

---

## 🔍 SEO Features

- ✅ `sitemap.xml` auto-generated with all 949+ tool URLs
- ✅ `robots.txt` configured for indexing
- ✅ Canonical URLs on every page
- ✅ Open Graph meta tags
- ✅ Breadcrumb schema (JSON-LD)
- ✅ FAQ schema on tool pages
- ✅ HowTo schema on tool pages
- ✅ WebSite schema on homepage
- ✅ Fast static generation (SSG) for all tool pages
- ✅ Clean semantic HTML
- ✅ Mobile-responsive design

---

## 📊 Tool Count by Category

| Category | Tools |
|---|---|
| Finance Tools | 121 |
| Unit Converters | 271 |
| Construction Tools | 90 |
| Health & Fitness | 85 |
| Math & Education | 80 |
| Business & eCommerce | 70 |
| Text & Writing | 63 |
| Developer & Web | 60 |
| Everyday Life | 60 |
| Generators | 49 |
| **Total** | **949+** |

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Rendering**: Static Site Generation (SSG)
- **Deployment**: Vercel / any Node.js host
- **Data**: Static JSON (no database required)

---

## 📝 License

All rights reserved. For commercial use inquiries, contact hello@toolbox.ai.

---

## 🤝 Contributing

Found a bug or want to suggest a new tool? Open an issue or submit a PR on GitHub.
