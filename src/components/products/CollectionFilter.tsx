import Link from "next/link";
import type { Category, CategoryId } from "@/content/types";
import { cn } from "@/lib/utils";

type CollectionFilterProps = {
  categories: Array<Category & { count: number }>;
  active: CategoryId | null;
  total: number;
};

/**
 * Collection filter, built from links rather than buttons.
 *
 * This keeps the whole page a server component — no client state, no
 * hydration — and it means a filtered view has a real URL that can be
 * bookmarked, shared and linked to from the homepage category rail.
 */
export function CollectionFilter({ categories, active, total }: CollectionFilterProps) {
  const options = [
    { id: null, name: "Everything", count: total },
    ...categories.map((category) => ({
      id: category.id,
      name: category.name,
      count: category.count,
    })),
  ];

  return (
    <nav aria-label="Filter by collection">
      <ul className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((option) => {
          const isActive = option.id === active;
          return (
            <li key={option.id ?? "all"} className="shrink-0">
              <Link
                href={option.id ? `/products?collection=${option.id}` : "/products"}
                aria-current={isActive ? "page" : undefined}
                scroll={false}
                className={cn(
                  "inline-flex items-center gap-2 rounded-(--radius-pill) border-2 px-5 py-2.5 text-[0.9375rem] font-semibold transition-colors",
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-graphite hover:border-ink hover:text-ink",
                )}
              >
                {option.name}
                <span className={cn("text-[0.8125rem] tabular-nums", isActive ? "text-paper/65" : "text-ash")}>
                  {String(option.count).padStart(2, "0")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
