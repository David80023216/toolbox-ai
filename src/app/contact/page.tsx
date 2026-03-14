import type { Metadata } from 'next';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'Contact Us — Toolbox.ai',
  description: 'Get in touch with the Toolbox.ai team. Report a bug, suggest a tool, or ask a question.',
  alternates: { canonical: 'https://toolbox.ai/contact' },
};

export default function ContactPage() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 mb-8">Have a question, bug report, or tool suggestion? We'd love to hear from you.</p>

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <form className="space-y-5" action="mailto:hello@toolbox.ai" method="post" encType="text/plain">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Your Name</label>
              <input id="name" name="name" type="text" required className="input-field" placeholder="Jane Smith" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" required className="input-field" placeholder="jane@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">Subject</label>
              <select id="subject" name="subject" className="input-field">
                <option value="general">General Question</option>
                <option value="bug">Bug Report</option>
                <option value="suggestion">Tool Suggestion</option>
                <option value="business">Business Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required className="input-field resize-none" placeholder="Tell us how we can help..." />
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-1">📧 Email</h3>
            <p className="text-sm text-gray-600">hello@toolbox.ai</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-1">⏱ Response Time</h3>
            <p className="text-sm text-gray-600">Usually within 1–2 business days</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
