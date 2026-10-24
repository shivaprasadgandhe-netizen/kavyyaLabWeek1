import Link from "next/link";
import { ArrowLeft, Home, Sparkles, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Background radial glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[450px] w-[700px] max-w-[100vw] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 h-[300px] w-[300px] rounded-full bg-violet-600/15 blur-[100px]" />
      </div>

      {/* Header Bar */}
      <header className="w-full border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-white focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none rounded-lg py-1 px-1.5 transition-colors hover:text-indigo-300"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Kavya Labs
          </span>
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to site
        </Link>
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-indigo-300 backdrop-blur-md">
            <span>Error 404 &bull; Page Not Found</span>
          </div>

          {/* Large Title */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
            Lost in{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-500 bg-clip-text text-transparent">
              hyperspace?
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-md mx-auto">
            The page you are looking for doesn&apos;t exist or might have been relocated. Let&apos;s get you back on track.
          </p>

          {/* Action Links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none transition-all duration-200"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Return Home
            </Link>

            <Link
              href="/#features"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none transition-all duration-200"
            >
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Explore Features
            </Link>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-400">
        <p>© 2026 Kavya Labs &bull; Built in Bengaluru</p>
      </footer>
    </div>
  );
}
