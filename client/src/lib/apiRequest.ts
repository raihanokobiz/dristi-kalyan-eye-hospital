import { apiBaseUrl } from "@/config/config";
import { errorLogger } from "./errorLogger";

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ApiRequestOptions<T = unknown> {
  endpoint: string;
  method?: RequestMethod;
  body?: T;
  headers?: HeadersInit;
  cache?: RequestCache;
  revalidate?: number;
  retries?: number;
  timeout?: number;
}

/**
 * Delay function for retry logic
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch with timeout
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number = 30000
): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

/**
 * Enhanced API request utility with retry logic and error handling
 */
export const apiRequest = async <T = unknown>({
  endpoint,
  method = 'GET',
  body,
  headers = {},
  cache,
  revalidate,
  retries = 2,
  timeout = 30000,
}: ApiRequestOptions): Promise<T> => {
  const url = `${apiBaseUrl}${endpoint}`;
  
  let lastError: Error | null = null;
  let attempt = 0;

  while (attempt <= retries) {
    try {
      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        ...(cache && { cache }),
        ...(revalidate !== undefined && { next: { revalidate } }),
        ...(typeof body !== 'undefined' ? { body: JSON.stringify(body) } : {}),
      };

      const res = await fetchWithTimeout(url, fetchOptions, timeout);
      
      // Handle non-OK responses
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const error = new Error(
          errorData.message || `HTTP ${res.status}: ${res.statusText}`
        );
        
        // Don't retry client errors (4xx)
        if (res.status >= 400 && res.status < 500) {
          errorLogger.logError(error, {
            endpoint,
            method,
            statusCode: res.status,
          });
          throw error;
        }
        
        // Retry server errors (5xx)
        throw error;
      }

      const result = await res.json();
      return result;
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // Don't retry on last attempt
      if (attempt === retries) {
        errorLogger.logError(lastError, {
          endpoint,
          method,
          attempts: attempt + 1,
        });
        break;
      }
      
      // Wait before retrying (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, attempt), 5000);
      await delay(waitTime);
      
      attempt++;
      errorLogger.logWarning(
        `Retrying request (attempt ${attempt + 1}/${retries + 1})`,
        { endpoint, error: lastError.message }
      );
    }
  }

  // If all retries failed, throw the last error
  throw lastError || new Error('Request failed');
};
