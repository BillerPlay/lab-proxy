import Link from "next/link";

export const metadata = {
  title: "DevForge // access denied",
};

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-24 text-center">
      <p className="text-secondary text-xs uppercase tracking-[0.4em] mb-4">
        {"// error_403"}
      </p>

      <h1 className="text-5xl sm:text-7xl font-bold text-primary neon-text mb-4">
        ACCESS DENIED
      </h1>

      <p className="text-muted max-w-sm mb-2">
        You do not have clearance for this sector.
      </p>
      <p className="text-muted text-sm max-w-sm mb-10">
        This area is restricted to admins only. Contact your system operator if you believe this is an error.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="text-sm text-primary border border-primary/50 hover:border-primary px-5 py-2 rounded-sm tracking-widest transition-colors"
        >
          ← back to home
        </Link>
        <Link
          href="/dashboard"
          className="text-sm text-secondary border border-secondary/50 hover:border-secondary px-5 py-2 rounded-sm tracking-widest transition-colors"
        >
          go to dashboard
        </Link>
      </div>
    </div>
  );
}