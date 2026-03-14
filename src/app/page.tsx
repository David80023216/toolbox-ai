import type { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { AdBlock } from '@/components/AdBlock';
import SearchBar from '@/components/SearchBar';
import { getAllTools, getFeaturedTools, getPopularTools, getCategoryStats } from '@/lib/tools';
import { CATEGORIES } from '@/data/categories';

export const metadata: Metadata = {
  title: 'Toolbox.ai — 1,000+ Free Online Tools',
  description: 'Free online calculators, unit converters, text tools, generators, and more. 1,000+ tools for finance, construction, health, math, and everyday life.',
};

const CATEGORY_ICONS: Record<string, string> = {
  'finance-tools': '💰',
  'construction-tools': '🏗️',
  'unit-converters': '⚖️',
  'health-fitness-tools': '💪',
  'everyday-life-tools': '📅',
  'text-writing-tools': '✍️',
  'developer-web-tools': '💻',
  'generators': '⚡',
  'math-education-tools': '📐',
  'business-ecommerce-tools': '🛒',
};

export default function HomePage() {
  const allTools = getAllTools();
  const featured = getFeaturedTools(12);
  const popular = getPopularTools(24);
  const stats = getCategoryStats();

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🧰</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
            Every Tool You Need,<br className="hidden sm:block" /> All in One Place
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {allTools.length.toLocaleString()}+ free online tools — calculators, converters, generators, and more.
            No signup, no cost, always accurate.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar />
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Popular: {' '}
            {['BMI Calculator','Loan Calculator','Age Calculator','Concrete Calculator','Password Generator'].map((name, i) => {
              const slug = name.toLowerCase().replace(/\s+/g, '-');
              return (
                <span key={name}>
                  <Link href={`/tools/${slug}`} className="underline underline-offset-2 hover:text-white">{name}</Link>
                  {i < 4 && <span className="mx-1">·</span>}
                </span>
              );
            })}
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: `${allTools.length.toLocaleString()}+`, label: 'Free Tools' },
              { value: CATEGORIES.length.toString(), label: 'Categories' },
              { value: '100%', label: 'Free to Use' },
              { value: 'No', label: 'Signup Required' },
              { value: '⚡', label: 'Instant Results' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* Ad */}
        <AdBlock size="leaderboard" label="Advertisement" />

        {/* Categories */}
        <section id="categories">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="section-title">Browse by Category</h2>
              <p className="section-subtitle">Find the right tool for any task</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card p-4 text-center hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="text-3xl mb-2">{CATEGORY_ICONS[cat.slug] ?? '🔧'}</div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 leading-tight mb-1">{cat.name}</h3>
                <p className="text-xs text-gray-400">{stats[cat.slug] ?? 0} tools</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured tools */}
        {featured.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="section-title">Featured Tools</h2>
                <p className="section-subtitle">Our most popular and useful tools</p>
              </div>
              <Link href="/search?q=" className="text-sm text-blue-600 hover:text-blue-700 font-medium hidden sm:block">
                Browse all →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featured.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}

        {/* Ad rectangle */}
        <AdBlock size="rectangle" label="Advertisement" />

        {/* Popular tools */}
        {popular.length > 0 && (
          <section>
            <div className="mb-6">
              <h2 className="section-title">🔥 Popular Tools</h2>
              <p className="section-subtitle">Trusted by millions of users</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {popular.map(tool => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="card p-3 hover:border-blue-300 hover:bg-blue-50 transition-all text-center group"
                >
                  <p className="text-xs font-medium text-gray-700 group-hover:text-blue-600 leading-tight">{tool.name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Category deep dives */}
        <section>
          <h2 className="section-title">Tools by Category</h2>
          <p className="section-subtitle">Explore our complete library</p>
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            {CATEGORIES.slice(0, 6).map(cat => {
              const catTools = allTools.filter(t => t.category === cat.slug).slice(0, 8);
              return (
                <div key={cat.slug} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <span>{CATEGORY_ICONS[cat.slug]}</span>
                      {cat.name}
                    </h3>
                    <Link href={`/category/${cat.slug}`} className="text-xs text-blue-600 hover:text-blue-700">
                      View all →
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {catTools.map(tool => (
                      <Link
                        key={tool.id}
                        href={`/tools/${tool.slug}`}
                        className="text-xs bg-gray-100 hover:bg-blue-100 hover:text-blue-700 text-gray-600 px-2.5 py-1 rounded-full transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEO text block */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About Toolbox.ai</h2>
          <div className="prose prose-gray max-w-none text-gray-600 space-y-3">
            <p>
              <strong>Toolbox.ai</strong> is a comprehensive free online toolkit with over {allTools.length.toLocaleString()} tools covering every
              category you need — from finance calculators and unit converters to construction estimators,
              health tools, text utilities, developer tools, and more.
            </p>
            <p>
              Whether you're calculating a mortgage payment, converting units, estimating concrete for a project,
              checking your BMI, generating a secure password, or formatting JSON — Toolbox.ai has you covered.
              Every tool is free to use, requires no account, and delivers instant accurate results.
            </p>
            <p>
              Our tools are organized into {CATEGORIES.length} major categories including{' '}
              {CATEGORIES.slice(0,5).map(c => c.name).join(', ')}, and more.
              Each tool includes detailed explanations, examples, and FAQs to help you get the most out of every calculation.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
