/**
 * SeoPrerender — Hidden pre-rendered content for search engine crawlers
 *
 * Renders keyword-rich content off-screen so Google's crawler sees rich,
 * unique HTML for each page. Also provides a <noscript> fallback with
 * the same content styled for readability.
 *
 * This is a server component — content is in the static HTML at build time.
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
          left: "-9999px",
          overflow: "hidden",
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
