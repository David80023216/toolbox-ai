import type { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Privacy Policy — Toolbox.ai',
  description: 'Toolbox.ai Privacy Policy — how we collect, use, and protect your data.',
  alternates: { canonical: 'https://toolbox.ai/privacy' },
};

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <h2 className="text-xl font-bold text-gray-900">Overview</h2>
          <p>Toolbox.ai ("we," "our," or "us") respects your privacy. This policy explains how we handle information when you use our website at toolbox.ai.</p>

          <h2 className="text-xl font-bold text-gray-900">Information We Collect</h2>
          <p>We do not require you to create an account. When you use our tools, all calculations happen in your browser — we do not store your inputs or results on our servers.</p>
          <p>We may automatically collect non-personal information including: browser type, device type, pages visited, and time spent on pages. This is used for analytics and improving the site.</p>

          <h2 className="text-xl font-bold text-gray-900">Cookies</h2>
          <p>We use cookies for: site analytics (Google Analytics), advertising (Google AdSense), and functionality (remembering preferences). You can disable cookies in your browser settings.</p>

          <h2 className="text-xl font-bold text-gray-900">Advertising</h2>
          <p>We display ads through Google AdSense and similar networks. These services may use cookies to serve relevant ads. You can opt out at <a href="https://optout.aboutads.info" className="text-blue-600">optout.aboutads.info</a>.</p>

          <h2 className="text-xl font-bold text-gray-900">Third-Party Services</h2>
          <p>We may use third-party services including Google Analytics, Google AdSense, and CDN providers. Each has its own privacy policy.</p>

          <h2 className="text-xl font-bold text-gray-900">Data Retention</h2>
          <p>We do not store personal data from tool usage. Analytics data is retained per Google Analytics default settings (26 months).</p>

          <h2 className="text-xl font-bold text-gray-900">Children's Privacy</h2>
          <p>Our services are not directed to children under 13. We do not knowingly collect information from children.</p>

          <h2 className="text-xl font-bold text-gray-900">Changes</h2>
          <p>We may update this policy. Changes are posted on this page with an updated date.</p>

          <h2 className="text-xl font-bold text-gray-900">Contact</h2>
          <p>Questions about this policy? Email us at privacy@toolbox.ai or use our <a href="/contact" className="text-blue-600">contact form</a>.</p>
        </div>
      </div>
    </Layout>
  );
}
