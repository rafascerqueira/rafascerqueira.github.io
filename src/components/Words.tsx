import type { CSSProperties } from "react";

// Splits copy into words in JSX (not at runtime) so prerendered HTML, hydration and the PT/EN switch stay intact.
export function ScrubWords({ text }: { text: string }) {
  return <>{text.split(" ").map((word, index) => <span key={`${index}-${word}`}>{index > 0 && " "}<span className="scrub-word">{word}</span></span>)}</>;
}

// Each word rises out of its own mask; --i staggers the reveal in CSS, so it runs before any JS loads.
export function MaskWords({ text, start = 0 }: { text: string; start?: number }) {
  return <>{text.split(" ").map((word, index) => <span key={`${index}-${word}`}>{index > 0 && " "}<span className="mask"><span className="mask-inner" style={{ "--i": start + index } as CSSProperties}>{word}</span></span></span>)}</>;
}
