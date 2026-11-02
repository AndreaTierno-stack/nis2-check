import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * How the items of a {@link PrintStack} carry the frame of the panel.
 * - `divided`: on screen one panel with the items divided by rules (signals); on paper every item
 *   is a framed card of its own.
 * - `padded`: on screen one panel with padding around tinted rows (trace); on paper no frame at all,
 *   the rows are the cards.
 */
type Variant = "divided" | "padded";

const frame = (variant: Variant, first: boolean, last: boolean) =>
  variant === "divided"
    ? cn(
        "border-x border-t border-border bg-surface print:rounded-panel print:border",
        first && "rounded-t-panel",
        last && "rounded-b-panel border-b",
        !first && "print:mt-2",
      )
    : cn(
        "border-x border-border bg-surface px-3 print:border-0 print:bg-transparent print:px-0 print:pb-0",
        first ? "rounded-t-panel border-t pt-3 print:pt-0" : "pt-2 print:pt-2",
        last && "rounded-b-panel border-b pb-3",
      );

/**
 * A titled list of cards that paginates cleanly in every browser (PDF checked on Firefox by the
 * author on 2026-11-02: frames opened at the foot of a page with their content on the next one).
 *
 * The frame of the panel is drawn by the items, never by a container: each item draws its share of
 * the frame on screen, so the list still reads as one panel, and on paper each item is a card that
 * never breaks (`print-avoid-break`, break-inside: avoid). The heading travels with the first item in
 * one unbreakable group, so it is never left alone at the foot of a page, also where
 * `break-after: avoid` is ignored (Firefox). No frame can open without content.
 *
 * @param head - heading block, printed together with the first item
 * @param items - the cards, each with its own key; at least one (callers render nothing otherwise)
 * @param as - root element: a section (default) or a div inside a section of the caller
 */
export function PrintStack({
  head,
  items,
  variant,
  as: Root = "section",
  ...rest
}: { head: ReactNode; items: ReactElement[]; variant: Variant; as?: "section" | "div" } & HTMLAttributes<HTMLElement>) {
  const wrap = (item: ReactElement, i: number) => (
    <div key={item.key ?? i} className={cn("print-avoid-break", frame(variant, i === 0, i === items.length - 1))}>
      {item}
    </div>
  );
  return (
    <Root {...rest}>
      <div className="print-avoid-break" data-print-group="head">
        <div className="mb-3">{head}</div>
        {wrap(items[0]!, 0)}
      </div>
      {items.slice(1).map((item, i) => wrap(item, i + 1))}
    </Root>
  );
}
