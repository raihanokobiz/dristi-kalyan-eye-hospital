// src/hooks/useChunkErrorHandler.ts

const MAX_RETRIES = 5;        // মাক্স ৩ বার retry করবে
const RETRY_DELAY = 2000;     // প্রতি ২ সেকেন্ডে retry

export function isChunkError(error: Error): boolean {
  return (
    error.message?.includes("chunk") ||
    error.message?.includes("Failed to load") ||
    error.name === "ChunkLoadError"
  );
}

export function getRetryCount(): number {
  try {
    const count = sessionStorage.getItem("__chunk_retry_count__");
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
}

export function incrementRetryCount(): number {
  try {
    const current = getRetryCount();
    const next = current + 1;
    sessionStorage.setItem("__chunk_retry_count__", String(next));
    return next;
  } catch {
    return 1;
  }
}

export function resetRetryCount(): void {
  try {
    sessionStorage.removeItem("__chunk_retry_count__");
  } catch {}
}

export function shouldRetry(): boolean {
  return getRetryCount() < MAX_RETRIES;
}

export { MAX_RETRIES, RETRY_DELAY };