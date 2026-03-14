import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { AdBlock } from '@/components/AdBlock';
import { getCategoryBySlug, getToolsByCategory, CATEGORIES } from '@/lib/tools';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return CATEGORIES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Category Not Found' };
  return {
    title: `${cat.name} — Free Online Tools`,
    description: cat.description,
    alternates: { canonical: `https://toolbox.ai/category/${cat.slug}` },
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const tools = getToolsByCategory(params.slug);
  const otherCats = CATEGORIES.filter(c => c.slug !== params.slug).slice(0, 6);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolbox.ai" },
      { "@type": "ListItem", "position": 2, "name": cat.name, "item": `https://toolbox.ai/category/${cat.slug}` },
    ]
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm text-blue-200 mb-3">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li className="text-white font-medium">{cat.name}</li>
            </ol>
          </nav>
          <h1 className="text-3xl font-bold mb-2">{cat.name}</h1>
          <p className="text-blue-100 text-lg max-w-2xl">{cat.description}</p>
          <p className="text-blue-200 text-sm mt-2">{tools.length} tools available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        <AdBlock size="leaderboard" label="Advertisement" />

        {/* Tools grid */}
        {tools.length > 0 ? (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">🔧</div>
            <p className="text-lg">No tools found in this category yet.</p>
          </div>
        )}

        <AdBlock size="rectangle" label="Advertisement" />

        {/* SEO text */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">About {cat.name}</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              Our {cat.name.toLowerCase()} include {tools.length}+ free online tools
              that provide instant, accurate results. Each tool is designed to be fast, mobile-friendly,
              and easy to use — no signup or installation required.
            </p>
            <p>
              Whether you're a professional, student, or just need a quick calculation,
              our {cat.name.toLowerCase()} are built to handle real-world scenarios with precision.
              All tools are completely free to use and work on any device.
            </p>
          </div>
        </section>

        {/* Other categories */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore Other Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {otherCats.map(c => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="card p-3 text-center hover:border-blue-300 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-700"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
