import type { ProductVariantGroup } from "@/content/types";

/**
 * Variants, presented as information rather than as a picker.
 *
 * Nothing here is selectable on purpose: the choice belongs to the store that
 * takes the order. Showing the options answers "does it come in black?"
 * without pretending this page can put one in a basket.
 */
export function ProductVariants({ groups }: { groups: ProductVariantGroup[] }) {
  if (groups.length === 0) return null;

  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.name}>
          <p className="label text-graphite">{group.name}</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-3">
            {group.options.map((option) => (
              <li key={option.label} className="flex items-center gap-2">
                {option.swatch ? (
                  <span
                    aria-hidden="true"
                    className="size-4 border border-line"
                    style={{ backgroundColor: option.swatch }}
                  />
                ) : null}
                <span className="text-sm text-ink">
                  {option.label}
                  {option.default ? (
                    <span className="ml-2 text-xs text-graphite">(shown)</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
