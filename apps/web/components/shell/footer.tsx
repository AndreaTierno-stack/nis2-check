import { Disclaimer } from "@/components/disclaimer";
import type { ComposedDisclaimer } from "@/content/disclaimer";
import { LIMITS_HREF } from "@/content/disclaimer";
import { CODE_REPO, KB_REPO } from "@/lib/links";
import { copy } from "@/src/copy.it";

/**
 * Footer of every page: the composed notice of the tool and the public links. On the limits
 * page the notice is already in the list (its catalog entry), so it is not repeated.
 */
export function Footer({ notice }: { notice?: ComposedDisclaimer }) {
  return (
    <footer className="mt-12 bg-surface">
      <div className="mx-auto max-w-6xl space-y-3 px-4 py-6 text-sm text-text-soft">
        {notice && <Disclaimer notice={notice} />}
        <nav className="flex flex-wrap gap-4">
          <a className="text-accent underline-offset-4 hover:underline" href={LIMITS_HREF}>
            {copy.footer.limits}
          </a>
          <a className="text-accent underline-offset-4 hover:underline" href={KB_REPO}>
            {copy.footer.method}
          </a>
          <a className="text-accent underline-offset-4 hover:underline" href={CODE_REPO}>
            {copy.footer.source}
          </a>
        </nav>
      </div>
    </footer>
  );
}
