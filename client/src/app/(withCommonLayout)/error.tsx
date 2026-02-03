"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log error appropriately
    if (process.env.NODE_ENV === "development") {
      console.error("Page Error:", error);
    }
  }, [error]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-5xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>
        <p className="text-gray-600">
          Don't worry, we're working to fix the issue. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Try Again
          </button>
          <button
            onClick={handleGoHome}
            className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
