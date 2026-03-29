import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <span className="font-heading text-8xl font-bold text-primary/10 block mb-4">404</span>
        <h1 className="font-heading text-3xl font-bold text-text-primary mb-4">Page Not Found</h1>
        <p className="font-body text-text-secondary text-lg mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white font-body font-semibold text-sm px-8 py-3.5 rounded-md hover:bg-primary-light transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
