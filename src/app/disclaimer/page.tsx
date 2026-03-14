import type { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Disclaimer — Toolbox.ai',
  description: 'Important disclaimer about the use of tools and results on Toolbox.ai.',
};

export default function DisclaimerPage() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Disclaimer</h1>
        <p className="text-gray-500 mb-8">Please read this disclaimer carefully before using our tools.</p>
        <div className="prose prose-gray max-w-none space-y-6 text-gray-600">
          <h2 className="text-xl font-bold text-gray-900">General Disclaimer</h2>
          <p>All tools, calculators, and content on Toolbox.ai are provided for <strong>informational and educational purposes only</strong>. Results are estimates and may not reflect actual outcomes.</p>
          <h2 className="text-xl font-bold text-gray-900">Not Professional Advice</h2>
          <p>Toolbox.ai does not provide financial, medical, legal, structural, or professional advice of any kind. Always consult a qualified professional before making decisions based on tool results.</p>
          <h2 className="text-xl font-bold text-gray-900">Financial Tools</h2>
          <p>Loan, mortgage, investment, and other financial calculators provide estimates only. Actual rates, fees, and terms vary by lender. Consult a financial advisor or lender for precise figures.</p>
          <h2 className="text-xl font-bold text-gray-900">Health & Medical Tools</h2>
          <p>BMI, calorie, and other health tools provide general estimates. They do not account for individual health conditions. Always consult a physician or registered dietitian for personalized health guidance.</p>
          <h2 className="text-xl font-bold text-gray-900">Construction Tools</h2>
          <p>Material estimates may vary based on local codes, waste factors, and project specifics. Consult a licensed contractor or engineer for precise calculations.</p>
          <h2 className="text-xl font-bold text-gray-900">Accuracy</h2>
          <p>While we strive for accuracy, we make no warranties about the completeness or correctness of any tool. Use at your own risk.</p>
        </div>
      </div>
    </Layout>
  );
}
