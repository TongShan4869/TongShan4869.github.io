// Keystatic admin UI only works in dev mode (it requires server-side features).
// During static export, this renders a simple placeholder page.

export function generateStaticParams() {
  // Only generate the root /keystatic page for static export.
  return [{ params: [] }];
}

export default function KeystaticPlaceholder() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-secondary">
        Keystatic admin is only available in development mode. Run{" "}
        <code className="bg-white/10 px-2 py-0.5 rounded">npm run dev</code> to
        access it.
      </p>
    </div>
  );
}
