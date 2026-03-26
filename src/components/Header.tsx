import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-slate-100">
          Learn Claude Code
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="text-slate-400 hover:text-slate-100 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-slate-400 hover:text-slate-100 transition-colors">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
