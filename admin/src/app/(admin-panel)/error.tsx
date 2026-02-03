// src/app/(admin-panel)/error.tsx
"use client";

import { useEffect, useState } from "react";
import {
  isChunkError,
  shouldRetry,
  incrementRetryCount,
  resetRetryCount,
  getRetryCount,
  MAX_RETRIES,
} from "@/hooks/useChunkErrorHandler";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [retryCount, setRetryCount] = useState(getRetryCount());
  const chunkError = isChunkError(error);

  useEffect(() => {
    if (chunkError && shouldRetry()) {
      const count = incrementRetryCount();
      setRetryCount(count);

      // reset() না, window.location.reload() দাও
      // এটা নতুন chunk এর reference আনবে
      const timer = setTimeout(() => {
        window.location.reload();
      }, 1500);

      return () => clearTimeout(timer);
    }

    // Chunk error না হলে retry count reset
    if (!chunkError) {
      resetRetryCount();
    }
  }, [error, chunkError]);

  // Manual retry
  const handleManualRetry = () => {
    resetRetryCount();
    window.location.reload();
  };

  // Auto retry চলছে — spinner দেখাও
  if (chunkError && shouldRetry()) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-primary" />
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Reconnecting... ({retryCount}/{MAX_RETRIES})
        </p>
      </div>
    );
  }

  // Chunk error আর retry শেষ হয়েছে
  if (chunkError) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-4">
        <div className="text-6xl">📶</div>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Connection Problem
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm text-center max-w-sm">
          The page failed to load after {MAX_RETRIES} attempt.
          Please check your internet connection and try again.
        </p>
        <button
          onClick={handleManualRetry}
          className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Reload Page
        </button>
      </div>
    );
  }

  // Chunk error না হলে সাধারণ error
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-4">
      <div className="text-6xl">⚠️</div>
      <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
        Something went wrong
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="mt-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Try Again
      </button>
    </div>
  );
}