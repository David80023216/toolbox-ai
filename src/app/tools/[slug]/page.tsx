import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { ToolCard } from '@/components/ToolCard';
import { AdBlock } from '@/components/AdBlock';
import ToolEngine from '@/components/ToolEngine';
import { getToolBySlug, getAllTools, getRelatedTools, getCategoryBySlug } from '@/lib/tools';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: 'Tool Not Found' };

  return {
    title: tool.seo_title ?? `${tool.name} — Free Online Tool`,
    description: tool.seo_description ?? tool.short_description,
    keywords: tool.keywords,
    openGraph: {
      title: tool.seo_title ?? tool.name,
      description: tool.seo_description ?? tool.short_description,
      type: 'website',
      url: `https://toolbox.ai/tools/${tool.slug}`,
    },
    alternates: { canonical: `https://toolbox.ai/tools/${tool.slug}` },
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool, 6);
  const category = getCategoryBySlug(tool.category);
  const catName = category?.name ?? tool.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://toolbox.ai" },
      { "@type": "ListItem", "position": 2, "name": catName, "item": `https://toolbox.ai/category/${tool.category}` },
      { "@type": "ListItem", "position": 3, "name": tool.name, "item": `https://toolbox.ai/tools/${tool.slug}` },
    ]
  };

  const faqSchema = tool.faq && tool.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tool.faq.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  } : null;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to use the ${tool.name}`,
    "description": tool.short_description,
    "step": [
      { "@type": "HowToStep", "name": "Enter your values", "text": "Fill in the required input fields with your numbers or text." },
      { "@type": "HowToStep", "name": "Click Calculate", "text": "Press the Calculate button to get your result instantly." },
      { "@type": "HowToStep", "name": "View and copy your results", "text": "Your results appear below. Copy or share them as needed." },
    ]
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
          <ol className="flex items-center gap-1.5">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li className="text-gray-300">/</li>
            <li><Link href={`/category/${tool.category}`} className="hover:text-blue-600 transition-colors capitalize">{catName}</Link></li>
            <li className="text-gray-300">/</li>
            <li className="text-gray-800 font-medium" aria-current="page">{tool.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{tool.name}</h1>
              <p className="text-gray-600 text-lg">{tool.short_description}</p>
            </div>

            {/* Interactive tool */}
            <ToolEngine tool={tool} />

            {/* How it works */}
            {tool.how_it_works && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">How It Works</h2>
                <p className="text-gray-600 leading-relaxed">{tool.how_it_works}</p>
              </div>
            )}

            {/* Long description */}
            {tool.long_description && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">About This Tool</h2>
                <p className="text-gray-600 leading-relaxed">{tool.long_description}</p>
              </div>
            )}

            {/* Example */}
            {tool.example && (
              <div className="card p-6 border-l-4 border-blue-500">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Example</h2>
                <div className="bg-blue-50 rounded-lg p-4 text-gray-700 text-sm leading-relaxed">
                  {tool.example}
                </div>
              </div>
            )}

            {/* Ad above FAQ */}
            <AdBlock size="leaderboard" label="Advertisement" />

            {/* FAQ */}
            {tool.faq && tool.faq.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {tool.faq.map((item, i) => (
                    <details key={i} className="group border border-gray-200 rounded-lg overflow-hidden">
                      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-50 hover:bg-blue-50 font-medium text-gray-800 transition-colors">
                        {item.question}
                        <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-4 py-3 text-gray-600 text-sm leading-relaxed">{item.answer}</div>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            {tool.disclaimer && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                <strong>Disclaimer:</strong> {tool.disclaimer}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Ad sidebar */}
            <AdBlock size="sidebar" label="Advertisement" />

            {/* Related tools */}
            {related.length > 0 && (
              <div className="card p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Related Tools</h3>
                <div className="space-y-2">
                  {related.map(t => (
                    <Link
                      key={t.id}
                      href={`/tools/${t.slug}`}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 text-sm text-gray-700 hover:text-blue-700 transition-colors group"
                    >
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {t.name}
                    </Link>
                  ))}
                </div>
                <Link href={`/category/${tool.category}`} className="text-xs text-blue-600 hover:text-blue-700 mt-3 block">
                  View all {catName} →
                </Link>
              </div>
            )}

            {/* Category card */}
            <div className="card p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">📂 {catName}</h3>
              <p className="text-sm text-gray-600 mb-3">Explore all tools in this category.</p>
              <Link
                href={`/category/${tool.category}`}
                className="btn-primary text-sm inline-block"
              >
                Browse {catName}
              </Link>
            </div>

            {/* Share */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Share This Tool</h3>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=Check+out+this+free+${encodeURIComponent(tool.name)}+at+Toolbox.ai&url=https://toolbox.ai/tools/${tool.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://toolbox.ai/tools/${tool.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Ad sidebar 2 */}
            <AdBlock size="sidebar" label="Advertisement" />
          </aside>
        </div>

        {/* More tools from category */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">More Tools You Might Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
