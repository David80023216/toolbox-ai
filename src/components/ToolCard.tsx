import Link from 'next/link';
import type { Tool } from '@/data/types';

const CATEGORY_ICONS: Record<string, string> = {
  'finance-tools': '💰',
  'construction-tools': '🏗️',
  'unit-converters': '⚖️',
  'health-fitness-tools': '💪',
  'everyday-life-tools': '📅',
  'text-writing-tools': '✍️',
  'developer-web-tools': '💻',
  'generators': '⚡',
  'math-education-tools': '📐',
  'business-ecommerce-tools': '🛒',
};

interface ToolCardProps {
  tool: Tool;
  compact?: boolean;
}

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  const icon = CATEGORY_ICONS[tool.category] ?? '🔧';

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="card p-4 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col gap-2"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">
            {tool.name}
          </h3>
          {!compact && (
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
              {tool.short_description}
            </p>
          )}
        </div>
        {tool.popular && (
          <span className="shrink-0 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-medium">
            Popular
          </span>
        )}
      </div>
      {!compact && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] text-gray-400 capitalize">{tool.category.replace(/-/g,' ')}</span>
          <span className="text-[10px] text-blue-500 group-hover:text-blue-700 font-medium">Use tool →</span>
        </div>
      )}
    </Link>
  );
}

export default ToolCard;
