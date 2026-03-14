import type { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { AdBlock } from '@/components/AdBlock';
import SearchBar from '@/components/SearchBar';
import { searchTools } from '@/lib/tools';
import { CATEGORIES } from '@/data/categories';

interface Props {
  searchParams: { q?: string; category?: string };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  const q = searchParams.q ?? '';
  return {
    title: q ? `"${q}" — Search Results` : 'Search Tools',
    description: q ? `Search results for "${q}" — find the right tool on Toolbox.ai.` : 'Search 1,000+ free online tools on Toolbox.ai.',
    robots: { index: false, follow: true },
  };
}

export default function SearchPage({ searchParams }: Props) {
  const q = searchParams.q ?? '';
  const category = searchParams.category ?? '';
  const results = searchTools(q, { category, limit: 100 });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search bar */}
        <div className="max-w-2xl mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {q ? `Results for "${q}"` : 'Search All Tools'}
          </h1>
          <SearchBar defaultValue={q} autofocus />
        </div>

        <AdBlock size="leaderboard" label="Advertisement" />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filters sidebar */}
          <aside className="lg:w-52 shrink-0">
            <h3 className="font-semibold text-gray-900 mb-3">Filter by Category</h3>
            <div className="space-y-1">
              <Link
                href={q ? `/search?q=${encodeURIComponent(q)}` : '/search'}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!category ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                All Categories
              </Link>
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.slug}
                  href={q ? `/search?q=${encodeURIComponent(q)}&category=${cat.slug}` : `/search?category=${cat.slug}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${category === cat.slug ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            {results.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  {results.length} tool{results.length !== 1 ? 's' : ''} found
                  {q && ` for "${q}"`}
                  {category && ` in ${CATEGORIES.find(c=>c.slug===category)?.name}`}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {results.map(tool => <ToolCard key={tool.id} tool={tool} />)}
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">No results found</h2>
                <p className="text-gray-500 mb-6">
                  We couldn&apos;t find any tools matching &quot;{q}&quot;.
                  Try different keywords or browse by category.
                </p>
                <Link href="/#categories" className="btn-primary">Browse Categories</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
