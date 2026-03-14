import type { Tool } from '@/data/types';
import { CATEGORIES } from '@/data/categories';
import toolsData from '@/data/tools.json';

const ALL_TOOLS: Tool[] = toolsData as Tool[];

export function getAllTools(): Tool[] {
  return ALL_TOOLS;
}

export function getToolBySlug(slug: string): Tool | null {
  return ALL_TOOLS.find(t => t.slug === slug) ?? null;
}

export function getToolsByCategory(category: string): Tool[] {
  return ALL_TOOLS.filter(t => t.category === category);
}

export function getFeaturedTools(limit = 12): Tool[] {
  return ALL_TOOLS.filter(t => t.popular).slice(0, limit);
}

export function getPopularTools(limit = 20): Tool[] {
  return ALL_TOOLS.filter(t => t.popular).slice(0, limit);
}

export function getNewTools(limit = 12): Tool[] {
  return ALL_TOOLS.slice(-limit).reverse();
}

export function getRelatedTools(tool: Tool, limit = 6): Tool[] {
  const related = new Set<string>(tool.related_tools ?? []);
  const results: Tool[] = [];

  // First: explicitly related
  for (const t of ALL_TOOLS) {
    if (related.has(t.slug) && t.id !== tool.id) results.push(t);
    if (results.length >= limit) return results;
  }

  // Then: same category
  for (const t of ALL_TOOLS) {
    if (t.category === tool.category && t.id !== tool.id && !results.includes(t)) {
      results.push(t);
    }
    if (results.length >= limit) return results;
  }

  return results;
}

export function getCategoryStats(): Record<string, number> {
  const stats: Record<string, number> = {};
  for (const tool of ALL_TOOLS) {
    stats[tool.category] = (stats[tool.category] ?? 0) + 1;
  }
  return stats;
}

export function searchTools(
  query: string,
  options: { category?: string; limit?: number } = {}
): Tool[] {
  const { category, limit = 20 } = options;
  const q = query.toLowerCase().trim();

  if (!q && !category) return ALL_TOOLS.slice(0, limit);

  const scored: Array<{ tool: Tool; score: number }> = [];

  for (const tool of ALL_TOOLS) {
    if (category && tool.category !== category) continue;

    if (!q) { scored.push({ tool, score: 1 }); continue; }

    let score = 0;
    const name = tool.name.toLowerCase();
    const desc = (tool.short_description ?? '').toLowerCase();
    const tags = (tool.keywords ?? []).join(' ').toLowerCase();

    if (name === q) score += 100;
    else if (name.startsWith(q)) score += 50;
    else if (name.includes(q)) score += 30;
    if (desc.includes(q)) score += 10;
    if (tags.includes(q)) score += 5;
    if (tool.category.includes(q)) score += 3;

    const queryWords = q.split(/\s+/);
    for (const word of queryWords) {
      if (word.length < 2) continue;
      if (name.includes(word)) score += 15;
      if (desc.includes(word)) score += 5;
      if (tags.includes(word)) score += 3;
    }

    if (score > 0) scored.push({ tool, score });
  }

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(s => s.tool);
}

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find(c => c.slug === slug) ?? null;
}

export { CATEGORIES };
