import Link from 'next/link';

interface Crumb {
  name: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span className="text-gray-300 dark:text-gray-600">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {crumb.name}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100 font-medium">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
