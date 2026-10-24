"use client";

import { useEffect, useState } from "react";
import { AlertOctagon, RefreshCw, Copy, Check } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const [copied, setCopied] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    console.error("Critical Root Layout Error:", error);
  }, [error]);

  const handleCopy = async () => {
    const details = [
      `Critical Error: ${error.message || "Unknown root layout error"}`,
      `Digest: ${error.digest || "N/A"}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard write failures in restricted environments
    }
  };

  const handleReset = () => {
    setIsRetrying(true);
    try {
      reset();
    } finally {
      setTimeout(() => setIsRetrying(false), 500);
    }
  };

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans antialiased">
        <main
          role="alert"
          aria-live="assertive"
          className="w-full max-w-lg mx-auto text-center"
        >
          {/* Critical Error Icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div
              className="absolute -inset-4 rounded-full bg-red-500/20 blur-xl"
              aria-hidden="true"
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 shadow-lg shadow-red-500/10">
              <AlertOctagon className="h-8 w-8" aria-hidden="true" />
            </div>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Application Error
          </h1>
          <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-md mx-auto">
            A critical error prevented the application from initializing. Please try reloading or check back shortly.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isRetrying}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none transition-all disabled:opacity-70 cursor-pointer"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
                aria-hidden="true"
              />
              {isRetrying ? "Recovering..." : "Try Again"}
            </button>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/";
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
            >
              Reload Homepage
            </button>
          </div>

          {/* Error Digest & Diagnostics */}
          <div className="mt-8 p-4 rounded-xl border border-slate-800 bg-slate-900/50 text-left">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono">
                {error.digest ? `ID: ${error.digest}` : "Code: SYSTEM_CRITICAL"}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Info</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
