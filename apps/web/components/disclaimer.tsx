import { segmentText, type ComposedDisclaimer } from "@/content/disclaimer";
import { cn } from "@/lib/utils";

/**
 * The composed notice of the tool (content/disclaimer.ts): catalog entry, then product
 * paragraphs with their links. One renderer for the click-wrap, the footer of every page,
 * the printed PDF and the limits page, so the text is the same everywhere.
 */
export function Disclaimer({
  notice,
  heading: Heading = "h2",
  className,
}: {
  notice: ComposedDisclaimer;
  heading?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)} data-testid="disclaimer">
      <Heading className="font-semibold text-text">{notice.title}</Heading>
      {notice.paragraphs.map((p, i) => (
        <p key={i} data-text={segmentText(p)}>
          {p.map((s, j) =>
            typeof s === "string" ? (
              s
            ) : (
              <a key={j} className="text-accent underline underline-offset-4" href={s.href}>
                {s.label}
              </a>
            ),
          )}
        </p>
      ))}
    </div>
  );
}
