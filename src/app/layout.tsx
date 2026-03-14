import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'Toolbox.ai — 1,000+ Free Online Tools', template: '%s | Toolbox.ai' },
  description: 'Toolbox.ai offers 1,000+ free online calculators, converters, generators, and utilities. Fast, accurate, and always free.',
  keywords: ['online tools', 'free calculators', 'unit converters', 'generators', 'utilities'],
  openGraph: {
    siteName: 'Toolbox.ai',
    type: 'website',
    url: 'https://toolbox.ai',
  },
  metadataBase: new URL('https://toolbox.ai'),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Toolbox.ai",
              "url": "https://toolbox.ai",
              "description": "1,000+ free online tools including calculators, converters, and generators.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://toolbox.ai/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
