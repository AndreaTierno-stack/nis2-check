import { CODE_REPO, KB_REPO } from "@/lib/links";
import { copy } from "@/src/copy.it";

/** Extended notice from the catalog (corpus 0.11.1) and the two public links. */
export function Footer({ disclaimer }: { disclaimer: string }) {
  return (
    <footer className="mt-12 bg-surface">
      <div className="mx-auto max-w-6xl space-y-3 px-4 py-6 text-sm text-text-soft">
        <p>{disclaimer}</p>
        <nav className="flex flex-wrap gap-4">
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
