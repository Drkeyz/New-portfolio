import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="wrap flex min-h-[80svh] flex-col justify-center pt-32">
      <p className="t-label text-muted">404</p>
      <h1 className="t-display mt-4">A rest in the score.</h1>
      <p className="mt-6 max-w-[40ch] text-muted">This page doesn&apos;t exist. The work does.</p>
      <Link href="/#work" className="link-underline mt-10 self-start text-lg">
        Back to selected work →
      </Link>
    </main>
  );
}
