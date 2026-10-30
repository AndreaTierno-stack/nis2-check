import type { ReactNode } from "react";

/**
 * Two columns with flex-wrap: content `flex: 999 1 560px`, side `flex: 1 1 280px` (max 320px).
 * Below about 900px the side column wraps under the content.
 */
export function Columns({ main, side }: { main: ReactNode; side?: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-start gap-6 px-4 py-8">
      <div className="min-w-0 space-y-6" style={{ flex: "999 1 560px" }}>
        {main}
      </div>
      {side && (
        <aside className="min-w-0 space-y-4" style={{ flex: "1 1 280px", maxWidth: 320 }}>
          {side}
        </aside>
      )}
    </div>
  );
}
