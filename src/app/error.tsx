"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, Copy, Check, ChevronDown, ChevronUp, Bug } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Log error to client console for developer inspection
    console.error("Unhandled Application Error:", error);
  }, [error]);

  const handleCopyDetails = async () => {
    const details = [
      `Error Message: ${error.message || "Unknown error"}`,
      `Digest: ${error.digest || "N/A"}`,
      `Timestamp: ${new Date().toISOString()}`,
      `URL: ${typeof window !== "undefined" ? window.location.href : "N/A"}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(details);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn("Failed to copy error details to clipboard:", err);
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
    <div
      role="alert"
      aria-live="assertive"
      className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-slate-950 text-slate-100"
    >
      <div className="w-full max-w-xl mx-auto text-center">
        {/* Glow & Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div
            className="absolute -inset-4 rounded-full bg-amber-500/20 blur-xl animate-pulse"
            aria-hidden="true"
          />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/10">
            <AlertTriangle className="h-8 w-8" aria-hidden="true" />
          </div>
        </div>

        {/* Friendly Heading & Description */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-base sm:text-lg text-slate-300 max-w-md mx-auto leading-relaxed">
          We encountered an unexpected issue while loading this page. Our team has been notified, and your data is safe.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={handleReset}
            disabled={isRetrying}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none transition-all duration-200 disabled:opacity-70 cursor-pointer"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {isRetrying ? "Retrying..." : "Try Again"}
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none transition-all duration-200"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>

        {/* User-friendly Debug & Diagnostic Section */}
        <div className="mt-10 border border-slate-800/80 rounded-2xl bg-slate-900/40 backdrop-blur-sm overflow-hidden text-left transition-all">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            aria-expanded={showDetails}
            aria-controls="error-details-panel"
            className="w-full flex items-center justify-between px-5 py-3.5 text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Bug className="h-4 w-4 text-slate-500" aria-hidden="true" />
              <span>Technical &amp; Debug Info</span>
              {error.digest && (
                <span className="font-mono text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                  Ref: {error.digest.slice(0, 10)}
                </span>
              )}
            </span>
            {showDetails ? (
              <ChevronUp className="h-4 w-4 text-slate-500" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
            )}
          </button>

          {showDetails && (
            <div
              id="error-details-panel"
              className="px-5 pb-5 pt-2 border-t border-slate-800/60 space-y-3"
            >
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">
                  Message
                </p>
                <p className="text-xs sm:text-sm font-mono text-red-300/90 bg-red-950/40 border border-red-900/40 rounded-lg p-3 break-words">
                  {error.message || "An unknown error was encountered during execution."}
                </p>
              </div>

              {error.digest && (
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">
                    Error Digest ID
                  </p>
                  <p className="text-xs font-mono text-slate-300 bg-slate-950/60 rounded-lg px-3 py-2 border border-slate-800 select-all">
                    {error.digest}
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCopyDetails}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none rounded px-2 py-1 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      <span className="text-emerald-400">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy error details</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none rounded px-2 py-1 cursor-pointer"
                >
                  Hard Reload Page
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Support hint */}
        <p className="mt-8 text-xs text-slate-500">
          Need help? Reach out to{" "}
          <a
            href="mailto:support@kavyalabs.ai"
            className="text-slate-400 underline hover:text-indigo-300 transition-colors"
          >
            support@kavyalabs.ai
          </a>
        </p>
      </div>
    </div>
  );
}
