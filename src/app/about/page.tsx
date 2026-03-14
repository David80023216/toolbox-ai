import type { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { getAllTools } from '@/lib/tools';

export const metadata: Metadata = {
  title: 'About Toolbox.ai',
  description: 'Learn about Toolbox.ai — the home of 1,000+ free online calculators, converters, and utility tools.',
  alternates: { canonical: 'https://toolbox.ai/about' },
};

export default function AboutPage() {
  const tools = getAllTools();
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Toolbox.ai</h1>
        <p className="text-xl text-gray-500 mb-8">The most comprehensive free online tool directory.</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p>
            Toolbox.ai was built with a single mission: to give everyone access to accurate, fast, and completely
            free online tools — no account needed, no hidden charges, no fluff.
          </p>
          <p>
            We currently offer over <strong>{tools.length.toLocaleString()} tools</strong> across 10+ categories including
            finance calculators, construction estimators, unit converters, health & fitness tools, text utilities,
            developer tools, math calculators, and more.
          </p>
          <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
          <p>
            To provide reliable, easy-to-use tools that save people time every day. Whether you're calculating a
            loan payment, converting units for a recipe, estimating materials for a home project, or generating
            a secure password — Toolbox.ai delivers instant, accurate answers.
          </p>
          <h2 className="text-xl font-bold text-gray-900">Why Toolbox.ai?</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>✅ 100% free — no subscriptions, no paywalls</li>
            <li>✅ No registration required</li>
            <li>✅ Works on all devices — desktop, tablet, and mobile</li>
            <li>✅ Fast, instant results</li>
            <li>✅ Accurate formulas verified against authoritative sources</li>
            <li>✅ New tools added regularly</li>
          </ul>
          <h2 className="text-xl font-bold text-gray-900">Important Notice</h2>
          <p>
            All tools on Toolbox.ai are provided for <strong>informational and educational purposes only</strong>.
            Results should not be used as professional financial, medical, legal, or engineering advice.
            Always consult a qualified professional for important decisions.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/contact" className="btn-primary">Contact Us</Link>
            <Link href="/" className="btn-secondary">Browse All Tools</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
