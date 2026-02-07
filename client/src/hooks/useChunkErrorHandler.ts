"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Custom hook to handle chunk loading errors and Server Action mismatches
 * Automatically retries failed chunk loads and reloads the page if needed
 */
export function useChunkErrorHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const { message } = event;

      // Detect chunk loading errors
      const isChunkError =
        message?.includes("ChunkLoadError") ||
        message?.includes("Loading chunk") ||
        message?.includes("Failed to fetch dynamically imported module") ||
        message?.includes("Importing a module script failed") ||
        message?.includes("Failed to find Server Action") ||
        message?.includes("This request might be from an older or newer deployment");

      if (isChunkError) {
        event.preventDefault();
        
        // Get retry count from sessionStorage
        const retryKey = "chunk-error-retry";
        const retryCount = parseInt(sessionStorage.getItem(retryKey) || "0", 10);

        if (retryCount < 3) {
          // Increment retry count
          sessionStorage.setItem(retryKey, String(retryCount + 1));
          
          console.warn(`Chunk/Server Action error detected. Retry attempt ${retryCount + 1}/3`);
          
          // Clear all caches before reload
          if ('caches' in window) {
            caches.keys().then(names => {
              names.forEach(name => caches.delete(name));
            });
          }
          
          // Wait a bit before reloading to avoid rapid reloads
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // After 3 retries, clear the counter and navigate to home
          sessionStorage.removeItem(retryKey);
          console.error("Failed to load chunks after 3 retries. Redirecting to home.");
          
          // Clear caches and redirect
          if ('caches' in window) {
            caches.keys().then(names => {
              names.forEach(name => caches.delete(name));
            });
          }
          
          router.push("/");
        }
      }
    };

    // Handle unhandled promise rejections (for dynamic imports and server actions)
    const handleRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      
      const isChunkError =
        error?.message?.includes("ChunkLoadError") ||
        error?.message?.includes("Loading chunk") ||
        error?.message?.includes("Failed to fetch dynamically imported module") ||
        error?.message?.includes("Failed to find Server Action") ||
        error?.message?.includes("This request might be from an older or newer deployment") ||
        error?.name === "ChunkLoadError";

      if (isChunkError) {
        event.preventDefault();
        
        const retryKey = "chunk-error-retry";
        const retryCount = parseInt(sessionStorage.getItem(retryKey) || "0", 10);

        if (retryCount < 3) {
          sessionStorage.setItem(retryKey, String(retryCount + 1));
          console.warn(`Chunk/Server Action error detected (unhandled rejection). Retry ${retryCount + 1}/3`);
          
          // Clear caches
          if ('caches' in window) {
            caches.keys().then(names => {
              names.forEach(name => caches.delete(name));
            });
          }
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          sessionStorage.removeItem(retryKey);
          console.error("Failed to load chunks after 3 retries. Redirecting to home.");
          
          if ('caches' in window) {
            caches.keys().then(names => {
              names.forEach(name => caches.delete(name));
            });
          }
          
          router.push("/");
        }
      }
    };

    // Add event listeners
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    // Clear retry counter on successful navigation
    const clearRetryCounter = () => {
      sessionStorage.removeItem("chunk-error-retry");
    };

    // Listen for successful page loads
    window.addEventListener("load", clearRetryCounter);

    // Cleanup
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("load", clearRetryCounter);
    };
  }, [router]);
}
