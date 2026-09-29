/**
 * Visible "Sources" list (website SEO standard 5.4). Every statute, survey or
 * dataset a page cites must appear here; the quality gate checks it.
 */
import type { Source } from "@/data/sources";

export default function SourcesList({ sources, className = "" }: { sources: Source[]; className?: string }) {
  if (sources.length === 0) return null;
  return (
    <div data-sources className={`mt-10 border-t border-border pt-6 ${className}`}>
      <h2 className="font-heading text-base font-semibold text-text-primary mb-3">Sources</h2>
      <ol className="list-decimal space-y-2 pl-5 font-body text-sm text-text-secondary">
        {sources.map((s) => (
          <li key={s.id}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {s.title}
            </a>
            , {s.publisher}. Checked {s.checked}.
          </li>
        ))}
      </ol>
    </div>
  );
}
