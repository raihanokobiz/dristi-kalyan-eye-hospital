/**
 * Centralized error logging utility
 * In production, integrate with services like Sentry, LogRocket, or DataDog
 */

interface ErrorContext {
  userId?: string;
  url?: string;
  component?: string;
  action?: string;
  [key: string]: any;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private isDevelopment = process.env.NODE_ENV === 'development';

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  /**
   * Log error to console (and external service in production)
   */
  logError(error: Error, context?: ErrorContext) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      timestamp: new Date().toISOString(),
      ...context,
    };

    if (this.isDevelopment) {
      console.error('Error logged:', errorData);
    } else {
      // In production, send to error tracking service
      this.sendToErrorService(errorData);
    }
  }

  /**
   * Log warning (non-critical issues)
   */
  logWarning(message: string, context?: ErrorContext) {
    const warningData = {
      message,
      level: 'warning',
      timestamp: new Date().toISOString(),
      ...context,
    };

    if (this.isDevelopment) {
      console.warn('Warning:', warningData);
    } else {
      this.sendToErrorService(warningData);
    }
  }

  /**
   * Log info (for tracking important events)
   */
  logInfo(message: string, context?: ErrorContext) {
    if (this.isDevelopment) {
      console.info('Info:', message, context);
    }
  }

  /**
   * Send error to external monitoring service
   * TODO: Integrate with Sentry, LogRocket, or similar
   */
  private sendToErrorService(data: any) {
    // Example integration:
    // if (window.Sentry) {
    //   window.Sentry.captureException(data);
    // }
    
    // For now, just log to console
    console.error('[Production Error]:', data);
  }

  /**
   * Track user action for debugging
   */
  trackAction(action: string, data?: any) {
    if (this.isDevelopment) {
      console.log(`[Action] ${action}:`, data);
    }
  }
}

export const errorLogger = ErrorLogger.getInstance();

/**
 * Helper function to safely stringify errors
 */
export function stringifyError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return String(error);
}

/**
 * Helper to check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('NetworkError') ||
      error.message.includes('Failed to fetch')
    );
  }
  return false;
}
