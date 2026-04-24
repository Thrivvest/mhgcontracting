/**
 * SeoPrerender - Hidden pre-rendered content for search engine crawlers
 *
 * Renders keyword-rich content using the industry-standard sr-only
 * (screen-reader only) pattern. This approach uses clip-rect, width/height 1px,
 * and overflow hidden - recognized by Google as accessible content rather than
 * hidden SEO spam. Content is in the static HTML at build time.
 *
 * Also provides a <noscript> fallback with the same content styled for readability.
 */

interface SeoPrerenderProps {
  children: React.ReactNode;
}

export default function SeoPrerender({ children }: SeoPrerenderProps) {
  return (
    <>
      <div
        id="seo-prerender"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        {children}
      </div>
      <noscript>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "40px 20px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {children}
        </div>
      </noscript>
    </>
  );
}
