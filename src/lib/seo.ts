import type { Tool, Category } from '@/data/types';

export const SITE_NAME = 'Toolbox.ai';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolbox.ai';
export const SITE_TAGLINE = '1,000+ Free Online Tools';
export const SITE_DESCRIPTION =
  'Toolbox.ai offers 1,000+ free online tools including calculators, converters, generators, and utilities. Fast, accurate, and mobile-friendly.';

export function getToolMetadata(tool: Tool) {
  return {
    title: tool.seo_title || `${tool.name} – Free Online Tool | ${SITE_NAME}`,
    description: tool.seo_description || tool.short_description,
    openGraph: {
      title: tool.seo_title || tool.name,
      description: tool.seo_description || tool.short_description,
      url: `${SITE_URL}/tools/${tool.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: tool.seo_title || tool.name,
      description: tool.seo_description || tool.short_description,
    },
    alternates: {
      canonical: `${SITE_URL}/tools/${tool.slug}`,
    },
  };
}

export function getCategoryMetadata(category: Category) {
  return {
    title: `${category.name} – Free Online Tools | ${SITE_NAME}`,
    description: category.description || `Browse all free ${category.name.toLowerCase()} on ${SITE_NAME}.`,
    openGraph: {
      title: `${category.name} | ${SITE_NAME}`,
      description: category.description || `Free ${category.name.toLowerCase()}.`,
      url: `${SITE_URL}/category/${category.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
    alternates: {
      canonical: `${SITE_URL}/category/${category.slug}`,
    },
  };
}

export function generateToolSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.short_description,
    url: `${SITE_URL}/tools/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    operatingSystem: 'Web',
  };
}

export function generateFAQSchema(faqs: Array<{ q: string; a: string }>) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function generateBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
