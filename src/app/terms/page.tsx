import type { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Terms of Service — Toolbox.ai',
  description: 'Toolbox.ai Terms of Service. Read our terms before using our free online tools.',
  alternates: { canonical: 'https://toolbox.ai/terms' },
};

export default function TermsPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <p>By accessing Toolbox.ai, you agree to be bound by these terms. If you disagree, please do not use our services.</p>

          <h2 className="text-xl font-bold text-gray-900">Use of Services</h2>
          <p>Toolbox.ai provides free online tools for informational and educational purposes. You agree to use the tools only for lawful purposes and in a way that does not infringe the rights of others.</p>

          <h2 className="text-xl font-bold text-gray-900">No Professional Advice</h2>
          <p>Tools on Toolbox.ai provide estimates and calculations for informational purposes only. Nothing on this site constitutes professional financial, medical, legal, structural, or engineering advice. Always consult a qualified professional before making important decisions.</p>

          <h2 className="text-xl font-bold text-gray-900">Accuracy</h2>
          <p>We strive for accuracy but cannot guarantee that all results are error-free. Tools are provided "as is" without warranty of any kind. We are not liable for decisions made based on tool outputs.</p>

          <h2 className="text-xl font-bold text-gray-900">Intellectual Property</h2>
          <p>All content, tools, code, and design on Toolbox.ai are the property of Toolbox.ai. You may not reproduce, distribute, or create derivative works without written permission.</p>

          <h2 className="text-xl font-bold text-gray-900">Limitation of Liability</h2>
          <p>Toolbox.ai and its operators are not liable for any indirect, incidental, or consequential damages arising from the use of our tools. Your use is at your own risk.</p>

          <h2 className="text-xl font-bold text-gray-900">Third-Party Links</h2>
          <p>Our site may contain links to third-party sites. We are not responsible for their content or privacy practices.</p>

          <h2 className="text-xl font-bold text-gray-900">Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.</p>

          <h2 className="text-xl font-bold text-gray-900">Governing Law</h2>
          <p>These terms are governed by applicable laws. Any disputes shall be resolved in accordance with applicable law.</p>
        </div>
      </div>
    </Layout>
  );
}
